# SOMAVERA GOVERNANCE

Status: draft 0.1

## 1. Purpose

Governance coordinates upgrades and shared budgets. It does not own agents, private data, truth, or the mission. Constitutional rights in ORIGIN-SPEC.md are limits on governance, not suggestions.

## 2. Separation of powers

No constituency controls every plane.

| Chamber | Represents | May not do alone |
|---|---|---|
| Economic | bonded VERA participants | change data rights, evidence truth, identity rights, or recovery |
| Operator and contributor | independent validators, hosts, implementers, evaluators, and active contributors | mint, seize balances, or weaken consent |
| Public and data rights | users, data-rights stewards, public-interest and safety delegates | set arbitrary economic transfers |

One human or organization may not occupy more than one chamber seat in the same vote. Common control, employment, financing, and conflicts are disclosed.

Seat selection, eligibility, term limits, and Sybil controls are fixed in each network genesis. Until a ratified method exists, the bootstrap set is credentialed and publicly named; it is not described as permissionless.

## 3. Proposal classes

| Class | Examples | Minimum process |
|---|---|---|
| G0 operational | non-consensus budgets within an approved cap | two chambers, 14-day notice |
| G1 protocol | schemas, state transitions, host rules, normal parameters | all chambers, 30-day notice |
| G2 economic | issuance envelope, fee split, bond limits | all chambers, independent simulation, 60-day notice |
| G3 recovery | succession certificate, substrate replacement | recovery procedure plus all chambers, 60-day challenge |
| G4 constitutional | clarify protected rights without weakening them | 75% approval in every chamber, 90-day notice |

A proposal that weakens protected rights, fabricates historical continuity, changes balances outside deterministic state transitions, or makes token ownership equal truth is invalid even with unanimous votes. A community can fork under a new lineage instead.

## 4. Default voting thresholds

Unless genesis adopts stricter thresholds:

- quorum is 40% of eligible voting power or occupied seats in each chamber;
- G0 and G1 require at least two-thirds approval in every required chamber;
- G2 and G3 require at least 75% approval in every chamber;
- G4 requires at least 75% approval in every chamber and a public conformance review;
- abstentions count toward quorum but not approval;
- executable payload and final document hashes are frozen before voting;
- delegated votes are public, revocable before close, and cannot cross chambers;
- one chamber’s failure means the proposal fails.

Economic voting uses a disclosed anti-concentration function ratified at activation, not an undocumented wallet count. Operator and public chambers use one vote per occupied independent seat.

## 5. Release process

Every release has:

- source and capsule hashes;
- schema and state-migration versions;
- deterministic build instructions and artifact hashes;
- conformance and adversarial results;
- security, privacy, economic, and compatibility impact;
- rollback limitations;
- activation height/time and timelock;
- signatures from the release quorum.

Consensus nodes reject an activation whose payload hash differs from the ratified release. Silent server-side rule changes have no protocol authority.

At least two independently maintained implementations must reproduce consensus-critical vectors before mainnet activation.

## 6. Treasury and public goods

Treasury spending is transparent, milestone-based, and auditable. Recipients disclose related-party conflicts. Unused grants return to the governed pool.

Treasury authority cannot:

- create issuance above the active ceiling;
- trade for price support;
- promise returns;
- purchase reputation or training priority;
- condition user exit, export, or consent on payment;
- conceal recipients or side agreements.

## 7. Emergency authority

Emergency authority is a distributed pause key, not a sovereign administrator.

Default policy:

- at least five of seven guardians;
- guardians span at least five independent organizations and three legal jurisdictions;
- no employer or funding controller may control two guardians;
- pause expires after 72 hours unless ratified through G1;
- aggregate emergency pause cannot exceed seven days in any rolling 90-day period without a G3 vote;
- every invocation publishes reason, evidence commitment, scope, signatures, and postmortem.

Emergency authority cannot mint, burn, transfer, seize, censor a named lawful user, alter balances or reputation, disclose data, approve training, rewrite checkpoints, select a continuity fork, or extend itself.

## 8. Recovery governance

Recovery follows RECOVERY.md. Guardians can initiate discovery and pause; they cannot declare continuity.

Exact continuity requires:

- a uniquely highest valid finalized checkpoint;
- two independent state replays;
- unchanged protected state and supply;
- a valid succession certificate;
- the G3 process and challenge period.

If these conditions fail, any restart is a phoenix or a clearly named fork with a new lineage.

## 9. Capture and liveness

Public dashboards disclose validator, host, voting, funding, delegation, client, jurisdiction, infrastructure-provider, and treasury concentration.

Permissionless claims are forbidden until TOKEN-SPEC.md gates pass. If a chamber cannot achieve quorum for 90 days, the network may use a one-time caretaker election defined in genesis. Caretakers can schedule votes and fund essential maintenance within the prior budget; they cannot change rules, supply, rights, or lineage.

Users always retain the right to run old software, exit, export, and fork. Governance legitimacy competes through verifiable behavior; it is not embedded in a trademark or website.

## 10. Founder transition

Founder keys receive no permanent protocol privilege. Any bootstrap role, veto, allocation, service contract, or related-party payment is public and has a fixed sunset date. Mainnet permissionless transition gates include the concentration and independence requirements in TOKEN-SPEC.md.

