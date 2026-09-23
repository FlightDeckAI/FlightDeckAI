# What changes when AI cannot reach the internet

**Lloyd Clark · Engineering field notes · September 2026**

For a disconnected deployment, the unit of delivery is larger than the application. It includes the model, runtime, dependencies, configuration, reference material, and a way to update them while retaining the ability to reconstruct a result.

My starting point is a repeatable bundle with an explicit inventory. It should say what is inside, which versions were tested together, what hardware is assumed, which files may change, and how to identify an incomplete transfer.

| Dependency | Question for a disconnected deployment |
| --- | --- |
| Model download | Are weights, tokenizer, license terms, and configuration available? |
| Package installation | Is the tested dependency set available through the approved path? |
| External retrieval | Which local snapshot is authoritative, and how is freshness shown? |
| Cloud telemetry | What local logs are useful, and who may inspect them? |
| Authentication | What identity path exists when the external provider is unavailable? |
| Automatic updates | How is a bundle verified, evaluated, promoted, and rolled back? |

Rehearse installation on a machine with outbound access disabled. Record failed dependency lookups instead of allowing a successful connected installation to stand in for an offline test. Restart and rerun the representative workflow from a clean state.

The update process deserves its own experiment. Retain the old bundle, introduce a candidate, run fixed evaluation cases, and verify that rollback restores the previous behavior. A checksum can detect changed bytes; it does not by itself establish that an artifact is trusted or appropriate for the environment.

The interface should show meaningful facts: the active reference snapshot, an explicit unavailable state, and evidence behind an answer. An unavailable authoritative lookup should not quietly become model recollection.

Deployment engineering becomes part of the product. The useful outcome is a workflow someone can install, operate, inspect, and recover inside its actual constraints.

**Try a bounded experiment:** run the [offline comparator](../tools/nifi-flow-validation/README.md) on its synthetic files with networking disabled. It needs Python and the supplied files. This exercises the small tool's offline path, not a complete AI stack.

[Back to the profile](../README.md) · [Discuss a disconnected workflow](mailto:lc@federal.ai?subject=Disconnected%20AI%20workflow)
