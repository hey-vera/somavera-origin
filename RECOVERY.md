# SOMAVERA RECOVERY AND SUCCESSION MANUAL

Status: draft 0.1  
Goal: recover public protocol operation without inventing authority, secrets, balances, consent, or history.

## 1. Classify the disaster

| Class | Survives | Action |
|---|---|---|
| R0 service outage | Original chain finality and state | Restart services; no succession |
| R1 node loss | Chain peers/checkpoints | Restore nodes with normal verified sync |
| R2 implementation loss | Chain state + signed capsule | Rebuild implementation and replay state |
| R3 substrate death | Unique valid finalized checkpoint + capsule | Exact-state successor candidate |
| R4 ambiguous fork | Conflicting valid finalized checkpoints | Halt migration; publish fork evidence |
| R5 total state loss | OriginSpec only | Phoenix genesis with new lineage |

## 2. Required recovery capsule

A complete capsule contains:

- ratified OriginSpec, token, governance, data-rights, and threat-model versions;
- canonical manifest and threshold release signatures;
- schemas and positive/adversarial conformance vectors;
- source and reproducible artifact hashes for at least two implementations;
- toolchain locks, SBOMs, build provenance, and dependency archives or legal mirrors;
- genesis and token-activation manifests;
- current validator, governance, and recovery public keys;
- public checkpoint chain and independently mirrored anchors;
- public model/corpus manifests and licenses;
- restoration and supply-audit tools.

It contains no secret key, mnemonic, recovery share, API credential, raw private work, identity mapping, or private training record.

## 3. Verify before running anything

1. Obtain the capsule from at least three independent mirrors.
2. Hash every file and compare it to the signed release manifest.
3. Verify the release threshold against the previous trusted release or original genesis trust anchors.
4. Build in a clean, offline-capable, pinned environment.
5. Require artifact hashes and conformance roots to match.
6. Reject a capsule with unknown consensus-critical files, missing signatures, supply mismatch, or an unrecognized algorithm suite.

## 4. Select a checkpoint

A checkpoint candidate is valid only if:

- its origin and active-release hashes are recognized;
- its previous-checkpoint chain verifies to genesis;
- its block/app hash and validator set verify under the active consensus rules;
- it carries the required finality quorum;
- balances root, live supply, lifetime minted, and lifetime burned reproduce from exported public state;
- governance and recovery key sets match the state at that height;
- no higher valid non-conflicting checkpoint is known after the public discovery window.

Use two or more independent light-client/full-replay paths. A mirror’s filename or host reputation is not verification.

## 5. Exact-continuity procedure

1. Publish a recovery notice naming the disaster, old network ID, candidate checkpoint height/hash, OriginSpec hash, and discovery deadline.
2. Observe at least a 30-day public evidence window (90 days for a total substrate replacement).
3. Rebuild two implementations and reproduce the checkpoint state root independently.
4. Generate a successor genesis that imports checkpoint state exactly, including old operational key sets. No balance, vesting, delegation, revocation, governance, consent, evidence, consumed-receipt, issuance-clock, or supply-counter change is allowed in the import.
5. Conduct new validator and recovery-key proof-of-possession ceremonies. Old private keys are never reconstructed or published. Commit the new public keys and substrate binding to one proposed `RecoverySuccession` transition.
6. Create a `RecoveryCertificate` using `ID-DERIVATION.md`. It preserves the network lineage, increments the context epoch, changes the execution context, preserves the asset lineage or pre-token null, and commits the old checkpoint, exact imported root, successor binding, before/after roots, transition hash, software hashes, reason, dates, and ratified quorum signatures.
7. Reproduce the imported root first, then execute only the precommitted `RecoverySuccession` transition. That transition may change the execution context, substrate binding, operational validator/recovery keys, endpoints, and old-substrate halt status; it may change nothing else.
8. Run old-context replay, supply, consent-denial, revocation, fork, rollback, and adversarial tests.
9. Start independent archival/light-client nodes before public gateways or Vera training.
10. Activate in read-only mode; let users verify balances, counters, state roots, and the succession transition.
11. After the challenge timelock, enable new-context transactions. Enable Vera training only after host, consent, license, and artifact checks pass.
12. Publish a final report and all evidence across every mirror.

## 6. VERA migration rules

- If the original chain is healthy, the original asset remains authoritative.
- Exact continuity preserves `network_lineage_id`. It preserves `asset_lineage_id`, or keeps both old and new asset IDs null when recovery predates token activation.
- It always changes `execution_context_id`; successor nodes reject old-context transactions and old nodes cannot create successor-context signatures.
- Migration must prevent double-spend between old and new substrates through a ratified permanent halt/finality condition or one-way proof system.
- Users claim or verify balances using public Merkle/state proofs; a custodian spreadsheet is not continuity.
- Unclaimed balances remain assigned to their original accounts. Recovery governance cannot confiscate them.
- A recovery process cannot add a premine, “recovery fee,” new team allocation, or changed vesting while claiming exact continuity.

## 7. Phoenix procedure

Use this only when no authenticated state survives or when the community intentionally starts over.

1. Publish the recovered OriginSpec bytes and hash.
2. Publicly document which artifacts and history are missing.
3. Build and cross-test new implementations.
4. Ratify a tokenless genesis with a new network lineage ID, context epoch zero, a new execution context, null asset lineage, and zero supply.
5. Begin with zero historical balances and no inherited reputation, consent, evidence, issuance history, or governance power.
6. Use a valueless testnet and complete all release gates. A later token activation receives its own new asset lineage ID.
7. Call the network a phoenix successor, not the restored original.

## 8. Ambiguous fork procedure

If two conflicting histories each appear valid:

1. stop automated bridges, claims, and succession;
2. preserve and publish both histories and signer evidence;
3. do not let an emergency committee choose or rewrite balances;
4. allow independent replay and public analysis;
5. issue distinct network identifiers;
6. let users, hosts, applications, and governance communities choose;
7. retain equivocation evidence for objective slashing where a surviving canonical process exists.

There is no cryptographic rule that can guarantee social agreement after the assumed finality quorum itself fails.

## 9. Drill cadence

- Daily: checkpoint production and multi-mirror verification.
- Monthly: clean-node restore from checkpoint.
- Quarterly: offline build and conformance replay.
- Twice yearly: independent operator recovery exercise.
- Annually: full substrate-death simulation, including token supply audit and governance succession.

A drill that relies on a founder laptop, private cloud account, undocumented DNS, or an unexported model is a failed drill.

## 10. Recovery authority limits

Recovery signers may attest to a verified state and successor software. They may not:

- reconstruct user secrets;
- mint or redistribute balances;
- change consent or license terms;
- rewrite reputation or evidence;
- approve private data release;
- bypass challenge periods;
- keep permanent emergency control.

Every recovery key has a public term, rotation procedure, organizational affiliation, and automatic expiry.
