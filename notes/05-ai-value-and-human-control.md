# Where AI creates operational value—and what must remain under human control

**Lloyd Clark, PhD · Executive perspective · September 2026**

I evaluate an AI investment by the decision it improves, the evidence behind that decision, and the responsibility for what happens next.

That perspective connects my work in AI, commercial aviation, and industrial ownership. An aircraft discrepancy, a motor specification, and a data-pipeline failure are different problems. Each still requires someone to establish what is known, decide what to do, and account for the result.

## Begin with one operating decision

Before choosing a model, name the decision, its owner, and the cost of getting it wrong. Then ask where the work is slow: finding evidence, interpreting it, comparing options, or executing the next step.

A useful first deployment has a bounded input, a clear output, a baseline, and someone who will use the result. “Add an AI assistant” leaves too much undefined. “Assemble a draft maintenance history from these records, with a source for each statement and unresolved gaps flagged” gives a team something concrete to evaluate.

The following are illustrative workflow choices, not claims of delivered customer results:

| Workflow | Useful AI contribution | Responsibility I would retain with the human owner |
| --- | --- | --- |
| Aviation records | Extract discrepancies, reconcile dates, and prepare a referenced summary | Resolve conflicting evidence and approve maintenance or operational decisions |
| Electric-motor service | Read nameplates, flag missing specifications, and assemble a draft quote | Confirm equipment suitability, commercial terms, and commitments |
| NiFi data operations | Explain a flow, identify uncertain assumptions, and propose changes with supporting evidence | Approve retention policy and production changes |
| Operational planning | Compare scenarios and expose the assumptions driving the result | Choose priorities and accept the consequences of the plan |

## Measure value after the work of operating the system

My investment case starts with a baseline: review time, error rate, rework, throughput, or another outcome the workflow owner already understands. A pilot should compare results against that baseline on representative work, including difficult cases.

I would report recoverable cost savings separately from released capacity. Saving five hours of review does not automatically remove five hours of payroll expense; those hours may instead let the same team complete more work. Both can matter, but they answer different business questions.

The cost side includes integration, model execution, infrastructure, evaluation, ongoing maintenance, and human review. If a capable model produces answers that take longer to verify than the original task, the deployment needs a different scope or design.

## Make authority explicit

Some steps can be automated end to end. I would start with read-only analysis and drafts, then allow bounded, reversible actions when testing supports them.

The action boundary should be written down: what the system may read, what it may change, which limits apply, and what requires approval. Consequential actions need an identifiable owner, enough evidence to make an informed decision, and a defined response if execution fails.

Human review only helps when the reviewer can see the source material, the proposed change, the uncertainty, and the likely effect. A generic “Approve” button provides little support for judgment.

## Treat the operating environment as part of the product

In a disconnected deployment, the model is only one dependency. Installation packages, documentation, credentials, evaluation data, logging, and the update process must all fit the environment.

My scope for such a system would include an offline installation exercise and a rehearsed failure path. Missing evidence or an unavailable dependency should produce a visible limitation, not an invented answer or an unnoticed fallback to a cloud service.

## Decide what earns a wider release

Before a pilot, agree on success criteria, failure conditions, and who can stop the rollout. Retest after changes to the model, data sources, prompts, tools, or permissions that could affect those criteria.

I want a release decision to answer five questions:

1. Does this improve the named workflow against its baseline?
2. Can the user inspect the evidence behind a consequential recommendation?
3. Does the system stay within its assigned authority when inputs are incomplete or hostile?
4. Can the team recover from a failed or interrupted action?
5. Does the improvement still justify the full operating cost?

A narrow deployment that clears those questions gives an organization a foundation for expanding AI responsibly.

**For the implementation review:** [Mission Checkride worksheet](01-mission-checkride.md) · [Working without internet access](02-disconnected-ai.md) · [Verify the data path](03-data-before-models.md)

[Back to the profile](../README.md) · [Discuss a strategic engagement](../README.md#strategic-engagements)
