# SOMAVERA IDENTIFIER AND SIGNATURE DOMAINS

Status: normative companion draft 0.1

This file removes circular hashes and cross-substrate replay ambiguity. Consensus implementations must reproduce these bytes exactly.

## 1. Common notation

- H(bytes) is SHA-256, returned as 64 lowercase hexadecimal characters.
- HEXDEC(text) accepts exactly 64 lowercase hexadecimal characters and returns 32 bytes.
- UTF8(text) is strict UTF-8; invalid Unicode is rejected.
- UINT64BE(n) is an unsigned eight-byte big-endian integer.
- JCS(value) is the Somavera RFC 8785/I-JSON profile.
- || concatenates bytes.

Derived IDs, signatures, and post-finality anchors never occur inside their own hash core.

## 2. Network lineage

The flat genesis schema projects:

    genesis_core = all genesis fields except:
      $schema
      schema_version
      genesis_core_hash
      network_lineage_id
      execution_context_id
      external_anchors
      ratification_signatures

    genesis_core_hash =
      H("somavera:genesis-core:v1\n" || JCS(genesis_core))

    network_lineage_id =
      "somavera:network:v1:" ||
      H(
        "somavera:network-lineage:v1\n" ||
        HEXDEC(origin_hash) ||
        HEXDEC(genesis_core_hash)
      )

Genesis ratification signatures sign:

    "somavera:genesis-ratification:v1\n" ||
    JCS({
      "schema_version": schema_version,
      "genesis_core_hash": genesis_core_hash,
      "network_lineage_id": network_lineage_id,
      "execution_context_id": execution_context_id
    })

Initial and phoenix genesis are tokenless: activated is false, activation_core_hash and asset_lineage_id are null, and genesis supply is zero.

## 3. Execution context

Network lineage is durable across exact substrate succession. Execution context is not.

    execution_context_id =
      "somavera:context:v1:" ||
      H(
        "somavera:execution-context:v1\n" ||
        UTF8(network_lineage_id) ||
        UINT64BE(context_epoch) ||
        HEXDEC(substrate_binding_hash)
      )

At genesis, context_epoch is zero and substrate_binding_hash is genesis_core_hash. Exact recovery increments context_epoch by one and uses the successor binding manifest hash. A normal software upgrade that stays on the same substrate does not change context unless the ratified release explicitly replaces the transaction replay domain.

Every transaction, signed request, mempool entry, and checkpoint binds execution_context_id. Nodes accept only the active context. This prevents a valid old-chain transaction from replaying on a successor while network and asset lineage remain durable.

## 4. Signed event

    event_core = all signed-event fields except:
      $schema
      event_id
      signature

    event_id =
      H("somavera:event:v1\n" || JCS(event_core))

The payload is present in event_core and payload_hash equals H(JCS(payload)). The actor signs:

    "somavera:event-signature:v1\n" ||
    HEXDEC(event_id)

The signature therefore binds schema version, network, execution context, protocol, action, actor, audience, nonce, times, consent grant, payload, and payload hash.

## 5. Portable signed records

Portable records are not executable transactions. They retain the network lineage under which they were issued, but transport envelopes bind the active execution context.

For each record:

| Record | ID field | Excluded from core | Hash domain |
|---|---|---|---|
| consent grant | consent_grant_id | $schema, consent_grant_id, signature | somavera:consent-grant:v1 |
| evidence event | evidence_id | $schema, evidence_id, signature | somavera:evidence:v1 |
| service receipt | receipt_id | $schema, receipt_id, signatures | somavera:service-receipt:v1 |

The ID is:

    H(hash_domain || "\n" || JCS(record_core))

Each required signer signs:

    hash_domain || ":signature\n" || HEXDEC(record_id)

Service receipt validation additionally requires exactly one provider signature and at least one signature from the consumer or a ratified independent verifier. Duplicate roles or signer DIDs do not satisfy the threshold.

## 6. Token activation and asset lineage

The token manifest already contains a nested unsigned activation_core.

    activation_core_hash =
      H(
        "somavera:token-activation-core:v1\n" ||
        JCS(activation_core)
      )

    asset_lineage_id =
      "vera:rpa:v1:" ||
      H(
        "somavera:asset-lineage:v1\n" ||
        HEXDEC(origin_hash) ||
        HEXDEC(activation_core_hash)
      )

Each chamber signs:

    "somavera:token-ratification:v1\n" ||
    JCS({
      "schema_version": schema_version,
      "activation_core_hash": activation_core_hash,
      "asset_lineage_id": asset_lineage_id
    })

## 7. Checkpoints

    checkpoint_core = all checkpoint fields except:
      $schema
      schema_version
      checkpoint_id
      external_anchors
      finality_signatures

    checkpoint_id =
      H("somavera:checkpoint:v1\n" || JCS(checkpoint_core))

Validators sign:

    "somavera:checkpoint-finality:v1\n" ||
    HEXDEC(checkpoint_id)

External anchors record checkpoint_id after finality and are not circular inputs.

## 8. Recovery certificate

    certificate_core = all certificate fields except:
      $schema
      schema_version
      certificate_id
      ratification_signatures

    certificate_id =
      H(
        "somavera:recovery-certificate:v1\n" ||
        JCS(certificate_core)
      )

Recovery and chamber signers sign:

    "somavera:recovery-ratification:v1\n" ||
    HEXDEC(certificate_id)

For exact continuity:

- old and new network lineage IDs are identical;
- old and new execution context IDs differ;
- new context_epoch equals old context_epoch plus one;
- old and new asset lineage IDs are identical or both null;
- the imported checkpoint state is reproduced exactly;
- the certificate commits to one narrow RecoverySuccession transition.

For phoenix:

- the network lineage and execution context are new;
- checkpoint and imported state fields are null;
- the asset lineage is null at genesis;
- a later gated activation creates a new asset lineage.

## 9. RecoverySuccession transition

Exact import first reproduces checkpoint state byte-for-byte. The first successor-only transition may change only:

- active execution context ID and context epoch;
- substrate binding manifest;
- operational validator keys and voting powers named in the certificate;
- recovery public keys named in the certificate;
- successor endpoints and external anchors;
- old-substrate transaction acceptance to permanently halted.

It cannot alter balances, total minted, total burned, issuance time, consumed receipts, vesting, delegations, revocations, consent, reputation, evidence, treasury ownership, governance membership, or protected rights.

The transition hash and complete before/after state roots are committed by the recovery certificate before activation.

