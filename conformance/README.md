# CONFORMANCE VECTORS

These vectors pin consensus-critical primitives before independent implementations exist.

- canonicalization-v1.json covers a small RFC 8785/I-JSON subset used by the included checker;
- ed25519-rfc8032-v1.json reproduces the first RFC 8032 Ed25519 test vector;
- future releases must add full RFC canonicalization edge cases, domain-separated event signatures, Merkle construction, every state transition, negative cases, and cross-language outputs.

Run `npm ci` before `npm run check`; the pinned Ajv dependency is part of the
reproducible validation path. The included JavaScript remains neither the
required independent second implementation nor a security certification.

`wire-invalid-v1.json` mutates the valid-shape wire examples and pins mandatory rejection of discovery-path substitution, signing/encryption key-role reuse, circular fields, clear plaintext fingerprints, outer/header mismatches, chunk-count mismatch, return-key substitution, contradictory acknowledgement decisions, signing-key mismatch, invalid delegation, and missing citation sources.

The checker performs standards-complete Draft 2020-12 schema meta-validation,
positive example validation, generated structural-negative validation, the
legacy defensive schema-subset checks, and explicit token, recovery, and wire
semantic/adversarial checks. These checks are necessary but not sufficient
cryptographic conformance. Before the wire profile can leave `freeze_blocking_draft`, independent implementations must publish positive and negative vectors for:

- RFC 9180 setup and key wrap;
- AES-256-GCM chunk AAD, nonces, ciphertext hashes, and Merkle roots;
- every identifier and Ed25519 signature domain; and
- wrong-recipient, lifecycle, replay, truncation, reordering, and outer/inner mismatch cases.

