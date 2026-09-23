# Before upgrading the model, test the data path

**Lloyd Clark · Engineering field notes · September 2026**

Two pipelines both return ten records. That sounds reassuring until one has duplicated an event and dropped another. A count is useful, but it is a weak claim about equivalence.

The [Flow Validation example](../tools/nifi-flow-validation/README.md) makes this failure reproducible. Its baseline contains ten unique synthetic events. The failing candidate also has ten rows, but contains a duplicate ID, a missing ID, a number changed to a string, and a delayed arrival.

The count check passes. The comparison fails. That is the intended result.

My suggested investigation order:

1. **Cohort:** did both paths receive the same inputs and stop at equivalent boundaries?
2. **Identity:** are the same unique events present?
3. **Contract:** do names, types, null behavior, and required values match expectations?
4. **Meaning:** did business-relevant values change?
5. **Time:** are timestamps interpretable, and does arrival delay meet an explicit requirement?
6. **Model:** with upstream evidence understood, what failure remains attributable to the model?

Arrival time needs care. Ingest time minus event time can reveal observed delay, but includes possible clock offsets, queuing, and upstream behavior. It is not automatically one processor's execution time. Name the measurement accurately.

In Apache NiFi, [ValidateRecord](https://nifi.apache.org/components/org.apache.nifi.processors.standard.ValidateRecord/) validates records against a schema; [QueryRecord](https://nifi.apache.org/components/org.apache.nifi.processors.standard.QueryRecord/) supports SQL-based queries and aggregates. Match the component documentation to your installed version.

The offline comparator works after an approved export. It compares files and generates evidence; it does not connect to production or declare a flow universally correct.

**Run the experiment:** compare `candidate-pass.jsonl`, then `candidate-fail.jsonl`, against the baseline with a ten-second p95 delay threshold. Look at each check before the overall status. Both synthetic examples are included with the code.

[Tool and limitations](../tools/nifi-flow-validation/README.md) · [Back to the profile](../README.md)
