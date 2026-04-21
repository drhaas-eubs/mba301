# MBA301 — GitHub Pages Upload

Drop every file and folder in this archive into the **root** of your `drhaas-eubs.github.io/mba301/` repository (overwriting the existing files). GitHub Pages will rebuild and the live site will match the new design.

## What's new in this revision

**Click-to-expand framework definitions** — every framework tile on the unit pages (Unit 1–9) and on the complete Slibrary Wall is now clickable. Clicking opens a modal showing:
- The framework's illustration (full-size)
- A 2–3 sentence extended definition
- A Harvard-style reference for independent study

All 135 frameworks have substantive descriptions and canonical references (Brown 2008, Liedtka 2018, Sarasvathy 2001, Meadows 1999, Osterwalder & Pigneur 2010, Porter 1979, Kim & Mauborgne 2005, Christensen et al. 2016, Ries 2011, Senge 1990, and so on).

Modal closes via ✕ button, backdrop click, or `Esc` key. Colours automatically match the unit's theme.

## What's in the bundle

**47 HTML files + 1 stylesheet = 48 files total:**

```
index.html              Landing — 9 unit accordion + 27 Slibraries
styles.css              Shared design system (single edit point for theming)
complete.html           Slibrary Wall — all 135 clickable framework tiles

unit1.html ... unit9.html                      Framework galleries (15 clickable cards each)
activities/Unit[1-9]_Activities.html           Workshop briefs + rubrics
cases/Unit[1-9]_Case.html                      Teaching cases + discussion Qs
prereading/Unit[1-9]_PreReading.html           Harvard-style reading notes
reflections/Unit[1-9]_Reflection.html          Independent-study prompts
```

## Upload

On GitHub.com, open your `mba301/` repo, click **"Add file → Upload files"**, drag the *contents* of this folder (Cmd+A / Ctrl+A after opening the folder) into the drop zone, commit. GitHub will replace matching filenames and add the new ones automatically.

After committing, wait 30–60 seconds for GitHub Pages to rebuild, then hard-refresh `drhaas-eubs.github.io/mba301/` (Ctrl+Shift+R / Cmd+Shift+R).

## Editing content later

All content is inline in the HTML files — no build step needed. For colour tweaks, edit the matching CSS variable block in `styles.css`:

```css
.u1 { --unit: #00BE96;  --unit-soft: #E4F6F0;  --unit-ink: #003B2E; }
```

— Dr. H. Haas · MBA301 · AY 2025/2026 Term III
