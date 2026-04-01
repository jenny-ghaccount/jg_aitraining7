# Open Questions

## Security Rules (non-negotiable)
- **Never commit API keys, tokens, passwords, or secrets to GitHub.** Use `.env` files for any future credentials and ensure they are listed in `.gitignore`. Only a `.env.example` (with placeholder values) may be committed.

## Design
- Should sound effects be included?
- Should animation intensity be adjustable for accessibility?

## Technical
_(No open technical questions remaining.)_

## Content
_(No open content questions remaining.)_

## Resolved Decisions
- The MVP uses four bins: general waste, paper, plastic, and organic waste.
- The MVP uses a 60-second round.
- Wrong drops flash the screen red, show a sad smiley emoji, and reset the score to 0.
- The MVP does not reveal the correct bin after a wrong drop.
- Educational messages appear only the first time a specific item is correctly sorted during a run.
- The visual direction is **modern glassmorphic space-navy** (Space Grotesk font, deep blue-teal palette). Moved away from comic-style.
- The timer is shown both numerically and with a visible countdown bar in the HUD.
- The timer continues running uninterrupted during failure feedback — it does not pause.
- The stack is React (Vite) with a single-screen static frontend.
- 12 recognisable household items have 2× spawn weight to keep play intuitive; all others spawn at 1×.
- Bin labels are English-only for the first version.
- Sound effects and reduced-motion toggle are deferred to post-MVP (T20, T21).
