# MVP Task List

## Purpose
This checklist translates the approved MVP requirements into actionable build tasks for the Recycle Rush website.

## How To Use This File
- Mark each task status as `Not Started`, `In Progress`, `Blocked`, or `Done`.
- Assign an owner to every task.
- Do not start a lower-priority task if a dependency is still blocked.
- Keep MVP scope strict; defer extras to post-MVP.

## Priority Legend
- P0: Required for a playable MVP.
- P1: Strongly recommended for quality and clarity.
- P2: Nice-to-have polish if time allows.

## Task Board

| ID | Priority | Task | Owner | Status | Dependencies | Acceptance Criteria |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | P0 | Select frontend stack and scaffold project | Unassigned | Done | None | Project runs locally with a start script and basic folder structure. |
| T02 | P0 | Create base single-screen layout | Unassigned | Done | T01 | Screen includes top HUD, playfield area, and bottom bin row. |
| T03 | P0 | Implement 60-second game timer logic | Unassigned | Done | T01 | Timer starts at 60, counts down to 0, and ends the round reliably. |
| T04 | P0 | Build score state model | Unassigned | Done | T01 | Score starts at 0 each page load and updates correctly during play. |
| T05 | P0 | Implement drag-and-drop item interaction | Unassigned | Done | T02 | User can drag a waste item and drop it on a bin with clear drop detection. |
| T06 | P0 | Implement bin validation logic | Unassigned | Done | T05 | Correct bin match and wrong bin match are detected consistently. |
| T07 | P0 | Implement correct-drop behavior | Unassigned | Done | T04, T06 | Correct drop increments score by 1 and removes or resolves the item cleanly. |
| T08 | P0 | Implement wrong-drop behavior | Unassigned | Done | T04, T06 | Wrong drop triggers red flash, sad smiley, and immediate score reset to 0. |
| T09 | P0 | Add end-of-round state and replay flow | Unassigned | Done | T03, T04 | At 0 seconds the round ends, final score is shown, replay starts a new round. |
| T10 | P0 | Integrate curated 32-item MVP pool | Unassigned | Done | T05, T06 | Exactly 8 items per bin are available and mapped to the correct category. |
| T11 | P1 | Add spawn system with variety safeguards | Unassigned | Done | T10 | Items spawn in balanced category distribution without repetitive immediate duplicates. |
| T12 | P1 | Add first-time-only educational messages | Unassigned | Done | T07, T10 | Message appears only on first correct sort of each item per round. |
| T13 | P1 | Build modern HUD visuals and timer bar | Unassigned | Done | T02, T03, T04 | HUD shows title, score, numeric timer, and visible countdown bar. |
| T14 | P1 | Style four bins with strong visual identity | Unassigned | Done | T02 | Bins are clearly distinguishable by color, icon, and label. |
| T15 | P1 | Implement modern space-navy glassmorphic background | Unassigned | Done | T02 | Background is deep navy-teal with atmospheric orbs and does not reduce gameplay readability. |
| T16 | P1 | Add interaction animations | Unassigned | Done | T05, T07, T08 | Hover, drag, correct-drop, and wrong-drop animations are short and readable. |
| T17 | P1 | Add start instruction prompt | Unassigned | Done | T02 | Brief instruction appears at round start and fades out quickly. |
| T18 | P1 | Validate desktop-first usability | Unassigned | Done | T02, T05, T14 | Drag targets, spacing, and UI remain comfortable on desktop resolutions. |
| T19 | P1 | QA pass against MVP rules | Unassigned | Done | T01-T18 | Behavior matches project brief and content spec with no critical rule mismatch. |
| T20 | P2 | Add optional sound effects toggle | Unassigned | Not Started | T08, T16 | Sound can be enabled or disabled and does not block gameplay when off. |
| T21 | P2 | Add reduced-motion toggle placeholder | Unassigned | Not Started | T16 | Major animation intensity can be reduced for accessibility testing. |
| T22 | P2 | Add lightweight round summary panel | Unassigned | Done | T09 | End-of-round panel shows score and quick restart without clutter. |
| T23 | P1 | Add start button and pre-round countdown | Unassigned | Not Started | T02, T03 | After page load a start screen is shown with a prominent Start button. On click, a full-screen or overlay countdown animates 3 → 2 → 1 with clear visuals before the round timer begins. Items do not spawn and the timer does not run until the countdown completes. |

## Suggested Build Phases

### Phase 1: Core Playable Loop
Tasks:
- T01 to T10

Goal:
- A complete playable MVP loop exists with sorting, timer, score, and fail behavior.

### Phase 2: Learning and Visual Direction
Tasks:
- T11 to T18

Goal:
- The game feels educational, readable, and aligned with the approved modern glassmorphic direction.

### Phase 3: Stabilization and Optional Polish
Tasks:
- T19 to T22

Goal:
- MVP is tested and presentable, with optional enhancements if schedule allows.

## Definition Of MVP Done
The MVP is complete when all P0 tasks are done and no P0 regressions remain.

Recommended quality bar before demo:
- All P0 tasks complete.
- At least 5 of the P1 tasks complete, including T12, T13, and T14.
- Team can run the project locally and play at least 3 full rounds without blocking bugs.

## Risks To Watch Early
- Drag-and-drop edge cases causing missed drops.
- Item spawn logic becoming repetitive or unfair.
- Visual effects reducing clarity during active play.
- Scope creep from polish tasks before core loop stability.

## Daily Standup Template
- Yesterday: what moved to Done.
- Today: current task IDs and expected outcome.
- Blockers: dependency, bug, or decision needed.
