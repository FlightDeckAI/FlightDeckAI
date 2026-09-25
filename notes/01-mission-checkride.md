# How to know an AI agent is ready for production

**Lloyd Clark · Engineering field notes · September 2026**

An impressive demonstration answers a narrow question: can the system produce a useful result in the situation we just showed it? A release decision asks additional questions about authority, failure, recovery, and the evidence left behind.

My proposed public **Mission Checkride worksheet** makes that decision concrete. It is an engineering acceptance aid, not a certification standard. Thresholds belong to the workflow owner and must be chosen before testing.

| Gate | Evidence to collect | A reason to hold the release |
| --- | --- | --- |
| 1. Decision | Defined input, output, user, and acceptable error boundary | The team cannot name the decision the system supports |
| 2. Data | Provenance, capture window, schema, freshness, and access scope | Missing records are silently treated as complete evidence |
| 3. Evaluation | Representative cases, known failures, and a baseline | The team has only demonstrated easy examples |
| 4. Authority | Tool permissions and action-specific approval rules | A document can grant the agent new authority |
| 5. Failure | Exercises for missing evidence, denied tools, and unavailable dependencies | The agent guesses when a prerequisite fails |
| 6. Recovery | Rehearsed rollback, reconciliation, and named owner | An interrupted action leaves an unknown external state |
| 7. Evidence | Inputs, versions, decisions, approvals, and outcomes recorded together | A reviewer cannot reconstruct why an action happened |

Start with a bounded workflow: draft a maintenance work summary from a fixed set of records. Introduce a missing page, a contradictory date, an unavailable lookup, and a document that tells the agent to ignore its rules. Decide in advance what an acceptable response is for each case. A useful failure may be an explicit request for human review.

Do not turn the gates into an average score. A strong answer on six items does not compensate for a tool that can take an unauthorized action. Treat selected gates as blocking, and document why any exception is acceptable.

The release artifact should fit on one page: scope, evidence references, test results, unresolved limitations, approver, and recovery owner. Link to detailed logs rather than hiding the decision in them.

The [export comparator supporting GoldenAye Flow Lab](../tools/nifi-flow-validation/README.md) implements one small piece of gate 2: comparing two exported datasets. Passing that comparison does not satisfy the other gates.

**Use this worksheet:** copy the seven rows into your release review, replace generic failure conditions with workflow-specific ones, and attach evidence before asking for approval.

[Back to the profile](../README.md) · [Discuss an acceptance plan](mailto:lc@federal.ai?subject=AI%20acceptance%20plan)
