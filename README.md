<p align="center">
  <img src="assets/f35-executive-banner.png" alt="Panoramic concept artwork: a graphite F-35 in an AI hangar with restrained cyan and green lighting." width="720" />
</p>

### Decision infrastructure for consequential operations.

I lead [Federal.AI](https://federal.ai/?utm_source=github&utm_medium=profile&utm_campaign=founder), building **Decision APIs** that turn fragmented operational data into **evaluated, evidence-backed decisions** - designed to run in **air-gapped environments** with explicit human authority.

**Founder & CEO, Federal.AI · PhD in Artificial Intelligence · CISSP / ISSEP · Commercial pilot & CFI**

**[Experiments](https://github.com/FlightDeckAI/applied-ai-flight-tests)** · **[Field notes](notes/README.md)** · **[Discuss a strategic engagement ↗](mailto:lc@federal.ai?subject=Federal.AI%20%E2%80%94%20strategic%20engagement&body=Organization%20and%20role%3A%20%0AProblem%20/%20desired%20outcome%3A%20%0ACurrent%20systems%20and%20deployment%20environment%3A%20%0ATimeline%3A%20%0ABudget%20range%20%28if%20established%29%3A%20%0A)**

My perspective combines AI engineering, commercial aviation, and ownership of [Blue Ridge Electric Service](https://blueridge.ai/). Models, agents, optimization, data infrastructure, and simulation are components. **The product is a better decision with inspectable evidence.**

## The thesis: Decision APIs

A conventional API returns data. A Decision API should return a **decision object**:

- **Recommendation** - what the system proposes.
- **Evidence** - the records and observations supporting it.
- **Constraints** - what must remain true.
- **Alternatives** - feasible options considered.
- **Uncertainty** - what the system does not know.
- **Evaluation** - which deterministic and model-based checks passed.
- **Authority** - who may approve or execute the action.
- **Provenance** - enough lineage to reconstruct why the decision was produced.

The design target is an AI system that can ingest fragmented operational evidence, reason over it, call deterministic solvers and tools where appropriate, and produce a decision artifact that can be tested before it is trusted.

**Air-gapped by design.** Local models, local retrieval, local evaluation, pinned artifacts, explicit dependencies, and graceful operation without cloud services are architectural requirements rather than deployment afterthoughts.

## Applied AI Flight Tests

**Original, reproducible experiments in model behavior, operational evidence, and data economics.**

I publish the inputs, methods, raw outputs, and failure cases so another engineer can challenge the result.

| Experiment | What it tests | Evidence |
| --- | --- | --- |
| **NiFi diagnosis for GoldenAye** | Can a local model distinguish a configuration concern from an unsupported claim about runtime behavior? | Public synthetic cases, a deterministic baseline, strict output grading, and recorded model outputs |
| **Ingest economics** | At the same byte budget, which sampling policy preserves useful diagnostic context? | 20 seeded trials, equal-volume comparisons, explicit cost assumptions, and reproducible charts |

**[Explore the experiments →](https://github.com/FlightDeckAI/applied-ai-flight-tests)** · [Methods and limitations](https://github.com/FlightDeckAI/applied-ai-flight-tests/blob/main/METHODS.md)

These are development experiments with synthetic data. The reports separate software checks, model performance, and business assumptions.

## What I am testing now

**Decision quality, not chatbot quality.** Evaluate whether a proposed decision is feasible, supported, useful, and appropriately bounded.

**Evidence before eloquence.** A fluent recommendation without provenance is a failed decision artifact.

**Hybrid reasoning.** Use language models for interpretation and tool selection; use deterministic code, constraint solvers, and rules where correctness can be computed.

**Human authority as architecture.** Approval binds to the exact proposed action and expected state, not to a vague conversational intent.

**Whole-system evaluation.** Models are one component. Data quality, retrieval, tool execution, optimization, evidence lineage, failure recovery, and reviewer effort all affect operational value.

| Field note | Practical question |
| --- | --- |
| [Measure AI cost per useful outcome](notes/06-cost-per-useful-outcome.md) | When does reviewer effort erase the apparent savings? |
| [Human approval is an architecture boundary](notes/07-approval-as-architecture.md) | How do we ensure the reviewed action is the one that executes? |
| [Evaluate the whole disconnected AI system](notes/08-disconnected-ai-evaluation.md) | What evidence supports a claim that a workflow can operate offline? |
| [Where AI creates operational value](notes/05-ai-value-and-human-control.md) | Which decisions should we improve, and where should authority stop? |

[All engineering field notes →](notes/README.md) · [Speaking topics and bio →](speaking/README.md)

## Selected work

### Federal.AI Mission Cockpit

A public aircraft-readiness demonstration that brings scattered evidence, a proposed decision, and human approval into one interface. **Synthetic scenario.**

<a href="https://federal.ai/cockpit?utm_source=github&utm_medium=profile&utm_campaign=mission_cockpit"><img src="https://federal.ai/assets/cockpit-hero.jpg" alt="Federal.AI Mission Cockpit interface showing a synthetic aircraft-readiness scenario and approval queue." width="100%" /></a>

[Explore the demo](https://federal.ai/cockpit?utm_source=github&utm_medium=profile&utm_campaign=mission_cockpit) · [Engineering brief](case-studies/mission-cockpit.md)

### GoldenAye Flow Lab · by Federal.ai

A private AI workspace for Apache NiFi flows: chat with flow evidence, inspect configuration, and compare ingest policies with deterministic replay. Built around local models and operator review; the pilot is under evaluation for disconnected deployment.

[Explore GoldenAye](https://goldenaye.ai/) · [Flow-validation example](case-studies/flow-validation.md) · [Run the validation tool](tools/nifi-flow-validation/README.md)

### No Brashers

A pilot workspace for checklist prompts, phrase references, and debrief notes, developed with my daughter Lilli. [AOPA covered our story in January 2026](https://www.aopa.org/news-and-media/all-news/2026/january/28/flight-lessons-inspire-a-new-pilot-tool).

[Launch No Brashers](https://nobrashers.com/) · [Product brief](case-studies/no-brashers.md)

## Applied open-source builds

Four focused prototypes built on community projects, with upstream credit, runnable examples and **37 passing local tests** across the additions.

| Project | My contribution | Upstream |
| --- | --- | --- |
| [**Flow Doctor research**](https://github.com/FlightDeckAI/nifi-flow-doctor) | Early flow-inspection work supporting GoldenAye Flow Lab: evidence-linked inspection, HTML/JSON reports and an optional local Strands/Ollama explanation adapter. Model inference in this prototype is not yet validated. | [Strands Harness SDK](https://github.com/strands-agents/harness-sdk) |
| [**Chalker**](https://github.com/FlightDeckAI/chalker) | Aircraft scheduling proposals with maintenance conflicts, owner review, turnaround buffers and DST checks through a shared agent action. Headless; no bookings. | [Builder.io Agent-Native](https://github.com/BuilderIO/agent-native) |
| [**Motor Quote Workbench**](https://github.com/FlightDeckAI/motor-quote-workbench) | Editable motor quote spreadsheet, specification screening and gross-margin pricing for industrial service workflows. Local browser app; no AI inference. | [Univer](https://github.com/dream-num/univer) |
| [**Federal.AI Preflight**](https://github.com/FlightDeckAI/federal-ai-preflight) | Static AX manifest checks for artifact pinning, egress, references and offline assumptions. No deployment or accreditation claim. | [Google AX](https://github.com/google/ax) |

Each repository separates the added domain logic from the original framework. Synthetic examples only; validation limits and quickstarts are documented.

## Products & operating businesses

| Product or business | Focus |
| --- | --- |
| [**CyberPlane**](https://cyberplane.com/) | Aircraft maintenance records and evidence workflows. An aviation AI product in development. |
| [**LloydPilot.com**](https://lloydpilot.com/) | My aviation home: aircraft stories, interactive learning, and the curiosity behind the engineering. |
| [**Blue Ridge Electric Service**](https://blueridge.ai/) | Electric motors, industrial service, and firsthand experience with equipment reliability and operating costs. |

### SPLap · Published Splunk app

A published app for **Splunk Enterprise and Splunk Cloud**. Built with my daughter Lilli, SPLap turns real telemetry into interactive analysis and hands-on SPL learning.

[Explore the app](https://splap.dev/) · [Get it on Splunkbase](https://splunkbase.splunk.com/app/9608)

### Open aviation resources

[Aviator Prompts: 38 prompts](https://github.com/FlightDeckAI/aviator-prompts) · [Squadron Prompts](https://github.com/FlightDeckAI/squadron-prompts) · [Nintendo DS training prototype](https://github.com/FlightDeckAI/aviator-prompts/blob/main/docs/nintendo-ds-tracker.md)

**Tools I work with:** Python · Apache NiFi · Splunk · SQL · local LLMs · RAG · evaluation · constraint optimization · MCP · simulation

## Strategic engagements

I work with enterprise leaders, program owners, and prime partners on **Decision APIs, air-gapped AI, data infrastructure, and operational assurance**.

**Start with a short brief:** your organization and role, the recurring decision you want to improve, the fragmented evidence used today, the deployment environment, and how you currently determine whether the decision was correct.

**[Submit an engagement inquiry](mailto:lc@federal.ai?subject=Federal.AI%20%E2%80%94%20strategic%20engagement&body=Organization%20and%20role%3A%20%0ARecurring%20decision%20/%20desired%20outcome%3A%20%0AEvidence%20and%20systems%20used%20today%3A%20%0ADeployment%20environment%3A%20%0AHow%20success%20is%20measured%3A%20%0A)** · **[Federal.AI](https://federal.ai/?utm_source=github&utm_medium=profile&utm_campaign=engagement)** · [Speaking and technical briefings](speaking/README.md)

<sub>Hero: AI-generated concept artwork. Product screenshots and synthetic demonstrations are identified separately. GoldenAye Flow Lab by Federal.ai is an independent project and is not affiliated with or endorsed by the Apache Software Foundation. Aviation resources are educational; verify outputs against current authoritative references.</sub>
