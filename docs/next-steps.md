# Next Steps

## Recommended Order
1. Decide the technical stack for the website.
2. Scaffold the frontend project.
3. Build the core game screen layout and state model.
4. Implement drag-and-drop, timer, score, and failure feedback.
5. Add the selected waste items and first-time teaching messages.
6. Test with teammates and refine difficulty, spawn balance, and feedback timing.

## Recommended MVP Decisions
- Use 4 bins: general waste, paper, plastic, and organic waste.
- Use a 60-second round structure.
- On wrong answers, flash the screen red, show a sad smiley, and reset the score to 0.
- Do not reveal the correct bin after a wrong drop in the MVP.
- Reset score on refresh by keeping score only in app state.
- Show educational feedback only the first time a specific item is correctly sorted during a run.
- Build desktop-first for the MVP.
- Build a browser-based prototype that can be shared easily.
