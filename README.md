# Eric Xu - Personal Page

Single-page academic homepage, live at [ericxu1070.github.io](https://ericxu1070.github.io). Built with [Astro 5](https://astro.build).

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
  pages/index.astro   # the whole page: content, markup, and styles
  data/projects.js    # project list rendered in the "Projects" section
public/
  favicon.svg
  resume.pdf          # served at /resume.pdf
  me.jpg              # optional photo; shown in the header when present
```

### Editing content

- **Text sections** (bio, research, education, teaching, skills, coursework) are plain HTML in `src/pages/index.astro`.
- **Projects**: add an entry to `src/data/projects.js` with `title`, `year`, `description`, and an optional `repo` URL.
- **Photo**: drop a square-ish image at `public/me.jpg`. The header picks it up at build time; without it, the header is text only.

---

## Deploying

The workflow in `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main` or `master`.
