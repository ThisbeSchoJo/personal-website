# Architecture

## Overview

Personal website: React (TypeScript) frontend and Flask (Python) API backend. Content is driven by a single backend data source plus resume content in the frontend; frontend and backend are deployed separately.

## Tech Stack

| Layer    | Technology                                                                              |
| -------- | --------------------------------------------------------------------------------------- |
| Frontend | React 18, TypeScript, React Router, Axios, Framer Motion                               |
| Styling  | CSS3 (global + per-component in `src/styles/`), CSS variables for theme                 |
| Backend  | Python 3.12, Flask, Flask-CORS, Gunicorn (production)                                  |
| Data     | In-memory in `backend/app.py` (`portfolio_data`); Goodreads via RSS for Books page     |

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
│   │   ├── components/     # Header, Footer, About, Projects, Contact, Resume, ThemeToggle
│   │   ├── contexts/      # ThemeContext
│   │   ├── hooks/          # useOutsideClick
│   │   ├── pages/          # AboutPage, ProjectsPage, ResumePage, ContactPage, BooksPage
│   │   ├── styles/        # All CSS (global + component/page)
│   │   ├── types/         # TypeScript interfaces (Project, Skills, PortfolioData, etc.)
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── docs/
│   ├── architecture.md
│   └── ADR.md
└── README.md
```

## Routes & Pages

| Path        | Page         | Content source                                      |
| ----------- | ------------ | --------------------------------------------------- |
| `/`         | About        | `portfolio_data` (name, bio, highlights, links)     |
| `/projects` | Projects     | `portfolio_data.projects`                           |
| `/portfolio` | Projects (alias) | Same as `/projects`                            |
| `/resume`   | Resume       | `portfolio_data` (name, skills) + frontend constants (experience, education) |
| `/contact`  | Contact      | `portfolio_data` (email, github, linkedin) + Strava link |
| `/books`    | Books        | `portfolio_data` (name, goodreads_user_id) + `GET /api/goodreads` |

## Data Flow

1. **App load:** `App.tsx` fetches `GET /api/portfolio` once (10s timeout), stores result in state, and passes `portfolioData`, `loading`, and `error` into route components.
2. **Pages:** About, Projects, Resume, and Contact receive props from App and render when data is ready; they do not fetch portfolio themselves. Books page uses `portfolioData` for footer/Goodreads user ID and fetches `GET /api/goodreads` for the reading list.
3. **Backend:** `app.py` serves JSON from `portfolio_data` and aggregates Goodreads RSS at `/api/goodreads`.

## API

| Method | Path              | Purpose                                              |
| ------ | ----------------- | ---------------------------------------------------- |
| GET    | `/api/portfolio`  | Full portfolio (name, bio, projects, skills, etc.)  |
| GET    | `/api/health`     | Health check                                        |
| GET    | `/api/goodreads`  | Goodreads-derived reading list (query: `user_id`)   |

Base URL is configured via `REACT_APP_API_URL` in the frontend (dev default: `http://localhost:5001/api`).

## Deployment Architecture

- **Frontend:** Vercel. Root directory `frontend`, build `npm run build`, output `build`. Env: `REACT_APP_API_URL` = backend API base URL.
- **Backend:** Render (or other PaaS). Root directory `backend`, build `pip install -r requirements.txt`, start `gunicorn --bind 0.0.0.0:$PORT app:app`. Python 3.12 via `.python-version`.
- **No database:** Portfolio content lives in `backend/app.py`; resume experience/education in `frontend/src/pages/ResumePage.tsx`. Edit and redeploy to change.

## Key Conventions

- **Styling:** All CSS under `frontend/src/styles/`. Global variables in `index.css`; component/page CSS imported by component.
- **Portfolio images:** Static files in `frontend/public/images/portfolio/`. Referenced in backend as `"/images/portfolio/filename.jpg"`. Lazy-loaded in UI.
- **Mobile:** Collapsible nav (hamburger) below 768px; section spacing and typography adjusted in media queries.
- **Single about route:** The home route `/` is the about page; there is no separate `/about` path.

For rationale on major choices, see [ADR.md](./ADR.md).
