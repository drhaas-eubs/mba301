# MBA301 — GitHub Pages Upload

Drop every file and folder in this archive into the **root** of your `drhaas-eubs.github.io/mba301/` repository (replacing the existing files). GitHub Pages will rebuild and the live site will match the new design.

## What's in the bundle

**47 HTML files + 1 stylesheet:**

```
index.html              Landing page — 9 unit accordion + 27 Slibraries
styles.css              Shared design system (single edit point for theming)
complete.html           Slibrary Wall — all 135 framework thumbnails

unit1.html ... unit9.html                      Framework galleries (15 frameworks each)
activities/Unit[1-9]_Activities.html           Workshop briefs + rubrics
cases/Unit[1-9]_Case.html                      Teaching cases + discussion Qs
prereading/Unit[1-9]_PreReading.html           Harvard-style reading notes
reflections/Unit[1-9]_Reflection.html          Independent-study prompts
```

## Upload options

**Option A — upload as-is.** In the GitHub repo page, click "Add file → Upload files", drag the entire contents of this folder in, commit.

**Option B — replace specific files.** If you only want to refresh the landing and leave existing sub-pages, upload just `index.html` and `styles.css`.

## How to edit content later

All text content lives inside the HTML files directly — no build step required. Each unit page is self-contained. To change a unit's colour scheme across all its pages, edit the matching CSS variable block in `styles.css`:

```css
.u1 { --unit: #00BE96;  --unit-soft: #E4F6F0;  --unit-ink: #003B2E; }
```

## Design principles applied

- **Arial throughout** (EUBS brand standard, no Google Fonts)
- **Per-unit colour coding** via CSS custom properties — each unit flows its colour through hero, Slibrary badges, framework cards, step accents
- **Large illustrated Slibrary cards** — coloured top bar, 200px bespoke SVG illustration on tinted unit background, bold title, description, coloured Slibrary badge
- **Accessible** — `aria-expanded` on accordion, `aria-hidden` on decorative SVGs, `prefers-reduced-motion` honoured
- **Mobile-responsive** — grids collapse gracefully at 880px and 620px breakpoints

— Dr. H. Haas · MBA301 · AY 2025/2026 Term III
