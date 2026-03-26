# Design Brief

## Purpose
This document defines the visual and interaction direction for the MVP before implementation begins.

## Experience Goal
The website should feel playful, energetic, and easy to understand within a few seconds. It should encourage quick action while making recycling feel approachable rather than instructional or dry.

## Design Principles
- Make the game readable at a glance.
- Use a fun visual style without looking childish.
- Keep motion lively but controlled so the screen does not become chaotic.
- Make bins visually distinct from each other.
- Make wrong answers feel noticeable, but still playful.
- Prioritize desktop usability for the MVP.

## Recommended Visual Direction
The strongest direction for this project is a bright eco-arcade style.

This means:
- Clean, bold shapes.
- Saturated but natural color choices.
- Friendly illustrated waste items.
- Slightly exaggerated motion.
- Large, readable labels and counters.
- A playful game-like atmosphere instead of a corporate sustainability look.

## Mood Keywords
- Playful
- Fresh
- Quick
- Tactile
- Friendly
- Competitive
- Eco-aware

## Suggested Color Strategy
Use one strong color family per bin so sorting feels intuitive.

Recommended base mapping:
- General waste: charcoal or deep gray
- Paper: warm blue
- Plastic: bright amber or orange
- Organic waste: fresh green

Recommended supporting colors:
- Background sky: pale cyan to soft cream gradient
- Accent color for score and timer: vivid teal or golden yellow
- Failure flash: warm red, not dark crimson

## Typography Direction
Use a display font with personality for headings and score elements, paired with a clean sans-serif for labels and instructions.

Design goal:
- Headings should feel game-like and memorable.
- Bin labels and messages should stay highly readable.

## Layout Direction
The MVP should use a single-screen game layout.

Recommended structure:
- Top bar for title, score, and 60-second timer.
- Main playfield in the center with animated floating waste items.
- Bin row anchored near the bottom of the screen.
- Brief instruction prompt near the top or center when the round starts.
- Lightweight result state when time ends.

## Motion Direction
Motion should support attention, not distract from gameplay.

Recommended behaviors:
- Waste items drift or float across the playfield.
- Hovered or grabbed items scale up slightly.
- Correct drops trigger a small positive burst or bounce.
- Wrong drops trigger a quick red full-screen flash and sad smiley overlay.
- UI counters should animate lightly when the score changes.

## Item Visual Style
For the MVP, the waste items should use a comic-style illustrated look with simple shapes and expressive outlines rather than realistic images.

Why this works:
- Faster to recognize.
- Easier to render consistently.
- Better fit for an arcade-like game.
- Lower asset complexity for the first version.
- Comic-style visuals support a fun team-friendly presentation.

## Bin Design Direction
Each bin should:
- Have a strong color identity.
- Use both icon and text label.
- Be large enough to support drag-and-drop comfortably.
- Include a visible hover or active state when an item is dragged over it.

## Failure State Direction
The failure state should be clear and immediate, but not mean-spirited.

Recommended behavior:
- Quick red overlay flash across the full screen.
- Large sad smiley appears briefly.
- Optional short text such as "That was wrong".
- Score resets to 0 immediately.
- The round continues without a long interruption.

## Educational Message Direction
Educational feedback should appear only the first time a specific item is correctly sorted during a run.

Recommended style:
- Short floating tooltip or caption near the top-center.
- One sentence only.
- Fade out quickly.
- Positive tone, not lecture-like.

## Accessibility Notes
- Do not rely on color alone to distinguish bins.
- Keep label text large and clear.
- Ensure sufficient contrast for timer, score, and overlays.
- Keep animation duration short and avoid constant aggressive flashing.
- Consider a reduced-motion option later, even if not in the MVP.

## MVP Design Priorities
1. Clear bin differentiation.
2. Readable playfield.
3. Satisfying drag-and-drop behavior.
4. Strong score and timer visibility.
5. Playful but non-frustrating failure feedback.

## Open Design Decisions
- Should the site include sound effects in the MVP?

## Final Design Decisions
- Illustration style: comic-style objects with soft shapes and clean outlines.
- Background world: an Earth-inspired green environment with soft comic-style coloring.
- Timer display: both a numeric countdown and a visible time bar.
