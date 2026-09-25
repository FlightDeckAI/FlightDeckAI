<p align="center">
  <img src="assets/f35-executive-banner.png" alt="Panoramic concept artwork: a graphite F-35 in an AI hangar with restrained cyan and green lighting." width="720" />
</p>

# Lloyd Clark, PhD

### Making AI operational in defense, aviation, and industry.

I lead [Federal.AI](https://federal.ai/?utm_source=github&utm_medium=profile&utm_campaign=founder), building AI systems around consequential decisions, reliable data, and human control.

**Founder & CEO, Federal.AI · 20+ years in software and AI/ML · CISSP / ISSEP · Commercial pilot & CFI**

**[Experiments](https://github.com/FlightDeckAI/applied-ai-flight-tests)** · **[Field notes](notes/README.md)** · **[Discuss a strategic engagement ↗](mailto:lc@federal.ai?subject=Federal.AI%20%E2%80%94%20strategic%20engagement&body=Organization%20and%20role%3A%20%0AProblem%20/%20desired%20outcome%3A%20%0ACurrent%20systems%20and%20deployment%20environment%3A%20%0ATimeline%3A%20%0ABudget%20range%20%28if%20established%29%3A%20%0A)**

My perspective combines AI engineering, commercial aviation, and ownership of [Blue Ridge Electric Service](https://blueridge.ai/). Local models, agents, data infrastructure, and simulation are the tools; better operational decisions are the objective.

**In the press:** [AOPA covered No Brashers, the pilot tool my daughter Lilli and I built →](https://www.aopa.org/news-and-media/all-news/2026/january/28/flight-lessons-inspire-a-new-pilot-tool)

## Applied AI Flight Tests

**Original, reproducible experiments in model behavior, operational evidence, and data economics.**

I publish the inputs, methods, raw outputs, and failure cases so another engineer can challenge the result.

| Experiment | What it tests | Evidence |
| --- | --- | --- |
| **NiFi diagnosis for GoldenAye** | Can a local model distinguish a configuration concern from an unsupported claim about runtime behavior? | Public synthetic cases, a deterministic baseline, strict output grading, and recorded model outputs |
| **Ingest economics** | At the same byte budget, which sampling policy preserves useful diagnostic context? | 20 seeded trials, equal-volume comparisons, explicit cost assumptions, and reproducible charts |

**[Explore the experiments →](https://github.com/FlightDeckAI/applied-ai-flight-tests)** · [Methods and limitations](https://github.com/FlightDeckAI/applied-ai-flight-tests/blob/main/METHODS.md)

These are development experiments with synthetic data. The reports separate software checks, model performance, and business assumptions.

## Ideas I am testing

**Measure accepted outcomes.** Include review, rework, rejected attempts, and operating cost when comparing AI workflows.

**Make authority explicit.** Bind human approval to the exact proposed action and expected state; test retries, expiry, and conflicting updates.

**Evaluate the whole system.** A local model is one component. Data quality, dependencies, evidence retrieval, and recovery determine whether it can do useful work.

| Latest field note | Practical question |
| --- | --- |
| [Measure AI cost per useful outcome](notes/06-cost-per-useful-outcome.md) | When does reviewer effort erase the apparent savings? |
| [Human approval is an architecture boundary](notes/07-approval-as-architecture.md) | How do we ensure the reviewed action is the one that executes? |
| [Evaluate the whole disconnected AI system](notes/08-disconnected-ai-evaluation.md) | What evidence supports a claim that a workflow can operate offline? |
| [Where AI creates operational value](notes/05-ai-value-and-human-control.md) | Which decisions should we improve, and where should authority stop? |

[All eight engineering field notes →](notes/README.md) · [Speaking topics and bio →](speaking/README.md)

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

Find it useful? [Leave us an honest star rating on Splunkbase](https://splunkbase.splunk.com/app/9608).

### Open aviation resources

[Aviator Prompts: 38 prompts](https://github.com/FlightDeckAI/aviator-prompts) · [Squadron Prompts](https://github.com/FlightDeckAI/squadron-prompts) · [Nintendo DS training prototype](https://github.com/FlightDeckAI/aviator-prompts/blob/main/docs/nintendo-ds-tracker.md)

**Tools I work with:** Python · Apache NiFi · Splunk · SQL · local LLMs · RAG · Monte Carlo simulation · computer vision

## Strategic engagements

I work with enterprise leaders, program owners, and prime partners on AI deployment, data infrastructure, and operational assurance.

**Start with a short brief:** your organization and role, the problem and desired outcome, the deployment environment, and your timeline. Include a budget range if established. We assess fit before scheduling a discussion.

**[Submit an engagement inquiry](mailto:lc@federal.ai?subject=Federal.AI%20%E2%80%94%20strategic%20engagement&body=Organization%20and%20role%3A%20%0AProblem%20/%20desired%20outcome%3A%20%0ACurrent%20systems%20and%20deployment%20environment%3A%20%0ATimeline%3A%20%0ABudget%20range%20%28if%20established%29%3A%20%0A)** · **[Federal.AI](https://federal.ai/?utm_source=github&utm_medium=profile&utm_campaign=engagement)** · [Speaking and technical briefings](speaking/README.md)

<sub>Hero: AI-generated concept artwork. Product screenshots and synthetic demonstrations are identified separately. GoldenAye Flow Lab by Federal.ai is an independent project and is not affiliated with or endorsed by the Apache Software Foundation. Aviation resources are educational; verify outputs against current authoritative references.</sub>
