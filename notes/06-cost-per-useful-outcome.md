# Measure AI cost per useful outcome

**Lloyd Clark, PhD · Engineering field notes · September 2026**

A cheap model response can create expensive work. My preferred unit of comparison is the **accepted outcome**: a completed item that passes the same quality threshold as the existing workflow. For a document extraction task, that might mean the required fields are correct, supporting references are present, and a reviewer has resolved exceptions.

Define acceptance before comparing models. Otherwise, a faster system can appear productive by moving unfinished work into someone else's queue.

The calculation I use is:

> Cost per accepted outcome = (execution + review + rework + allocated operating cost) / accepted outcomes

Include rejected attempts in the numerator. Count an item once in the denominator, even if it took several attempts. Keep the measurement window open long enough to observe downstream corrections. When nothing passes, report the cost and zero accepted outcomes; the ratio is undefined.

Consider a **hypothetical** batch of 100 document summaries. These numbers are assumptions for illustration, not customer results or vendor prices. Labor is valued at $75 per hour. Both approaches must meet the same acceptance rubric and finish with 90 accepted summaries.

| Batch cost | Existing process | AI-assisted process |
| --- | ---: | ---: |
| Preparation and review | 100 × 12 min = $1,500 | 100 × 4 min = $500 |
| Additional rework | Included above | 20 × 6 min = $150 |
| Model execution | $0 | $30 |
| Allocated integration, evaluation, and operation | $0 incremental | $150 |
| Total measured cost | **$1,500** | **$830** |
| Cost per accepted summary | **$16.67** | **$9.22** |

Common overhead is excluded from both columns; the $150 is additional AI cost allocated to this batch. The manual time includes its corrections. AI rework includes repeat review. A real comparison must use observed costs and apply the same accounting boundary to both approaches.

The apparent improvement is $670 per batch, but that is an economic valuation of capacity and operating cost. It becomes cash savings only when spending actually changes. Released time can still be valuable if the organization uses it to clear a backlog or improve service.

Now vary the assumption most likely to fail: review effort. At eight minutes per AI summary, total cost becomes $1,330, or $14.78 per accepted summary. Holding other costs and acceptance constant, break-even review time is 9.36 minutes per attempted summary. That threshold tells a pilot team what to measure closely.

Acceptance also matters. Holding the $830 cost fixed while accepted output falls to 70 raises the ratio to $11.86, but leaves 30 unresolved items. The ratio alone conceals that backlog. Report acceptance rate, unresolved work, elapsed time, and serious errors beside it. A critical quality failure should stop promotion even when the average cost looks attractive.

For a pilot, use comparable work, record case difficulty, and time the complete human workflow. Publish the assumptions and sensitivity analysis with the result. NIST's AI RMF supports contextual measurement and ongoing evaluation; the costing method here is my proposed operating measure, not a NIST formula.

**Primary source:** [NIST AI RMF Core — Map, Measure, and Manage](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/).

[Back to the profile](../README.md) · [Discuss an evaluation](mailto:lc@federal.ai?subject=AI%20cost%20per%20useful%20outcome)
