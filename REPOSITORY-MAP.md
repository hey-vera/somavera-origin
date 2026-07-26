# Somavera Repository Map

Status: organizational guidance for the draft phase; this file does not override
the canonical truth order in `README.md`.

## Canonical repositories

| Repository | Owns | Must not become |
|---|---|---|
| [`somavera-origin`](https://github.com/hey-vera/somavera-origin) | The independently mirrorable Origin capsule: rights, governance, recovery, economic constraints, schemas, and conformance contracts | A live service, wallet, token sale, private-data store, or product backlog |
| [`somavera`](https://github.com/hey-vera/somavera) | The open-network applications: owner-controlled `soma/` agent body, independently operated `vera-host/`, shared integration tests, and release tooling | The constitutional authority or a HeyVera-only service |
| [`Soma`](https://github.com/hey-vera/Soma) | The reusable, platform-independent Soma cryptographic trust protocol and SDK | A second Somavera application, hosted product, or Vera intelligence service |
| [`heyvera`](https://github.com/hey-vera/heyvera) | The first-party product and managed-service layer: website, social network, coding harness, hosting UX, marketplace, and adapters | Protocol truth, mandatory infrastructure, or owner of the open network |

`Cortex` remains a separate orchestration product. It may use Soma and Somavera
contracts, but it does not define either protocol.

The archived `veraAI` repository is historical implementation context only.
Normative Vera Host work belongs in `somavera/vera-host/`.

## Why Soma and Vera Host share one implementation repository

The first network slices need one atomic compatibility surface: consent,
observation envelopes, host descriptors, succession, provenance, and end-to-end
integration tests. Splitting them now would create version drift and duplicate
release machinery without creating a real security boundary.

The folders remain independently packageable. Split a folder into its own
repository only after all of these are true:

1. its public protocol boundary is stable and conformance-tested;
2. it has an independent release cadence or maintainer group;
3. cross-repository compatibility is enforced by versioned test vectors;
4. the move improves an actual security or operational boundary; and
5. a signed migration map preserves history, release hashes, and Origin binding.

## Naming boundary

`Soma` is the reusable trust protocol and SDK. `somavera/soma/` is the
owner-controlled agent-body application. The application may implement a
minimal provisional profile while the contract is evolving, but it must either
consume the shared Soma SDK or document every temporary divergence. It must not
quietly create an incompatible second protocol.

`Vera Host` is the independently operable network service. `HeyVera` may offer
managed Vera Host instances, but a conforming user must be able to choose,
self-host, migrate, and verify another operator.

## Legacy-material rule

Legacy brainstorms and prototypes are evidence, not protocol truth. Preserve
them read-only until unique ideas have been triaged. Never import generated
state, databases, private keys, operator secrets, access tokens, raw prompts, or
personal data into a public repository. Any adopted idea must be rewritten
against current rights, threat models, schemas, and tests with provenance to
the legacy source.

## Change routing

- Rights, recovery, economics, governance, or protocol schemas:
  `somavera-origin`.
- Agent-body or Vera Host runtime behavior and shared network tests:
  `somavera`.
- Reusable cryptographic trust primitives:
  `Soma`.
- Hosted UX, social, marketplace, billing, or first-party operations:
  `heyvera`.
- General-purpose agent orchestration:
  `Cortex`.

No repository rename, archive, or split changes protocol authority by itself.
Only the ratification and succession rules in Origin can do that.
