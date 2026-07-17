# Design Principles

Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults.

## Frontend Design

Approach this as the design lead at a small studio known for giving every client a visual identity that could not be mistaken for anyone else's. This client has already rejected proposals that felt templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take one real aesthetic risk you can justify.

### Ground it in the subject

If the brief does not pin down what the product or subject is, pin it yourself before designing: name one concrete subject, its audience, and the page's single job, and state your choice. The subject's own world, its materials, instruments, artifacts, and vernacular, is where distinctive choices come from. Build with the brief's real content and subject matter throughout.

### Design principles

For web designs, the hero is a thesis. Open with the most characteristic thing in the subject's world, in whatever form makes sense for it: a headline, an image, an animation, a live demo, an interactive moment. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the template answer — only use if that's truly the best option.

Typography carries the personality of the page. Pair the display and body faces deliberately, not the same families you would reach for on any other project, and set a clear type scale with intentional weights, widths, and spacing. Make the type treatment itself a memorable part of the design, not a neutral delivery vehicle for the content.

Structure is information. Structural devices — numbering, eyebrows, dividers, labels — should encode something true about the content, not decorate it. Numbered markers (01 / 02 / 03) are only appropriate if the content actually is a sequence — like a real process or timeline where order carries information the reader needs.

Leverage motion deliberately. Think about where and if animation can serve the subject: a page-load sequence, a scroll-triggered reveal, hover micro-interactions, ambient atmosphere. An orchestrated moment usually lands harder than scattered effects. Sometimes less is more.

Match complexity to the vision. Maximalist directions need elaborate execution; minimal directions need precision in spacing, type, and detail. Elegance is executing the chosen vision well.

Consider written content carefully. Copy can make a design feel as templated as the design itself.

### Process

Brainstorm, explore, plan, critique, build, critique again.

For calibration: AI-generated design right now clusters around three looks:

1. A warm cream background (near `#F4F1EA`) with a high-contrast serif display and a terracotta or warm-clay accent (often near `#D97757`)
2. A near-black background with a single bright acid-green or vermilion accent
3. A broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns

All three are legitimate for some briefs, but they are defaults rather than choices. Where the brief pins down a visual direction, follow it exactly — the brief's own words always win. Where it leaves an axis free, don't spend that freedom on one of these defaults.

Work in two passes. First, brainstorm a short design plan: create a compact token system with color, type, layout, and signature. Then review that plan against the brief before building. Only after confirming relative uniqueness should you write the code, deriving every color and type decision from the plan.

### Restraint and self-critique

Spend your boldness in one place. Let the signature element be the one memorable thing, keep everything around it quiet and disciplined, and cut any decoration that does not serve the brief. Build to a quality floor without announcing it: responsive down to mobile, visible keyboard focus, reduced motion respected. Before shipping, remove one accessory.

### More on writing in design

Words appear in a design for one reason: to make it easier to understand, and therefore easier to use. They are design material, not decoration.

- Write from the end user's side of the screen.
- Use active voice as default. A control should say exactly what happens when it's used.
- Treat failure and emptiness as moments for direction, not mood.
- Keep the register conversational and tuned: plain verbs, sentence case, no filler.
- Let each element do exactly one job.

## Alchemist Ways — locked choices (client satisfaction pass)

- **Subject thesis:** Inner alchemy — trigger → doorway → creative agency
- **Page job:** Trust + waitlist signup
- **Signature:** Circular journey ring (alchemical diagram) with subtle ambient motion
- **Palette:** Paper white base; gold for structure; ember for primary waitlist CTA only
- **Type:** Fraunces (display) + Sora (body)
