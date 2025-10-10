# Repository Guidelines

## Project Structure & Module Organization
The app is a single-page experience rooted in `index.html`, which wires the interactive buttons, timers, and loading screen. Styling lives in `style.css`, with utility classes grouped near the top and animation-specific rules collected toward the end. Gameplay logic and timing live in `script.js`, where `GAME_CONFIG`, `GameState`, and `AnimationManager` centralize constants, state, and sequencing behaviour. Media resides under `assets/` (`audio/`, `btn/`, `loading/`, `result/`, `snakecircle/`, `timer/`); keep new artifacts sorted into these folders and prefer WebP for imagery.

## Build, Test, and Development Commands
- `python3 -m http.server 5500` — serve the project locally from the repo root; reload after asset changes.
- `npx serve .` — alternative static server that supports clean URLs; install `serve` globally if prompted.
- `open index.html` (macOS) or `start index.html` (Windows) — quick manual preview without a server; avoid cached assets by hard-refreshing.

## Coding Style & Naming Conventions
Use two-space indentation across HTML, CSS, and JS for consistency with existing files. Prefer `const` for immutable values and collect tunable numbers inside `GAME_CONFIG` to keep behaviour centralized. Keep function and class names descriptive (`playSequenceAnimation`, `resetGame`) and mirror existing camelCase patterns. Inline comments may be bilingual; when updating, preserve the current tone and add English context where it aids future contributors.

## Testing Guidelines
No automated suite exists yet; run a manual smoke test before every push: load the local server, cycle through each button, and confirm timers and result overlays reset correctly. Watch the console for uncaught promise rejections from animation flows. When adding features, supply at least a reproducible manual test script in your pull request, and consider introducing lightweight UI tests (e.g., Playwright) if the change is interaction-heavy.

## Commit & Pull Request Guidelines
Follow the repository’s history: concise, sentence-case, imperative messages (e.g., “Update binary assets …”). Group related changes per commit and avoid mixing asset refreshes with logic tweaks. Pull requests should include a brief summary, screenshots or recordings of key UI updates, manual test notes, and links to any tracked issues.

## Assets & Media Handling
Optimize new images to match existing resolutions and compression; keep audio in `assets/audio` and export to `.mp3`. When swapping media, retain filenames where possible so cache-busting is minimal; otherwise update the corresponding `GAME_CONFIG` paths and verify they load in the browser console.
