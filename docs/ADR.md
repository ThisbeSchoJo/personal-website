# Architecture Decision Records

Short records of important architecture and design decisions.

---

## ADR-1: React + Flask split (frontend / backend)

**Context:** Need a portfolio site with dynamic content and optional external integrations (e.g. Goodreads).

**Decision:** Use a React (TypeScript) SPA for the frontend and a Flask API for the backend. Content and config live in the backend; frontend consumes JSON.

**Consequences:** Clear separation of UI and data; backend can be swapped or scaled independently; frontend can be deployed to a CDN (e.g. Vercel). Two runtimes to maintain and two deployments.

---

## ADR-2: No database; content in code

**Context:** Portfolio data (bio, projects, skills, timeline) changes infrequently.

**Decision:** Store all portfolio content in `backend/app.py` in a single `portfolio_data` structure. No DB or CMS.

**Consequences:** Simple to run and deploy; no migrations or backups for content. Edits require code change and redeploy. Suitable for a single-owner portfolio.

---

## ADR-3: Centralized styles in `src/styles/`

**Context:** CSS was originally next to components/pages; harder to see all styling in one place.

**Decision:** Move all styles into `frontend/src/styles/` (e.g. `About.css`, `Projects.css`, `index.css`, `App.css`). Components and pages import from `../styles/...` or `./styles/...`.

**Consequences:** One place for all CSS; clearer structure. No change to bundle behavior.

---

## ADR-4: Portfolio images in `public/` and lazy loading

**Context:** In-repo images can bloat the bundle and slow initial load.

**Decision:** Put portfolio screenshots in `frontend/public/images/portfolio/`. Reference them from the backend as `/images/portfolio/<filename>`. Use `<img loading="lazy" decoding="async">` and `object-position: top` for cards.

**Consequences:** Images are static assets, not bundled; browser can cache them. Authors should optimize (resize, compress) before adding. Good for performance without a CDN.

---

## ADR-5: Deploy frontend on Vercel, backend on Render

**Context:** Need free or low-cost hosting for both frontend and backend.

**Decision:** Deploy React app on Vercel (root directory `frontend`). Deploy Flask app on Render (root directory `backend`, Gunicorn, Python 3.12). Frontend calls backend via `REACT_APP_API_URL`.

**Consequences:** Simple CI from Git; no server management. Backend free tier may sleep (cold starts). CORS is configured in Flask for the frontend origin.

---

## ADR-6: Python 3.12 for backend

**Context:** Python 3.13 removed the `cgi` module; `feedparser` (used for Goodreads RSS) depended on it, causing deploy failures on Render.

**Decision:** Pin backend to Python 3.12 via `backend/.python-version` (and repo root `.python-version` for Render).

**Consequences:** Deploys succeed; we stay on 3.12 until feedparser (or our usage) is compatible with 3.13+.

---

## ADR-7: Collapsible nav and flow-based timeline on mobile

**Context:** Nav had many links and timeline used absolute positioning; both were poor on small screens.

**Decision:** Below 768px: (1) Replace inline nav with a hamburger that toggles a vertical nav list. (2) Timeline: switch to flow layout (static positioning); year groups and events stack vertically; expanded details below the entry; hide vertical/connector lines.

**Consequences:** Mobile UX improved; one extra state (menu open/closed) and more CSS in media queries.
