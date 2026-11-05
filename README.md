**Lloyd Clark, PhD**  
Founder & CEO, FDRL.SI

I build and operate software businesses across defense, aviation, and industrial services. At FDRL.SI, I lead product direction and customer delivery, and remain hands-on with software architecture and implementation.

My engineering work focuses on local inference, model evaluation, data pipelines, and constrained optimization, including systems designed for disconnected environments.

<p align="center">
  <img src="assets/f35-executive-banner.png" alt="Generated concept artwork of an F-35 in a hangar." width="560" />
</p>

## Current work

- **Model evaluation:** compare model output with deterministic baselines, inspect failure cases, and measure the cost of review and rework.
- **Disconnected systems:** package local inference, retrieval, evaluation, pinned artifacts, and explicit dependencies for operation without cloud access.
- **Decision systems:** combine model interpretation with deterministic checks, constraints, and approval tied to the proposed action.

I use **Decision APIs** for interfaces that return a recommendation together with its evidence, constraints, uncertainty, and approval requirements. [Architecture note](notes/09-decision-apis.md).

## Selected engineering

| Work | Engineering focus | Status |
| --- | --- | --- |
| [GoldenAye Flow Lab](https://goldenaye.ai/) | Apache NiFi flow inspection, evidence-linked explanations, and ingest-policy comparisons with deterministic replay. [Validation tool](tools/nifi-flow-validation/README.md). | Pilot; disconnected deployment under evaluation. |
| [SPLap](https://splunkbase.splunk.com/app/9608) | Interactive analysis and SPL learning using real telemetry. Built with my daughter Lilli for Splunk Enterprise and Splunk Cloud. | Published Splunk app. |
| [Chalker](https://github.com/FlightDeckAI/chalker) | Aircraft scheduling proposals with maintenance conflicts, turnaround buffers, owner review, and daylight-saving-time checks. Built on [Builder.io Agent-Native](https://github.com/BuilderIO/agent-native). | Headless prototype; no bookings. |
| [Motor Quote Workbench](https://github.com/FlightDeckAI/motor-quote-workbench) | Motor specification screening, editable quote spreadsheets, and gross-margin pricing on [Univer](https://github.com/dream-num/univer). | Local browser prototype; no model inference. |

Related builds: [Flow Doctor research](https://github.com/FlightDeckAI/nifi-flow-doctor), based on [Strands Harness SDK](https://github.com/strands-agents/harness-sdk), and [FDRL.SI Preflight](https://github.com/FlightDeckAI/federal-ai-preflight), based on [Google AX](https://github.com/google/ax). Their repositories document my additions and validation limits. The [aircraft-readiness demonstration](case-studies/mission-cockpit.md) uses a synthetic scenario.

## Experiments and writing

I publish inputs, methods, raw outputs, and failure cases so another engineer can reproduce and challenge the results.

- **NiFi diagnosis:** test whether a local model can distinguish a configuration concern from an unsupported claim about runtime behavior, using synthetic cases, deterministic baselines, and strict output grading.
- **Ingest economics:** compare sampling policies at equal byte budgets across 20 seeded trials, with explicit cost assumptions and reproducible charts.

[Experiment source and results](https://github.com/FlightDeckAI/applied-ai-flight-tests) · [Methods and limitations](https://github.com/FlightDeckAI/applied-ai-flight-tests/blob/main/METHODS.md)

These are development experiments with synthetic data; software checks, model performance, and business assumptions are reported separately.

Recent notes cover [cost per useful outcome](notes/06-cost-per-useful-outcome.md), [approval as software architecture](notes/07-approval-as-architecture.md), and [evaluation without cloud access](notes/08-disconnected-ai-evaluation.md). [All field notes](notes/README.md).

## Background

I own [Blue Ridge Electric Service](https://blueridge.ai/), an industrial motor service business. Working with repair, quoting, documentation, and operating costs informs the software problems I choose.

I am a commercial pilot and flight instructor, with a PhD in Artificial Intelligence and CISSP / ISSEP certifications. Lilli and I also built [No Brashers](case-studies/no-brashers.md), a pilot workspace for checklist prompts and debrief notes. [AOPA covered the project](https://www.aopa.org/news-and-media/all-news/2026/january/28/flight-lessons-inspire-a-new-pilot-tool).

**Tools:** Python · SQL · Apache NiFi · Splunk · local LLMs · retrieval · evaluation · constraint optimization · MCP · simulation

[Email](mailto:lc@federal.ai) · [Speaking and bio](speaking/README.md) · [Aviation projects](https://lloydpilot.com/)

<sub>Banner: generated concept artwork. Public examples identify synthetic data and validation limits. GoldenAye Flow Lab is independent of the Apache Software Foundation.</sub>
