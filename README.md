# Status Dashboard

A live-updating status dashboard built with vanilla JavaScript, HTML, and CSS.  
The dashboard simulates incoming system events, updates automatically in real time, and provides basic controls for filtering and pausing updates.

## Features
- Live event updates using interval-based polling
- Pause and resume controls
- Client-side filtering by event type (Info, Warning, Error)
- Visual status indicators with color-coded alerts
- Responsive, modern UI with smooth animations

## Tech Stack
- JavaScript (vanilla)
- HTML5
- CSS3

## How It Works
- Events are generated periodically using a mock data generator
- Application state is stored in memory
- UI is re-rendered whenever data or filters change
- Styling emphasizes readability and quick visual scanning

## Running Locally
1. Clone the repository
2. Open `index.html` in a browser  
   (or use VS Code Live Server for auto-refresh)

No build tools or frameworks required.

## Why This Project
This project focuses on core front-end fundamentals:
- DOM manipulation
- State-driven rendering
- Asynchronous behavior
- UX-oriented visual design

It was built without frameworks to emphasize understanding of the underlying mechanics.
