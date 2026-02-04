# Personal Website

Full-stack personal portfolio: React (TypeScript) frontend and Flask (Python) API. Content is edited in the backend; frontend and backend deploy separately.

## Prerequisites

- Python 3.12+
- Node.js 16+ and npm

## Run locally

**Backend** (API at `http://localhost:5001`):

```bash
cd backend
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**Frontend** (app at `http://localhost:3000`):

```bash
cd frontend
npm install
npm start
```

## Edit content

- **Bio, projects, skills, timeline, contact:** `backend/app.py` → `portfolio_data`.
- **Portfolio images:** Add optimized images to `frontend/public/images/portfolio/`, then set each project’s `"image": "/images/portfolio/filename.jpg"` in `portfolio_data`. See [docs/architecture.md](docs/architecture.md) for conventions.
- **Globe “lived” / “visited” locations:** `frontend/src/components/Globe.tsx` (e.g. `livedLocations`, `visitedLocations`).

## Deploy

1. **Backend:** Deploy `backend/` to Render (or similar). Use Python 3.12, build `pip install -r requirements.txt`, start `gunicorn --bind 0.0.0.0:$PORT app:app`. No env vars required for the base API.
2. **Frontend:** Deploy `frontend/` to Vercel. Set **Root Directory** to `frontend` and add **Environment Variable** `REACT_APP_API_URL` = your backend API base URL (e.g. `https://your-app.onrender.com/api`).

Step-by-step deployment and architecture details: **[docs/architecture.md](docs/architecture.md)**.  
Rationale for major decisions: **[docs/ADR.md](docs/ADR.md)**.

## Scripts

| Where    | Command         | Purpose          |
| -------- | --------------- | ---------------- |
| frontend | `npm start`     | Dev server       |
| frontend | `npm run build` | Production build |
| backend  | `python app.py` | Dev API server   |

## License

MIT. Use and adapt as you like.
