# What aviation checklists teach us about AI deployment

**Lloyd Clark · Engineering field notes · September 2026**

A checklist is useful when it makes required verification clear at the moment it matters. The same question appears in an AI workflow: what must be established before the next action is allowed?

No Brashers grew from listening to pilot and tower feedback and building something small enough to use. [AOPA covered the father-daughter project](https://www.aopa.org/news-and-media/all-news/2026/january/28/flight-lessons-inspire-a-new-pilot-tool). One design detail on the current site makes the principle tangible: opening a reference does not automatically check the item.

Seeing evidence is not the same as verifying it. Generating a proposal is not approving it. Clicking a link should not quietly count as an operational decision.

For a proposed AI-driven work-order update, I would show:

- **The change:** a readable before-and-after comparison.
- **The evidence:** source records the proposal depends on.
- **The uncertainty:** missing or contradictory inputs.
- **The action boundary:** exactly what approval permits for this proposal.
- **The outcome:** whether the external system accepted the change.

Keep review specific. Broad approval at the start of a conversation should not become permission for every later mutation. A materially changed proposal should return to the relevant review boundary.

Test interruption. What appears after a browser closes during submission? Can the system distinguish a draft from a completed external action? Is retry safe, or could it create a duplicate? These are product-design questions, not merely error messages.

The analogy is a design aid. It does not make a tool aviation-certified or establish a safety outcome. The useful transfer is disciplined verification: clear prerequisites, deliberate action, and an observable result.

**Apply it:** choose one consequential button in your product and write down what the user needs to know immediately before pressing it, plus the evidence needed afterward.

[No Brashers](https://nobrashers.com/) · [Back to the profile](../README.md)
