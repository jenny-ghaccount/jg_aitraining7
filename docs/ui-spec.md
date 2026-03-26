# UI Specification

## Purpose
This document turns the design brief into a build-ready description of the MVP interface.

## Overall Screen Concept
The website should feel like a comic-style recycling mini-game set in a soft, green Earth-inspired world.

The screen should read in this order:
- Title and status at the top.
- Floating waste items in the main play area.
- Recycling bins anchored at the bottom.
- Short feedback overlays appearing above the playfield when needed.

## Main Screen Layout

### Top HUD
The top of the screen should include:
- Game title.
- Current score.
- Numeric countdown timer.
- Horizontal time bar that visibly shrinks as time runs down.

### Playfield
The center of the screen should be the active game area.

It should include:
- A soft comic-style environmental background.
- Floating or drifting waste items.
- Enough open space for dragging items clearly.
- Optional subtle decorative elements such as clouds, leaves, or a simplified Earth motif.

### Bin Row
The bottom of the screen should contain four large bins:
- General waste
- Paper
- Plastic
- Organic waste

Each bin should have:
- A strong color identity.
- A text label.
- A simple icon.
- A hover or active state while an item is dragged over it.

## Background Direction
The background should feel eco-friendly and soft, not realistic.

Recommended elements:
- A pale sky gradient.
- Rounded green hills or abstract green shapes.
- A subtle Earth or globe motif.
- Soft comic-style shading.

The background should support the game, not compete with it.

## Waste Item Appearance
Each waste item should be easy to identify in less than a second.

Recommended art rules:
- Bold outline.
- Soft comic colors.
- Slight shadow or sticker-like separation from the background.
- Large enough to drag comfortably.
- Distinct silhouette per item category.

## Score and Timer Behavior
The score should be highly visible because it is the main reward loop.

Recommended behavior:
- Score increases with a quick pop or bounce on correct answers.
- Timer bar gradually decreases over 60 seconds.
- Numeric timer updates every second.
- When little time remains, the timer area can shift to a warmer warning color.

## Feedback States

### Correct Drop
On a correct drop:
- The item disappears into the bin.
- The score increases by 1.
- A small positive visual reaction appears.
- The teaching message appears only the first time that item is correctly sorted during that run.

### Wrong Drop
On a wrong drop:
- The screen flashes red briefly.
- A sad smiley appears.
- Optional short text: "That was wrong".
- Score resets to 0 immediately.
- The game continues without a long pause.

### End of Round
When the 60 seconds finish:
- Waste spawning stops.
- The final score is shown.
- A simple replay button appears.
- The tone should stay playful, not formal.

## Instruction Strategy
The game should need very little explanation.

Recommended start-state instruction:
- A short line near the center or top such as: "Drag each item into the right bin before time runs out."

This prompt should fade after the round begins.

## Responsive Scope
The MVP is desktop-first.

This means:
- Large playfield width.
- Comfortable mouse drag targets.
- Bin spacing optimized for desktop.

Mobile behavior can be handled later and should not drive the first layout.

## MVP Asset Priorities
If time is limited, prioritize these visuals first:
1. Four distinct bins.
2. Eight to twelve most common waste item illustrations.
3. HUD with score and timer bar.
4. Red failure flash and sad smiley.
5. Soft Earth-inspired background.

## Implementation Notes
- Use a single-screen layout with no page navigation for the MVP.
- Keep the visual hierarchy clear: HUD first, playfield second, bins third.
- Avoid cluttering the playfield with too many decorative objects.
- Keep feedback animations quick so the round stays fast.
