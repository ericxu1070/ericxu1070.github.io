# Eric Xu - Portfolio

Personal portfolio site live at [ericxu1070.github.io](https://ericxu1070.github.io). Built with [Astro 5](https://astro.build), Bold Editorial design, and a Three.js Lorenz attractor loading screen.

---

## Local dev

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # builds to dist/
```

---

## Project map

```
src/
  components/     # Astro components (Nav, Footer, Loader, etc.)
  layouts/        # BaseLayout.astro - wraps every page
  pages/          # file-based routes: index, projects, notes, research, recruiters
  styles/         # global.css - design tokens and shared CSS classes
  data/           # projects.js - project list consumed by /projects page
  content/
    notes/        # Markdown files for /notes/<topic>/<slug>
public/
  favicon.svg
  resume.pdf      # your CV, served at /resume.pdf
```

### Adding a note

Notes are Markdown files under `src/content/notes/`. Two things control where a note shows up:

- **The folder name** becomes the URL. `src/content/notes/gpu-programming/memory-coalescing.md` is served at `/notes/gpu-programming/memory-coalescing`.
- **The `topic` frontmatter field** is the heading a note is grouped under on the `/notes` index. Reuse the exact same `topic` string across files to group them together.

To add a note, create `src/content/notes/<folder>/<slug>.md`:

```yaml
---
title: "Warp scheduling and occupancy"
topic: "GPU programming"     # grouping heading on /notes (keep spelling consistent)
description: "One sentence shown under the title on the notes index."
date: 2026-07-20             # YYYY-MM-DD; controls the displayed date
---

Your note body starts here. Write normal Markdown.
```

Then run `npm run dev` (or rebuild) - the note appears automatically; no other file needs editing. The three existing folders are `gpu-programming`, `deep-learning`, and `linear-algebra`, but you can add any new folder/topic you like. To make a new topic also appear as a chip on the home page, add a link to it in the "Notes" section of `src/pages/index.astro`.

**Math** renders via KaTeX. Inline math uses single dollars: `$A = U\Sigma V^\top$`. Display math uses double dollars on their own lines:

```
$$
\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}
$$
```

**Code** is syntax-highlighted automatically - just use a fenced block with a language tag:

````
```python
def relu(x):
    return max(0.0, x)
```
````

The three notes already in the repo (memory coalescing, backprop as vector-Jacobian products, the SVD) are working examples of the format. They were drafted as starter content - feel free to edit them into your own words, keep them, or delete the files.

---

## Deploying

1. Create a GitHub repository named exactly **`ericxu1070.github.io`**.
2. Push this repo to it.
3. Go to **Settings -> Pages -> Source** and select **GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) runs on every push to `master` or `main` and deploys automatically.

---

## Still to personalize

The site is populated with real content (projects, research, teaching, coursework, skills, contact links, and your CV). Two spots are intentionally left for you, each marked with a `<!-- PLACEHOLDER -->` comment in the source:

- [ ] **Personal bio** - the "About" section in `src/pages/index.astro` has a factual placeholder stub and the line "A fuller bio is coming soon." Replace it with a bio in your own voice when ready.
- [ ] **Job-seeking status** - the "Status" card on `src/pages/recruiters.astro` states your incoming M.S. but not what you're looking for (internships, research roles, etc.). Add that when you know.

Optional: review or rewrite the three example notes under `src/content/notes/` so they read in your own words.
