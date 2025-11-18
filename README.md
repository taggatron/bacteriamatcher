# Bacteria Shape Match

Fast-paced educational web game to learn and reinforce bacterial morphological classifications.

## Features

- Multiple shapes: Cocci, Bacilli, Spirilla, Vibrio, Spirochetes, Filamentous, Diplococci.
- Dynamic difficulty: More choices + shorter time each level.
- Streak multiplier: Consecutive correct answers boost points and can award bonus lives.
- Responsive & Mobile-first: Works on touch devices and desktops.
- Accessible: Keyboard navigation, ARIA live regions, dialogs, focus handling.
- Shape info: Tap/click the displayed shape for quick educational notes.

### Species Example Challenge (Multiple Choice)

After correctly identifying a shape for the first time, a secondary panel appears presenting four species/genus options. One belongs to the just-identified morphology. Selecting the correct example awards a bonus (+150). A wrong selection costs a life and resets your streak. Each morphology triggers this species round only once per game.

## Play Instructions

1. Press "Start Game".
2. Match the displayed SVG shape to the correct morphological name.
3. Answer before the timer bar empties.
4. Build streaks for multipliers; every 5 streak adds a life (up to 5).
5. Game ends when lives reach zero.
6. When the species example panel appears, choose the species/genus that matches the morphology.

## Tech Stack

- Vanilla HTML, CSS (responsive layout + animations), JavaScript (ES6 module pattern).
- No build tooling required.

## Running Locally

Simply open `index.html` in a browser:

```bash
open index.html
```

Or serve with a lightweight HTTP server (avoids any dialog polyfill quirks):

```bash
python3 -m http.server 8080
# Then visit http://localhost:8080
```

## Accessibility Notes

- Choices are buttons with keyboard arrow navigation.
- Focus states are visible; feedback uses `aria-live`.
- Dialogs close on backdrop click or `Escape`.
- Species challenge panel focuses the first option and announces feedback.

## Customization

- Add shapes in `script.js` by extending the `shapes` array (key, label, info, svg).
- Adjust scoring / timer logic by modifying `computeTimerForLevel` and scoring formula inside `handleChoice`.
- Extend the species example dataset in `script.js` (`speciesExamples` object).

## License

Educational use only. No clinical decision support. 2025.
