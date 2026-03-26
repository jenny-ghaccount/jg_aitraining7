# Open Questions

## Design
- Should sound effects be included?
- Should animation intensity be adjustable for accessibility?
- What should the red failure flash and sad smiley look like so the failure state feels playful instead of harsh?

## Technical
- Should the timer pause during failure feedback, or restart immediately?
- Should the website be a simple static frontend or use a framework such as React?

## Content
- Which waste examples should appear most often?
- Should bin labels be localized or English-only for the first version?

## Resolved Decisions
- The MVP uses four bins: general waste, paper, plastic, and organic waste.
- The MVP uses a 60-second round.
- Wrong drops flash the screen red, show a sad smiley, and reset the score to 0.
- The MVP does not reveal the correct bin after a wrong drop.
- Educational messages appear only the first time a specific item is correctly sorted during a run.
- The visual direction is comic-style with a soft green Earth-inspired background.
- The timer is shown both numerically and with a visible time bar.
