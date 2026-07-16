# SOMAVERA DATA RIGHTS AND INTELLIGENCE-RETURN COVENANT

Status: draft 0.1  
Scope: every Soma observer, Vera host, model builder, dataset curator, and governance body.

## 1. Default rule

Observation is off until a controller signs a specific consent grant. Silence, installation, token ownership, use of Soma, or use of Vera is not consent.

A Soma agent must continue to function when observation is off. Refusing observation cannot reduce identity validity, reputation, access to exported intelligence, or control of the agent. A service may charge for its actual costs, but may not make surrender of private work the hidden price of participation.

## 2. Ownership and license

The contributor keeps whatever ownership and other rights they already hold. A consent grant provides only the narrow, revocable license stated in that grant. It does not transfer ownership to Vera, a host, a foundation, token holders, or a model.

The controller warrants only that they have authority to grant the stated rights. Hosts must not infer that possession of data proves the right to train on it.

Every accepted contribution binds:

- the subject and controller;
- observer and permitted destination hosts;
- exact data classes;
- exact purposes and operations;
- retention limit;
- redistribution rule;
- whether model training is permitted;
- license identifier and version;
- issue, expiry, and withdrawal behavior;
- policy version and cryptographic signature.

The machine form is schemas/consent-grant.schema.json.

## 3. Data classes

The v1 classes are:

| Class | Examples | Default |
|---|---|---|
| public_artifact | already-public source, public benchmark, published paper | denied until granted |
| work_summary | minimized description of a task and result | denied |
| objective_receipt | artifact hash, CI attestation, payment fulfilment, counterparty receipt | denied |
| private_work | prompts, code, documents, tool input/output, memory | prohibited unless an explicit future protocol permits it |
| secret | keys, credentials, recovery material, authentication tokens | always prohibited |
| regulated_sensitive | health, precise location, biometrics, KYC documents, protected-class data | always prohibited in v1 |
| identity_linkage | DID-to-human, wallet, IP, device, employer, contact mapping | always prohibited in v1 |

Unknown classes fail closed. Reclassification requires a new signed grant.

## 4. Purpose and operation

Purpose and operation are different. A grant for retrieval does not authorize training; a grant for evaluation does not authorize public release.

V1 purposes are:

- private_retrieval;
- aggregate_research;
- safety_evaluation;
- model_training;
- public_dataset;
- dispute_resolution.

V1 operations are:

- collect;
- store_encrypted;
- decrypt_in_attested_process;
- derive;
- evaluate;
- train;
- aggregate;
- redistribute.

Each grant names an allow-list. Hosts reject undeclared combinations.

## 5. Data lifecycle

Each contribution moves through auditable states:

1. offered — sender has prepared a minimized bundle;
2. accepted — destination verified the grant, signature, license, class, and policy;
3. quarantined — content is isolated pending safety, quality, and poisoning checks;
4. eligible — content may be used only for granted purposes;
5. derived — an artifact records source commitments, transformations, policy, and evaluation;
6. released — a permitted artifact is made available under a named license;
7. withdrawn — future collection and use stop;
8. deleted — host issues a deletion receipt for deletable copies;
9. tombstoned — public commitments remain only to prevent replay and prove withdrawal.

Hosts publish retention enforcement and deletion receipts. Backups must expire within the disclosed backup window.

## 6. Withdrawal and honest limits

Withdrawal stops future collection, new training, new derivation, and redistribution by compliant participants. It triggers deletion of copies that can lawfully and technically be deleted.

The interface must warn before consent that these effects may be irreversible:

- content already released publicly may have independent copies;
- a finalized public commitment cannot be erased without corrupting the ledger;
- model weights may not support reliable removal of one contribution;
- legal holds may temporarily delay deletion.

Where reliable unlearning is unavailable, a host must say so before accepting a training grant. It may not advertise deletion of trained influence it cannot demonstrate.

## 7. Intelligence-return covenant

Vera exists to return useful intelligence to people, not to create a one-way extraction moat.

At minimum:

- every contributor can export their own accepted bundles, receipts, grants, withdrawals, and provenance;
- public-benefit artifacts funded by protocol issuance are released under an open, irrevocable license after a narrowly justified safety review;
- interfaces and formats needed to use public artifacts are open and independently implementable;
- no single host receives an exclusive license to the shared corpus;
- model or knowledge releases include provenance, evaluation, limitations, and reproducible content hashes;
- safety restrictions must be specific, reviewable, time-limited where possible, and cannot become a blanket intelligence paywall.

Private or licensed contributions do not automatically become public. “Flows back” means access under the governing rights, not forced disclosure of another person’s data.

## 8. Host obligations

A conforming Vera host must:

- authenticate the observer and consent grant before accepting bytes;
- bind encryption associated data to subject, purpose, destination, policy, and content commitment;
- separate encryption keys from databases and rotate them;
- minimize logs and never log plaintext secrets;
- enforce per-grant retention and withdrawal;
- quarantine untrusted input and defend against prompt, model, and corpus poisoning;
- keep transformation and evaluation provenance;
- expose signed receipts and export endpoints;
- disclose subprocessors, regions, model providers, and material policy changes;
- permit independent audit without exposing contributor content;
- refuse data it cannot lawfully or technically govern.

## 9. Public ledger boundary

Raw work, prompts, identity linkage, private receipts, and training records do not belong on-chain. The ledger may contain only minimal commitments, grant status, revocation/tombstone commitments, aggregate accounting, public artifact roots, and dispute evidence that has passed a separate disclosure process.

Token holders cannot vote private data into public status.

## 10. Enforcement and conformance

Required adversarial tests include:

- observation-off produces zero network egress;
- an outcome or background watcher cannot bypass consent;
- unknown classes, destinations, purposes, and operations fail closed;
- expired and withdrawn grants are rejected;
- a host cannot extend retention or add a subprocessor silently;
- secrets and identity linkage are detected and blocked;
- deletion receipts reconcile with active storage and backups;
- derived artifacts retain provenance and license lineage;
- public release without the required grant is impossible;
- a user can export and independently verify their records.

Violation permits automatic host quarantine, objective bond penalties where evidence is deterministic, removal from protocol discovery, and private legal remedies. Governance cannot retroactively legalize an unauthorized disclosure.

