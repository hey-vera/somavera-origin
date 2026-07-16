# DECISIONS REQUIRED BEFORE RATIFICATION

Status: draft 0.1

This file prevents an attractive draft from being mistaken for a finished protocol. Every item below needs a public decision record, implementation, vectors, and adversarial test where applicable.

| Priority | Decision | Recommended starting position | Ratification evidence |
|---|---|---|---|
| P0 | Project boundary | Soma is identity/authority/evidence; Vera is voluntary learning; ledger is public coordination | architecture decision and schemas |
| P0 | Observer behavior | off by default; per-purpose, per-class, per-destination signed grants | consent implementation and zero-egress tests |
| P0 | Runtime secrets | outside source trees in OS/hardware-backed keystores | cross-platform key lifecycle tests |
| P0 | Public source of truth | this standalone capsule; legacy internal notes stay private/non-normative | signed release manifest |
| P0 | Continuity definition | OriginSpec revives rules; authenticated checkpoint revives state | recovery drill and succession vectors |
| P0 | Token timing | no valuable VERA until launch gates pass | public gate report |
| P0 | Legal classification | make no categorical label; review exact facts in each jurisdiction | published counsel scope and disclosures |
| P1 | Consensus substrate | evaluate sovereign app-chain versus minimal settlement contract; avoid premature lock-in | threat, cost, liveness, migration comparison |
| P1 | Canonicalization | RFC 8785 profile plus explicit rejection rules and vectors | two-language conformance |
| P1 | Identity method | standards-compatible DID/key representation, pairwise IDs, rotation, revocation, recovery | resolver and lifecycle vectors |
| P1 | Evidence model | separate assertion, execution, outcome, factual verification, and dispute | receipt schemas and adversarial fixtures |
| P1 | Reputation | contextual, explainable, decaying, non-transferable, recomputed from evidence | public formula and Sybil/collusion analysis |
| P1 | Vera learning target | knowledge retrieval first; training only after rights and evaluation pipeline exist | measurable quality and safety benchmark |
| P1 | Host privacy profile | disclose privileged-host access; research TEEs/MPC/FHE only for specific workloads | dataflow model and host conformance |
| P1 | Data license set | narrow grants; no implied universal training license | rights review and example grants |
| P1 | Model release covenant | open public-benefit artifacts with specific safety exceptions | license, release card, appeal process |
| P1 | Governance seats | define independent seat eligibility, terms, Sybil controls, removal | genesis policy and simulation |
| P1 | Objective slashing | enumerate only machine-verifiable duties and proof rules | state-transition vectors |
| P1 | Fee market | measure spam and resource costs before fixing base fees | testnet load/economic report |
| P1 | Issuance envelope | accept, revise, or reject TOKEN-SPEC.md ceilings before activation | independent simulation and vote |
| P1 | Activation distribution | zero premine and deterministic earned issuance is recommended | token activation manifest |
| P1 | Intellectual property | Apache-2.0 code/docs; separately define trademarks, data, model weights | LICENSE, trademark, data/model licenses |
| P2 | External anchors | choose at least two independent media/ledgers for checkpoint roots | anchor adapters and outage drill |
| P2 | Post-quantum migration | define trigger, hybrid period, and key migration rules | algorithm-agility test |
| P2 | Public chamber selection | combine elected user seats with independent public-interest stewards | capture analysis |
| P2 | Long-term entity | foundation/cooperative/other must be subordinate to protocol rights | charter and conflicts policy |

## Token questions that cannot remain vague

The token activation manifest must contain final, integer or rational values for:

1. network and asset lineage IDs;
2. name, symbol, decimals, denomination, and address format;
3. genesis supply and every genesis balance;
4. issuance ceiling at every schedule boundary;
5. measurement and anti-replay rules for every rewarded duty;
6. fee calculation and split;
7. bond, unbond, jail, and objective slash conditions;
8. validator bootstrap set and automatic sunset;
9. chamber eligibility, quorum, thresholds, and timelocks;
10. treasury keys and hard authority limits;
11. checkpoint cadence and external anchors;
12. same-lineage migration and double-spend prevention;
13. source, compiler, binary, contract, and schema hashes;
14. audit reports, economic simulation, and legal disclosures;
15. activation height/time and abort conditions.

If any value is TBD, the token is not ready to activate.

## Near-term sequence

1. Ratify mission, rights, boundaries, and consent semantics.
2. Replace the prototypes’ unsafe defaults and secrets.
3. Implement signed evidence and independent receipts without a valuable token.
4. Run 5–10 agent, multi-host, non-sensitive pilots.
5. Add checkpointed deterministic ledger testnet and recovery drills.
6. Prove useful Vera improvement with poisoning and privacy measurement.
7. Reach independent operator and usage gates.
8. Finalize token activation only after security, economics, and legal review.

