# CONFORMANCE VECTORS

These vectors pin consensus-critical primitives before independent implementations exist.

- canonicalization-v1.json covers a small RFC 8785/I-JSON subset used by the included checker;
- ed25519-rfc8032-v1.json reproduces the first RFC 8032 Ed25519 test vector;
- future releases must add full RFC canonicalization edge cases, domain-separated event signatures, Merkle construction, every state transition, negative cases, and cross-language outputs.

The included JavaScript is not the required second implementation and is not a security certification.

