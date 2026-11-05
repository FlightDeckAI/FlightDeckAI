# Decision APIs

**Lloyd Clark, PhD | Founder & CEO, FDRL.SI**

I use the term **Decision API** for an interface that returns a proposed decision together with the evidence, constraints, checks, and authority needed to review it. This is an architectural design target for the systems I work on.

## Decision object

- **Recommendation:** what the system proposes.
- **Evidence:** the records and observations supporting it.
- **Constraints:** what must remain true.
- **Alternatives:** feasible options considered.
- **Uncertainty:** what the system does not know.
- **Evaluation:** which deterministic and model-based checks passed.
- **Authority:** who may approve or execute the action.
- **Provenance:** enough lineage to reconstruct why the decision was produced.

The design target is a system that can ingest operational evidence, use models for interpretation, call deterministic solvers and tools where appropriate, and produce a decision artifact that can be tested and reviewed.

## Disconnected operation

Local inference, local retrieval, local evaluation, pinned artifacts, explicit dependencies, and operation without cloud services are architectural requirements for a disconnected deployment.

Model output needs to be evaluated alongside the surrounding data path, tool execution, constraints, and review process. Approval should bind to the exact proposed action and expected state.

## Related work

- [Approval as software architecture](07-approval-as-architecture.md)
- [Evaluating systems without cloud access](08-disconnected-ai-evaluation.md)
- [Experiments, methods, and limitations](https://github.com/FlightDeckAI/applied-ai-flight-tests)
- [Profile](../README.md)
