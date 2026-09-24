<img src="assets/f35-tactical-ai.png" alt="Concept artwork: an F-35 in a tactical AI hangar with secure compute racks and cyan-green data networks." width="100%" />

# Lloyd Clark, PhD

### Making AI operational in defense, aviation, and industry.

I lead Federal.AI, turning complex operational problems into deployable AI capabilities for defense, aviation, and industry.

**Founder & CEO, Federal.AI · 20+ years in software and AI/ML · CISSP / ISSEP · Commercial pilot & CFI**

**[See the work ↓](#selected-work)** · **[Discuss a strategic engagement ↗](mailto:lc@federal.ai?subject=Federal.AI%20%E2%80%94%20strategic%20engagement&body=Organization%20and%20role%3A%20%0AProblem%20/%20desired%20outcome%3A%20%0ACurrent%20systems%20and%20deployment%20environment%3A%20%0ATimeline%3A%20%0ABudget%20range%20%28if%20established%29%3A%20%0A)**

My work spans local models, data pipelines, simulation, and the controls that make an AI workflow usable inside an operating environment. I lead [Federal.AI](https://federal.ai/?utm_source=github&utm_medium=profile&utm_campaign=founder), and I own Blue Ridge Electric, where industrial problems keep the engineering grounded.

**In the press:** [AOPA covered No Brashers, the pilot tool my daughter Lilli and I built →](https://www.aopa.org/news-and-media/all-news/2026/january/28/flight-lessons-inspire-a-new-pilot-tool)

## Selected work

### 01 / Federal.AI Mission Cockpit

**The problem:** operational decisions depend on evidence scattered across maintenance, scheduling, and supply systems.

**The demonstration:** a public aircraft-readiness scenario that brings the evidence, a proposed decision, and human approval into one interface. **Synthetic data.**

<a href="https://federal.ai/cockpit?utm_source=github&utm_medium=profile&utm_campaign=mission_cockpit"><img src="https://federal.ai/assets/cockpit-hero.jpg" alt="Real Federal.AI Mission Cockpit interface showing a synthetic aircraft-readiness scenario and approval queue." width="100%" /></a>

[Explore the demo](https://federal.ai/cockpit?utm_source=github&utm_medium=profile&utm_campaign=mission_cockpit) · [Read the engineering brief](case-studies/mission-cockpit.md)

### 02 / NiFi.ai Flow Validation

**The problem:** two pipelines can output the same number of records while losing, duplicating, or changing different events.

**The tool:** an offline Python comparator for CSV and JSON exports, with checks for record identity, content, schema, and arrival delay. Local HTML and JSON evidence reports. No model or cloud dependency.

**v0.1.0 · 16 automated tests · synthetic passing and failing examples included**

[Run the tool](tools/nifi-flow-validation/README.md) · [Read the experiment](case-studies/flow-validation.md) · [Discuss a flow integration](mailto:lc@federal.ai?subject=NiFi%20flow%20validation)

### 03 / No Brashers

**The problem:** a busy pilot needs clear references and room to think.

**The product:** a web workspace for checklist prompts, phrase references, and debrief notes, developed with my daughter Lilli. AOPA published our story in January 2026.

[Launch No Brashers](https://nobrashers.com/) · [Read the product brief](case-studies/no-brashers.md) · [Read the AOPA story](https://www.aopa.org/news-and-media/all-news/2026/january/28/flight-lessons-inspire-a-new-pilot-tool)

### Open-source build / NiFi Flow Checkride

An extension of [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything): agent-friendly inspection, heuristic risk checks, and configuration diffs for exported NiFi flows. **Offline prototype · 11 tests · upstream credited.**

[Run the extension](https://github.com/FlightDeckAI/CLI-Anything-NiFi/tree/main/nifi/agent-harness) · [See what changed](https://github.com/FlightDeckAI/CLI-Anything-NiFi/blob/main/nifi/UPSTREAM.md)

## Engineering field notes

My working perspective: **define the decision, make the evidence inspectable, and test what happens when the system is wrong.**

| Note | Practical takeaway |
| --- | --- |
| [How to know an AI agent is ready for production](notes/01-mission-checkride.md) | A seven-part acceptance worksheet with explicit failure conditions |
| [What changes when AI cannot reach the internet](notes/02-disconnected-ai.md) | Treat artifacts, dependencies, and updates as part of the product |
| [Before upgrading the model, test the data path](notes/03-data-before-models.md) | Run a reproducible comparison that catches failures counts miss |
| [What aviation checklists teach us about AI deployment](notes/04-checklists-and-ai.md) | Put the verification next to the consequential action |

## The wider workshop

| Project | Its place in the work |
| --- | --- |
| [**CyberPlane**](https://cyberplane.com/) | Aircraft maintenance records and evidence workflows. An aviation AI product in development. |
| [**LloydPilot.com**](https://lloydpilot.com/) | My aviation home: aircraft stories, interactive learning, and the curiosity behind the engineering. |
| **Blue Ridge Electric** | Industrial ownership and practical problems in equipment, service work, and operating costs. |
| [**SPLap · Splunk + F1**](https://splap.dev/) | A father-daughter Splunk app with Lilli: replay real Formula 1 telemetry and inspect the SPL behind each panel. |

### Open aviation resources

[Aviator Prompts: 38 prompts](https://github.com/FlightDeckAI/aviator-prompts) · [Squadron Prompts](https://github.com/FlightDeckAI/squadron-prompts) · [Nintendo DS training prototype](https://github.com/FlightDeckAI/aviator-prompts/blob/main/docs/nintendo-ds-tracker.md)

**Tools I work with:** Python · Apache NiFi · Splunk · SQL · local LLMs · RAG · Monte Carlo simulation · computer vision

## Strategic engagements

I work with enterprise leaders, program owners, and prime partners on AI deployment, data infrastructure, and operational assurance.

**Start with a short brief:** your organization and role, the problem and desired outcome, the deployment environment, and your timeline. Include a budget range if established. We assess fit before scheduling a discussion.

**[Submit an engagement inquiry](mailto:lc@federal.ai?subject=Federal.AI%20%E2%80%94%20strategic%20engagement&body=Organization%20and%20role%3A%20%0AProblem%20/%20desired%20outcome%3A%20%0ACurrent%20systems%20and%20deployment%20environment%3A%20%0ATimeline%3A%20%0ABudget%20range%20%28if%20established%29%3A%20%0A)** · **[Federal.AI](https://federal.ai/?utm_source=github&utm_medium=profile&utm_campaign=engagement)** · [Speaking and partnerships](mailto:lc@federal.ai?subject=Speaking%20or%20partnership%20inquiry)

<sub>Hero: AI-generated concept artwork. Product screenshots and synthetic demonstrations are identified separately. NiFi.ai is an independent project and is not affiliated with or endorsed by the Apache Software Foundation. Aviation resources are educational; verify outputs against current authoritative references.</sub>
