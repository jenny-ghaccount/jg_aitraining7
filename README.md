# Recycle Rush

Recycle Rush is a browser-based capstone project focused on recycling awareness through a playful drag-and-drop sorting game.

## Project Summary
The player sorts flying waste items into the correct bin before time runs out. Correct answers increase the score. Wrong answers trigger a red warning flash, show a sad smiley, and reset the score to 0.

The MVP is designed to be:
- Public and easy to share
- Fun and visually engaging
- Educational without requiring a login or backend account system
- Desktop-first for the first release

## MVP Features
- Single-screen game experience
- Four bins: general waste, paper, plastic, and organic waste
- 60-second game round
- Drag-and-drop waste sorting
- Score tracking for the current session only
- Wrong-drop failure feedback with score reset
- Short teaching messages shown the first time an item is sorted correctly

## Product Rules
- No login is required.
- Anyone with the link can play.
- Refreshing or reopening the site resets the score.
- Wrong answers do not reveal the correct bin in the MVP.

## Design Direction
The site uses a comic-style visual direction with:
- Soft green Earth-inspired backgrounds
- Clear, colorful recycling bins
- Playful motion and feedback
- A numeric timer plus a visible countdown bar

## Documentation
Project planning documents live in the [docs](./docs) folder.

Key files:
- [docs/project-brief.md](./docs/project-brief.md)
- [docs/gameplay-content-spec.md](./docs/gameplay-content-spec.md)
- [docs/design-brief.md](./docs/design-brief.md)
- [docs/ui-spec.md](./docs/ui-spec.md)
- [docs/next-steps.md](./docs/next-steps.md)
- [docs/open-questions.md](./docs/open-questions.md)

## Current Status
Planning and design definition are complete enough to begin implementation.

The next recommended step is to choose the frontend stack and scaffold the first playable prototype.