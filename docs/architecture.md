# Architecture

## Overview

Personal website: React (TypeScript) frontend and Flask (Python) API backend. Content is driven by a single backend data source; frontend and backend are deployed separately.

## Tech Stack

| Layer    | Technology                                                                    |
| -------- | ----------------------------------------------------------------------------- |
| Frontend | React 18, TypeScript, React Router, Axios                                     |
| Styling  | CSS3 (global + per-component), CSS variables for theme                        |
| Backend  | Python 3.12, Flask, Flask-CORS, Gunicorn (production)                         |
| Data     | In-memory in `backend/app.py` (`portfolio_data`); Goodreads via RSS for Books |

## Project Structure

```
personal-website/
├── backend/
│   ├── app.py              # Flask app, routes, portfolio_data
│   ├── requirements.txt
│   └── .python-version     # 3.12 (for Render / cgi compat)
├── frontend/
│   ├── public/             # Static assets (not bundled)
│   │   ├── favicon.svg
│   │   ├── index.html
│   │   └── images/portfolio/
│   ├── src/
│   │   ├── components/     # Reusable UI (Header, Footer, Projects, etc.)
│   │   ├── contexts/       # ThemeContext
│   │   ├── pages/          # Route-level pages
│   │   ├── styles/         # All CSS (global + component/page)
│   │   ├── types/          # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── docs/
│   ├── architecture.md
│   └── ADR.md
└── README.md
```

## Data Flow

1. **App load:** `App.tsx` fetches `GET /api/portfolio` and stores result in state; passes data to routes.
2. **Pages:** Each page (About, Projects, Skills, Timeline, Contact, Books, Ideas, Globe) uses that data or calls the API (e.g. Books, Ideas) as needed.
3. **Backend:** `app.py` serves JSON from `portfolio_data` and proxies/aggregates external services (e.g. Goodreads RSS) where required.

## API

| Method | Path             | Purpose                                                |
| ------ | ---------------- | ------------------------------------------------------ |
| GET    | `/api/portfolio` | Full portfolio (name, bio, projects, skills, timeline) |
| GET    | `/api/health`    | Health check                                           |
| GET    | `/api/books`     | Goodreads-derived reading list (optional)              |

Base URL is configured via `REACT_APP_API_URL` in the frontend (dev default: `http://localhost:5001/api`).

## Deployment Architecture

- **Frontend:** Vercel. Root directory `frontend`, build `npm run build`, output `build`. Env: `REACT_APP_API_URL` = backend API base URL.
- **Backend:** Render (or other PaaS). Root directory `backend`, build `pip install -r requirements.txt`, start `gunicorn --bind 0.0.0.0:$PORT app:app`. Python 3.12 via `.python-version`.
- **No database:** Content lives in `backend/app.py`; edit and redeploy to change.

## Key Conventions

- **Styling:** All CSS under `frontend/src/styles/`. Global variables in `index.css`; component/page CSS imported by component.
- **Portfolio images:** Static files in `frontend/public/images/portfolio/`. Referenced in backend as `"/images/portfolio/filename.jpg"`. Lazy-loaded in UI.
- **Mobile:** Collapsible nav (hamburger) and flow-based timeline layout below 768px; section spacing and typography adjusted in media queries.

For rationale on major choices, see [ADR.md](./ADR.md).
