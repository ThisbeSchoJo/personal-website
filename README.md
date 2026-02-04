# Personal Website

A modern, full-stack personal website built with React (TypeScript), Flask (Python), and a beautiful, responsive UI.

## Features

- ✨ Modern, responsive design with gradient backgrounds
- 🎯 Clean component-based React architecture with TypeScript
- 🚀 RESTful Flask API backend
- 📱 Mobile-friendly responsive layout
- 🎨 Beautiful animations and hover effects
- 📦 Project showcase with technology tags
- 💼 Skills display (Frontend, Backend, Tools)
- 📧 Contact information and social links

## Tech Stack

### Frontend

- React 18
- TypeScript
- CSS3 (with animations and gradients)
- Axios for API calls

### Backend

- Python 3
- Flask
- Flask-CORS

## Project Structure

```
personal-website/
├── backend/
│   ├── app.py              # Flask API server
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Header.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   ├── types/          # TypeScript type definitions
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Python 3.8+ installed
- Node.js 16+ and npm installed

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment (recommended):

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:

```bash
pip install -r requirements.txt
```

4. Run the Flask server:

```bash
python app.py
```

The backend API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## Customizing Your Portfolio

### Update Portfolio Data

Edit `backend/app.py` and modify the `portfolio_data` dictionary with your information:

- **Personal Info**: name, title, bio, email, social links
- **Projects**: Add, remove, or modify projects in the projects array
- **Skills**: Update the skills dictionary with your technologies

### Portfolio screenshots (performance-friendly)

To add project screenshots without hurting performance:

1. **Put images in** `frontend/public/images/portfolio/` (e.g. `chickens.jpg`). Files in `public/` are served as static assets and are **not** bundled, so they don’t bloat the app.
2. **Optimize before adding**: resize to ~800×600px (or 800px wide) and compress with [Squoosh](https://squoosh.app/) or [TinyPNG](https://tinypng.com/) so each image is under ~150 KB.
3. **Point the backend at them**: in `backend/app.py`, set each project’s `"image"` to `"/images/portfolio/your-filename.jpg"`.

The portfolio grid uses `loading="lazy"` and `decoding="async"` so images load only when near the viewport.

### Styling

- Main styles: `frontend/src/index.css` and `frontend/src/App.css`
- Component styles: Individual CSS files in `frontend/src/components/`
- Color scheme: Currently uses purple gradient (#667eea to #764ba2)

## Available Scripts

### Frontend

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

### Backend

- `python app.py` - Run Flask development server

## API Endpoints

- `GET /api/portfolio` - Returns portfolio data (name, projects, skills, contact info)
- `GET /api/health` - Health check endpoint

## Deployment

### Deploying the backend on Render (first)

Deploy the Flask API so you have a public URL for the frontend. The repo already includes `gunicorn` in `backend/requirements.txt` for production.

#### 1. Push your code to GitHub

Make sure this repo is on GitHub (or GitLab). Render will connect to it.

#### 2. Create a Render account and connect the repo

1. Go to [render.com](https://render.com) and sign up (or log in with GitHub).
2. In the dashboard, click **New +** → **Web Service**.
3. Connect your repository:
   - If you haven’t already, click **Connect account** for GitHub (or GitLab) and authorize Render.
   - Select the repo that contains this project (e.g. `personal-website`).
   - Click **Connect**.

#### 3. Configure the Web Service

Use these settings (adjust the name if you like):

| Setting            | Value                                         |
| ------------------ | --------------------------------------------- |
| **Name**           | `personal-website-api` (or any name you like) |
| **Region**         | Choose one close to you (e.g. Oregon)         |
| **Branch**         | `main` (or your default branch)               |
| **Root Directory** | `backend`                                     |
| **Runtime**        | `Python 3`                                    |
| **Build Command**  | `pip install -r requirements.txt`             |
| **Start Command**  | `gunicorn --bind 0.0.0.0:$PORT app:app`       |

- **Root Directory** must be `backend` so Render runs commands and finds `app.py` inside that folder.
- **Start Command**: Render sets `PORT`; `gunicorn` listens on that port so the service is reachable.

#### 4. (Optional) Environment variables

You don’t need any env vars for the basic portfolio/API. If you add features that need secrets (e.g. API keys), add them under **Environment** in the Render dashboard.

#### 5. Deploy

1. Click **Create Web Service**.
2. Render will clone the repo, run the build command, then start gunicorn. The first deploy can take a few minutes.
3. When it’s live, Render shows a URL at the top, e.g. `https://personal-website-api.onrender.com`. Open it and add `/api/portfolio` or `/api/health` to confirm the API responds.

#### 6. Save the API URL for the frontend

Use this as the base API URL (no trailing slash):

`https://<your-service-name>.onrender.com/api`

Example: `https://personal-website-api.onrender.com/api`

You’ll set this as `REACT_APP_API_URL` when you deploy the frontend (e.g. on Vercel).

**Free tier note:** On the free plan, the service may spin down after ~15 minutes of no traffic. The first request after that can be slow (cold start). For a portfolio this is usually fine.

---

### Deploying on Vercel (frontend)

Vercel hosts the **frontend** only. Use the backend URL from the step above (e.g. `https://your-app.onrender.com/api`) as `REACT_APP_API_URL`.

#### 2. Push your code to GitHub

Ensure this repo is on GitHub (or GitLab/Bitbucket); Vercel will import from there.

#### 3. Create the project on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. Click **Add New…** → **Project**.
3. **Import** your repository (e.g. `your-username/personal-website`).
4. Before deploying, set:
   - **Root Directory**: click **Edit**, choose `frontend`, then **Continue**. (This tells Vercel to build the React app, not the repo root.)
   - **Framework Preset**: should auto-detect **Create React App**.
   - **Build Command**: `npm run build` (default).
   - **Output Directory**: `build` (default).
5. **Environment Variables**: add one:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: your backend API base URL, e.g. `https://your-app.onrender.com/api`  
     (No trailing slash. This is used for portfolio, books, timeline, etc.)
6. Click **Deploy**. Vercel will build and give you a URL (e.g. `https://personal-website-xxx.vercel.app`).

#### 4. After deployment

- **Custom domain**: In the Vercel project, go to **Settings → Domains** and add your domain.
- **Backend CORS**: Your Flask app already uses `flask-cors`. If your frontend domain changes, you may need to restrict `CORS(app, origins=["https://your-vercel-app.vercel.app"])` in `backend/app.py` for production, or leave it open for development.

### Backend deployment (other options)

The Flask app can also be deployed to:

- Heroku
- PythonAnywhere
- AWS Elastic Beanstalk
- DigitalOcean

Set the `PORT` environment variable as required by the platform.

## License

MIT License - feel free to use this for your own portfolio!

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
