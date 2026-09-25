# Evaluate the whole disconnected AI system

**Lloyd Clark, PhD · Engineering field notes · September 2026**

A model loading from a local directory establishes one fact: those weights were available. It does not establish that the application can install, authenticate, retrieve evidence, serve users, and recover without an external connection. My evaluation unit is the complete workflow in its intended environment.

Start with a versioned evaluation bundle. Include model weights, tokenizer and chat template, configuration, retrieval corpus and index, prompts, test cases, scoring rubric, dependency packages, and an artifact manifest. Record immutable revisions and file hashes, together with the source and applicable license. Hashes detect changed bytes; a trusted acquisition and verification process establishes which bytes belong in the bundle.

Also record the runtime, operating system, accelerator, driver, quantization, context limit, decoding settings, and random seeds. These details can affect both quality and latency. A model name is too coarse to identify the system being compared.

Run two separate evaluations. First ask whether the workflow performs useful work. Use a fixed set of representative cases with expected evidence and acceptance criteria. Include missing references, conflicting records, malformed input, long documents, and questions the local corpus cannot answer. Score unsupported claims, citation correctness, appropriate abstention, and reviewer effort. Measure latency and memory on the actual hardware, including cold starts and realistic concurrency.

Then ask whether the workflow is operationally disconnected. Install into a clean environment using only the declared bundle. Deny outbound network traffic with an independent operating-system or network control. Observe attempted DNS and network connections while exercising startup, inference, retrieval, authentication, logging, restart, and error recovery. Record the boundary of observation and retain the evidence. Success with an already populated developer cache is a different test.

For Hugging Face components, [the Hub documentation](https://huggingface.co/docs/huggingface_hub/package_reference/environment_variables) describes `HF_HUB_OFFLINE=1`, while [Transformers documentation](https://huggingface.co/docs/transformers/installation#offline-mode) documents `local_files_only=True`. These settings help control those components. They do not prove that every library, telemetry exporter, update check, or application integration stays local. The independent network restriction is what makes an unexpected dependency fail visibly.

Try deliberately removing one required artifact. The expected result is a clear missing-dependency error, with no silent cloud fallback. Try a corrupted artifact, stale reference snapshot, full disk, and interrupted restart. Record the observed recovery path. A useful disconnected system needs operators who can recognize failure and restore a known configuration.

Reproducibility needs a precise promise. [PyTorch's reproducibility guidance](https://docs.pytorch.org/docs/stable/notes/randomness.html) cautions that identical results are not guaranteed across releases and platforms, even with identical seeds. I would retain raw outputs and distinguish exact replay on a pinned stack from comparable task performance across stacks. For stochastic generation, report repeated runs and variability instead of selecting the best response.

An evaluation report should identify the bundle, hardware, cases, thresholds, raw results, network controls, observed connection attempts, and unresolved limitations. Promote an update only after the same evaluation, and rehearse restoring the previous bundle. The evidence supports the workflows and conditions actually exercised; it does not certify every possible path through the application.

[Back to the profile](../README.md) · [Discuss a disconnected evaluation](mailto:lc@federal.ai?subject=Disconnected%20AI%20evaluation)
