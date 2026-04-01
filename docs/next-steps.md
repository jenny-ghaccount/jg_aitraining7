# Next Steps

## Current Status (as of April 2026)
All P0 tasks and most P1 tasks are complete. The game is fully playable with a working core loop, educational messages, styled bins, modern glassmorphic UI, and end-of-round summary. The design direction has been updated from comic-style to a modern space-navy glassmorphic aesthetic (Space Grotesk font, deep blue-teal palette).

## Remaining Work

### In Progress
- **T16** — Add interaction animations: hover and drag transforms are done; wrong-drop flash is done. Missing: a short correct-drop visual animation (e.g. item pop or glow before removal).
- **T17** — Add start instruction prompt: a hint text shows when no items are on screen at round start, but it does not animate/fade out on its own timer yet.

### Not Started
- **T19 (P1)** — QA pass against MVP rules. Verify all behavior matches the project brief and content spec. Recommended before any demo.
- **T20 (P2)** — Optional sound effects toggle (deferred post-MVP).
- **T21 (P2)** — Reduced-motion toggle placeholder (deferred post-MVP).

## Recommended Next Actions
1. Complete T16 — add a brief correct-drop animation (quick scale-and-fade on the waste item).
2. Complete T17 — add a timed fade-out to the start instruction so it disappears automatically after ~2 seconds.
3. Run T19 QA pass — play at least 3 full rounds and verify every rule from the project brief holds.
4. Demo the build. Decide whether T20/T21 are needed before release.

## Completed Decisions (for reference)
- Stack: React + Vite, single-screen static frontend.
- 4 bins: general waste, paper, plastic, organic waste.
- 60-second round with continuous timer (does not pause on wrong drop).
- Wrong drop: red flash, sad smiley, score reset to 0.
- Educational messages on first-correct-sort only, per round.
- 32-item pool (8 per bin), 12 common items at 2× spawn weight.
- Bin labels: English-only.
- Desktop-first layout.
