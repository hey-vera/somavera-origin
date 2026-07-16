import { readdir, readFile } from "node:fs/promises";
import { createHash, createPublicKey, verify } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { canonicalize } from "./lib/canonicalize.mjs";
import { listCapsuleFiles } from "./lib/capsule-files.mjs";
import { validateSchemaSubset } from "./lib/schema-subset.mjs";

const root = path.resolve(fileURLToPath(new URL("../", import.meta.url)));
let checks = 0;

function assert(condition, message) {
  if (!condition) throw new Error(message);
  checks += 1;
}

async function json(relative) {
  return JSON.parse(await readFile(path.join(root, ...relative.split("/")), "utf8"));
}

for (const folder of ["schemas", "examples", "conformance"]) {
  const names = await readdir(path.join(root, folder));
  for (const name of names.filter((entry) => entry.endsWith(".json"))) {
    await json(folder + "/" + name);
    checks += 1;
  }
}

const schemaNames = (await readdir(path.join(root, "schemas")))
  .filter((entry) => entry.endsWith(".schema.json"));
for (const name of schemaNames) {
  const schema = await json("schemas/" + name);
  assert(
    schema.$schema === "https://json-schema.org/draft/2020-12/schema",
    name + " does not declare JSON Schema draft 2020-12"
  );
  assert(typeof schema.$id === "string", name + " has no schema ID");
}

const exampleNames = (await readdir(path.join(root, "examples")))
  .filter((entry) => entry.endsWith(".json"));
for (const name of exampleNames) {
  const example = await json("examples/" + name);
  assert(typeof example.$schema === "string", name + " does not name its schema");
  const schemaName = path.basename(example.$schema);
  const schema = await json("schemas/" + schemaName);
  const errors = validateSchemaSubset(schema, example);
  assert(
    errors.length === 0,
    name + " fails schema subset validation:\n" + errors.join("\n")
  );
}

const vectors = await json("conformance/canonicalization-v1.json");
for (const vector of vectors.vectors) {
  const canonical = canonicalize(vector.input);
  assert(canonical === vector.canonical, vector.name + " canonical bytes differ");
  const digest = createHash("sha256").update(canonical, "utf8").digest("hex");
  assert(digest === vector.sha256, vector.name + " hash differs");
}

for (const invalid of [-0, Number.NaN, Number.POSITIVE_INFINITY, 9007199254740992]) {
  let rejected = false;
  try {
    canonicalize(invalid);
  } catch {
    rejected = true;
  }
  assert(rejected, "canonicalizer accepted forbidden number");
}

const ed = await json("conformance/ed25519-rfc8032-v1.json");
const spkiPrefix = Buffer.from("302a300506032b6570032100", "hex");
const publicKey = createPublicKey({
  key: Buffer.concat([spkiPrefix, Buffer.from(ed.public_key_hex, "hex")]),
  format: "der",
  type: "spki"
});
assert(
  verify(
    null,
    Buffer.from(ed.message_hex, "hex"),
    publicKey,
    Buffer.from(ed.signature_hex, "hex")
  ),
  "RFC 8032 Ed25519 vector failed"
);

const activation = await json("examples/token-activation.example.json");
function splitTotal(entries) {
  return entries.reduce((sum, entry) => sum + entry.basis_points, 0);
}
assert(splitTotal(activation.activation_core.epoch_allocation) === 10000, "epoch allocation must total 10000 basis points");
assert(activation.activation_core.fee_policy.service_price_to_provider_basis_points === 10000, "service price must remain with provider escrow");
assert(splitTotal(activation.activation_core.fee_policy.network_fee) === 10000, "network fee split must total 10000 basis points");
assert(activation.activation_core.token.denom === "grain", "smallest unit must be grain");
const ceilings = activation.activation_core.issuance.cumulative_ceilings;
for (let index = 1; index < ceilings.length; index += 1) {
  assert(ceilings[index].elapsed_year > ceilings[index - 1].elapsed_year, "issuance years must increase");
  assert(BigInt(ceilings[index].max_atoms) > BigInt(ceilings[index - 1].max_atoms), "issuance ceilings must increase");
}
assert(activation.activation_core.token.genesis_supply_atoms === "0", "activation genesis supply must be zero");
assert(activation.activation_core.issuance.lifetime_mint_ceiling_atoms === "1000000000000000000", "lifetime mint ceiling mismatch");
assert(BigInt(ceilings.at(-1).max_atoms) <= BigInt(activation.activation_core.issuance.lifetime_mint_ceiling_atoms), "scheduled issuance exceeds lifetime ceiling");

const genesis = await json("examples/network-genesis.example.json");
assert(genesis.context_epoch === 0, "genesis context epoch must be zero");
assert(genesis.token.activated === false, "initial genesis must be tokenless");
assert(genesis.token.asset_lineage_id === null, "initial genesis asset lineage must be null");
assert(genesis.token.genesis_supply_atoms === "0", "initial genesis supply must be zero");

const checkpoint = await json("examples/checkpoint.example.json");
assert(
  BigInt(checkpoint.live_supply_atoms) === BigInt(checkpoint.lifetime_minted_atoms) - BigInt(checkpoint.lifetime_burned_atoms),
  "checkpoint supply counters do not reconcile"
);

const recovery = await json("examples/recovery-certificate.example.json");
assert(recovery.old_network_lineage_id === recovery.new_network_lineage_id, "exact recovery must preserve network lineage");
assert(recovery.old_execution_context_id !== recovery.new_execution_context_id, "exact recovery must change execution context");
assert(recovery.new_context_epoch === recovery.old_context_epoch + 1, "exact recovery must increment context epoch once");
assert(recovery.old_asset_lineage_id === recovery.new_asset_lineage_id, "exact recovery must preserve asset lineage or null");

const receipt = await json("examples/service-receipt.example.json");
const roles = new Set(receipt.signatures.map((entry) => entry.role));
assert(roles.has("provider"), "service receipt requires a provider signature");

const capsuleFiles = await listCapsuleFiles(root);
const forbiddenFile = capsuleFiles.find((entry) => {
  const lower = entry.toLowerCase();
  return lower.endsWith(".pem") ||
    lower.endsWith(".key") ||
    lower.endsWith(".p12") ||
    lower.endsWith(".sqlite") ||
    lower.includes("/secrets/") ||
    lower.includes("/private/");
});
assert(!forbiddenFile, "forbidden private/runtime file in capsule: " + forbiddenFile);

const privateKeyMarker = "-----BEGIN PRIVATE" + " KEY-----";
for (const file of capsuleFiles) {
  const text = await readFile(path.join(root, ...file.split("/")), "utf8").catch(() => "");
  assert(!text.includes(privateKeyMarker), "private-key PEM marker in " + file);
}

console.log("Conformance checks passed: " + checks);
console.log("Note: shape parsing is not full JSON Schema validation.");

