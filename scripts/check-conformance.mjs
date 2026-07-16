// Run the stable core first; it also loads the shared Soma/Vera wire checks.
await import("./check-conformance-core.mjs");

// Recovery/Phoenix authority, state-availability, death-policy, and adversarial checks.
await import("./lib/recovery-conformance.mjs");

// Exact noncircular recovery identifiers and signature-message projections.
await import("./lib/recovery-domain-conformance.mjs");

// Standards-complete JSON Schema 2020-12 validation for every schema/example pair.
await import("./lib/full-schema-conformance.mjs");

// Parse every Markdown fence labelled JSON so documentation examples cannot silently rot.
await import("./lib/document-json-conformance.mjs");
