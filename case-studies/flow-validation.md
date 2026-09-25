# Flow Validation: equal counts can hide different records

**Reproducible synthetic experiment · v0.1.0 · GoldenAye Flow Lab research**

This supporting experiment evaluates the exported-record comparator only.

## The problem

Baseline and candidate outputs each contain ten rows. A count alone cannot establish that they contain the same events or values.

## The experiment

The passing candidate reorders records and changes ingestion timestamps while retaining event identities and content. The failing candidate duplicates an event, loses another, converts a numeric field to a string, and introduces a 35-second arrival delay.

With a ten-second p95 threshold:

| Dataset | Rows | Expected result | Why |
| --- | ---: | --- | --- |
| Passing candidate | 10 | PASS | Same events and content; arrival delay within threshold |
| Failing candidate | 10 | FAIL | Duplicate/missing ID, schema/content changes, excessive p95 delay |

Reports include per-check results, policy, and file hashes. No cloud model, API, or package download is needed.

## Practical limits

The tool compares bounded exports in memory. It does not validate a live deployment, measure processor execution time, or prove financial return. CSV fields remain strings, and schema summaries are top-level only.

[Run the example](../tools/nifi-flow-validation/README.md) · [Engineering note](../notes/03-data-before-models.md) · [Back](../README.md)
