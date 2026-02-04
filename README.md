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

The portfolio grid uses `loading="lazy"` and `decoding="async"` so images load only when near the viewport. See `frontend/public/images/portfolio/README.md` for more detail.

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

### Backend Deployment

The Flask app can be deployed to platforms like:

- Heroku
- PythonAnywhere
- AWS Elastic Beanstalk
- DigitalOcean

Make sure to set the `PORT` environment variable appropriately.

### Frontend Deployment

Build the production version:

```bash
cd frontend
npm run build
```

The `build` folder can be deployed to:

- Netlify
- Vercel
- GitHub Pages
- AWS S3

Don't forget to update the `REACT_APP_API_URL` environment variable to point to your deployed backend API.

## License

MIT License - feel free to use this for your own portfolio!

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
