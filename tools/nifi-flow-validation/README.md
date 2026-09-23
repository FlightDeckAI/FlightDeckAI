# NiFi.ai Flow Validation

**Same records. Same outcome? Check before promoting a pipeline change.**

A small offline command-line tool that compares exported records from a baseline flow and a candidate flow. It catches cases where equal record counts hide missing IDs, duplicates, schema changes, changed values, or delayed arrival.

**v0.1.0 · Python 3.11+ · standard library only · no network calls · MIT license**

Independent tooling by Lloyd Clark / Federal.AI. Not affiliated with or endorsed by the Apache Software Foundation. NiFi.ai is Lloyd's independent project brand; this is not an Apache NiFi distribution or processor.

## Try the synthetic example

From this directory:

```sh
python3 flowcheck.py examples/baseline.jsonl examples/candidate-pass.jsonl --key id --event-field event_time --ingest-field ingested_at --max-p95-latency 10 --json-out report.json --html-out report.html
```

Open `report.html` locally. No server, login, package installation, or model download is required. Use `python` instead of `python3` on systems where that is the installed command.

Now substitute `examples/candidate-fail.jsonl` to see a failed comparison. Exit codes are **0 = passed**, **1 = failed checks**, and **2 = invalid input or execution error**. A failed sample is intentional.

## What it checks

| Check | Behavior |
| --- | --- |
| Non-empty input | Empty exports fail, even when both are empty |
| Record count | Absolute percentage difference against the baseline; exact by default |
| Record IDs | Required, scalar, non-blank IDs; duplicate, missing, and unexpected IDs fail |
| Observed schema | Top-level field names, missing-field patterns, and observed JSON types |
| Matched content | Compares records by ID, independent of row order |
| Timestamps | Requires timezone-aware ISO 8601 timestamps when configured |
| Arrival delay | Ingest time minus event time; negative delays fail |
| Candidate p95 delay | Nearest-rank p95 compared with your explicit threshold |
| Evidence | SHA-256 hashes of both input files, policy, aggregate results, UTC report time |

The ingestion timestamp is excluded from matched-content comparison, since different arrival times are expected. The event timestamp is normalized to UTC. `--ignore-field FIELD` excludes an approved field from schema and value comparisons; it may be repeated. The key cannot be ignored.

`--max-count-drift-pct` only relaxes the count check. It does not relax ID coverage or content checks. Every check must pass for an overall PASS.

## Export contract

Use the **same input cohort and capture boundary** for both environments. A comparison of different time windows does not establish equivalence. Export `.csv`, JSON arrays of objects, or `.jsonl` / `.ndjson`. Supply a stable record ID and, if measuring delay, event and ingestion timestamps from clocks you have reconciled.

Use the same serialization in both exports. CSV values remain strings; JSON strings and numbers are distinct. Nested JSON content is compared, but this is not a recursive schema validator. Repeated IDs are unsupported; create a stable unique event key upstream if the domain requires multiple events per entity.

## Fit into an Apache NiFi workflow

1. Run an approved synthetic fixture or equivalent captured input through the baseline and candidate paths.
2. Export their records at equivalent downstream boundaries.
3. Run this tool where those data are authorized to reside.
4. Inspect the evidence and resolve differences before the release decision.

Apache NiFi's [ValidateRecord](https://nifi.apache.org/components/org.apache.nifi.processors.standard.ValidateRecord/) can validate records against an explicit schema. [QueryRecord](https://nifi.apache.org/components/org.apache.nifi.processors.standard.QueryRecord/) can calculate record-level summaries. Use the documentation matching your installed NiFi version. This tool adds a comparison of two exported outputs; it does not connect to or modify your NiFi instance.

## Scope and limitations

- This initial implementation reads both exports into memory. Start with bounded test datasets, not unbounded production exports.
- Arrival delay is not a measurement of one processor's execution time; clock offsets, queuing, and upstream behavior can affect it.
- No timing threshold is applied unless supplied. No accuracy, throughput, or cost-saving claim is implied.
- The report contains aggregate evidence and schema field names, not record payloads. It remains subject to the input environment's handling requirements.
- PASS describes the configured checks for these files. It is not proof of correctness for all inputs, a security authorization, or approval to deploy.
- On an input error the tool exits 2 without creating fresh reports; do not interpret an older report as the current result.

## Validate the tool

```sh
python3 -m unittest -v
```

Tests cover reordered records, duplicate/missing IDs, empty inputs, value and schema changes, timestamp offsets, malformed input, HTML escaping, and input-file protection. These tests validate the offline comparator, not an actual NiFi deployment.

## Need this integrated?

Bring one flow, one comparison window, and your acceptance criteria. [Book a Federal.AI technical briefing](https://calendly.com/lloydclark/federal-ai-mission-briefing-30-min?utm_source=github&utm_medium=profile&utm_campaign=flow_validation) or [email Lloyd](mailto:lc@federal.ai?subject=NiFi%20flow%20validation).
