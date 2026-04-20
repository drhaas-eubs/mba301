# MBA301 — Entrepreneurial & Design Thinking

Interactive Framework Galleries & Course Materials for **MBA301 — Entrepreneurial & Design Thinking** (FHEQ Level 7, Term III, AY 2025/2026), EU Business School. Taught by Dr. H. Haas.

The site applies two complementary intellectual frameworks across nine units:

- **Thumbnail Thinking** (JD Meier, 2025) — the practice of curating a mental catalogue of well-designed visual frameworks (*Slibraries*) so patterns surface fast under pressure.
- **Clarify Your Core Message** (Kurt Bostelaar / Leverlo) — the Distill · Decompose · Prioritise protocol for reducing any idea to a single, speakable sentence.

## What's in this repo

| Pages | Count | Purpose |
|---|---|---|
| `index.html` | 1 | Course landing page with unit overview |
| `unit1.html` … `unit9.html` | 9 | Framework Gallery per unit (15 frameworks each) |
| `complete.html` | 1 | The full 135-framework Slibrary Wall with live filter + search |
| `activities/Unit*_Activities.html` | 9 | Signature pedagogy brief for each unit |
| `cases/Unit*_Case.html` | 9 | Case study with narrative + analysis questions |
| `prereading/Unit*_PreReading.html` | 9 | Pre-reading summary + key framework + guiding questions |
| `reflections/Unit*_Reflection.html` | 9 | Three independent-study questions per unit |
| `search.json` | 1 | Search index (9 units, 27 Slibraries, 135 frameworks, 36 sub-pages) |
| `assets/search.{js,css}` | 2 | Site-wide search modal |
| `assets/protection.{js,css}` | 2 | Copy/print deterrent |
| **Total** | **54** | All static HTML/JS/CSS/JSON, Arial throughout |

## Site-wide search

Every page includes a floating **Search** button in the top-right corner (keyboard shortcut **⌘K** on Mac, **Ctrl+K** on Windows, or just **/** when not typing). The search modal indexes:

- Unit titles + taglines
- All 27 Slibrary titles
- All 135 framework names and descriptions
- All 9 activity briefs (name + lede)
- All 9 case titles + subtitles
- All 9 pre-reading titles + authors + key frameworks
- All 9 reflection prompts

Results are grouped by type, coloured by unit, keyboard-navigable with arrow keys, and land on the correct page when selected.

## Content protection

Every page includes a classroom-appropriate deterrent against casual copying and printing:

- Text selection is disabled (CSS `user-select: none`)
- Right-click context menu is suppressed
- Keyboard shortcuts **Ctrl/Cmd + C / X / A / P / S / U** are intercepted
- Dragging text and images is blocked
- Printing is blocked via `@media print` — attempted prints show a single page of copyright notice instead of the content
- A branded toast appears when a blocked action is attempted

**Important:** this is a deterrent, not true security. Anyone who knows how to press F12 or view the page source can still access the raw content. The protection layer is designed to set clear expectations for students, not to defeat determined copying.

To disable protection for your own access (e.g. to update pages), delete the `<link>` to `assets/protection.css` and `<script>` to `assets/protection.js` from any specific page, or remove the files from the `assets/` folder entirely.

## Course structure

| # | Unit | Signature Activity | Core Case |
|---|---|---|---|
| 1 | Design Thinking as Mindset | Empathy Workshop | IDEO Shopping Cart |
| 2 | Ideation | Creative Sprint | Airbnb — From Air Mattresses to Ideas |
| 3 | Strategy Design | Strategy Canvas Lab | Nespresso |
| 4 | Entrepreneurial Thinking | Uncertainty Challenge | Spanx — Sara Blakely |
| 5 | Developing Successful Business Ideas | Opportunity Scan | Sentient Technologies — Reading the Market |
| 6 | Moving from an Idea to an Entrepreneurial Firm | Foundry Simulation | Sentient Technologies — Funding to Dissolution |
| 7 | Intrapreneurship | Corporate Venture Lab | Skydeck — DB Systel |
| 8 | The Art of Pitching | Pitch Theatre | Airbnb's First Deck |
| 9 | Systems Thinking (Capstone) | Systems Mapping Lab | Fashion's Circular Future |

Each unit curates **3 Slibraries × 5 frameworks = 15 frameworks** for a course total of **27 Slibraries / 135 frameworks**.

## Design system

- **Typography**: Arial throughout (consistent with EUBS brand standards).
- **Colour tokens**: navy hero (`#0f2133`) · EUBS teal accent (`#00BE96`) · warm paper background (`#f6f4ef`).
- **Per-unit accent tones**: Unit 1 teal · 2 steel · 3 amber · 4 rose · 5 plum · 6 navy · 7 accent-ink · 8 slate · 9 mist.
- **Self-contained**: no external fonts, no JavaScript frameworks — the only network request is for `search.json` when the search modal is first opened.

## Deploying on GitHub Pages

1. Push this folder to a repository (e.g. `drhaas-eubs/mba301`).
2. In your repository settings → **Pages**, set the source to `main` branch, `/ (root)` folder.
3. The site will be live at `https://<your-username>.github.io/mba301/`.
4. The `.nojekyll` file ensures GitHub Pages serves all HTML files as-is without Jekyll processing.

## Credits

- **Thumbnail Thinking: The Visual Operating System for Better Decisions**, JD Meier (2025), jdmeier.com
- **Clarify Your Core Message Playbook**, Kurt Bostelaar, Leverlo (v1.1, 2023)
- Course content, activities, cases and pedagogical design: Dr. H. Haas, EU Business School

© 2026 Dr. H. Haas · EU Business School
