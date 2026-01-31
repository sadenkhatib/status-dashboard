# Copilot Instructions for status-dashboard

## Project Overview
- **Purpose:** A live-updating status dashboard built with vanilla JavaScript, HTML, and CSS.
- **Structure:**
  - `index.html`: Main HTML entry point, defines UI structure and loads scripts/styles.
  - `script.js`: (Currently empty) Intended for all dashboard logic, event handling, and dynamic updates.
  - `styles.css`: (Currently empty) Intended for all custom styles.

## Key Patterns & Conventions
- **No frameworks:** All logic and UI updates should use plain JavaScript and DOM APIs.
- **UI Elements:**
  - Main controls: Pause/Resume buttons, event filter dropdown.
  - Event list: `<ul id="eventList">` is the target for dynamic event rendering.
- **Extendability:** Add new event types or controls by updating both the HTML and corresponding JS logic.
- **File organization:** Keep all logic in `script.js` and all styles in `styles.css` unless project grows.

## Developer Workflows
- **No build step:** Open `index.html` directly in a browser to run the dashboard.
- **No tests or external dependencies** are present or required at this stage.
- **Debugging:** Use browser DevTools for JS/CSS debugging.

## Integration & Data Flow
- **Dynamic updates:** All event rendering and UI updates should be handled via JS manipulating the DOM.
- **No backend or API integration** is present; if needed, add fetch logic in `script.js`.

## Examples
- To render a new event, append a new `<li>` to `#eventList` in JS.
- To filter events, use the value of `#filterSelect` and update the list accordingly.

## Recommendations for AI Agents
- Follow the minimal, single-file-per-concern structure.
- Avoid introducing frameworks or build tools unless explicitly requested.
- Document any new conventions or patterns in this file if the project grows.
