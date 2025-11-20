from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Portfolio data
portfolio_data = {
    "name": "Thisbe Scholfield-Johnson",
    "title": "Software Engineer / Full-Stack Developer",
    "bio": "Full-stack developer experienced in Python with Flask and JavaScript with a background in STEM research and consulting. Possess strong skills in creative problem-solving and user-centered thinking that help innovative, experience-driven companies build intuitive and meaningful applications.",
    "email": "thisbeschojo@gmail.com",
    "phone": "417-389-4611",
    "location": "Brooklyn, New York",
    "github": "https://github.com/thisbeschojo",
    "linkedin": "https://linkedin.com/in/thisbeschojo",
    "projects": [
        {
            "id": 1,
            "title": "Build a Bike with Tadej",
            "description": "App where users build a bike with Tadej Pogacar. Built with a React frontend and Flask backend, using SQLAlchemy for ORM and SQLite for storage. Features OpenAI integration to simulate conversation with Tadej and an online shopping feature.",
            "technologies": ["React", "JavaScript", "Flask", "Python", "SQLAlchemy", "SQLite", "OpenAI"],
            "github": "https://github.com/thisbeschojo/build-a-bike-with-tadej",
            "demo": None,
            "image": "https://via.placeholder.com/400x300/667eea/ffffff?text=Build+a+Bike+with+Tadej",
            "status": "Not yet started"
        },
        {
            "id": 2,
            "title": "Chickens",
            "description": "A location-based app that connects local egg sellers with nearby buyers. The app empowers backyard farmers and small-scale producers to share surplus eggs while promoting transparency around space and sourcing ethics.",
            "technologies": ["React", "JavaScript", "Flask", "Python"],
            "github": "https://github.com/thisbeschojo/chickens",
            "demo": None,
            "image": "https://via.placeholder.com/400x300/764ba2/ffffff?text=Chickens",
            "status": "In Progress"
        },
        {
            "id": 3,
            "title": "Happy Food",
            "description": "MCP server analyzing the mood effects of foods based on nutritional and neurotransmitter data. Built in TypeScript + Node.js, integrating the USDA FoodData Central API and a local fallback database for mood analysis.",
            "technologies": ["TypeScript", "Node.js", "USDA FoodData API"],
            "github": "https://github.com/thisbeschojo/happy-food",
            "demo": None,
            "image": "https://via.placeholder.com/400x300/f5c2c2/1a1a1a?text=Happy+Food"
        },
        {
            "id": 4,
            "title": "MoodRing",
            "description": "AI-powered journal app that analyzes emotions and creates visual mood representations through color-coded entries. Full-stack journaling platform using React.js frontend with Flask/SQLAlchemy backend, implementing user authentication and RESTful APIs.",
            "technologies": ["React", "JavaScript", "Flask", "Python", "SQLAlchemy", "OpenAI GPT-3.5"],
            "github": "https://github.com/thisbeschojo/moodring",
            "demo": None,
            "image": "https://via.placeholder.com/400x300/667eea/ffffff?text=MoodRing"
        },
        {
            "id": 5,
            "title": "Still Strava",
            "description": "App inspired by Strava that allows users to log, share, and interact with outdoor activities. Full-stack social platform using React.js frontend with Flask/SQLAlchemy backend, implementing JWT authentication and RESTful APIs.",
            "technologies": ["React", "JavaScript", "Flask", "Python", "SQLAlchemy", "JWT", "Google Maps API", "Chart.js"],
            "github": "https://github.com/thisbeschojo/still-strava",
            "demo": None,
            "image": "https://via.placeholder.com/400x300/764ba2/ffffff?text=Still+Strava"
        },
        {
            "id": 6,
            "title": "Firefly Finder",
            "description": "Interactive map-based app for logging and exploring firefly sightings. Full-stack citizen science platform using React.js frontend with Flask/SQLAlchemy backend, implementing user authentication and RESTful APIs for firefly sighting documentation.",
            "technologies": ["React", "JavaScript", "Flask", "Python", "SQLAlchemy", "Google Maps API", "iNaturalist API"],
            "github": "https://github.com/thisbeschojo/firefly-finder",
            "demo": None,
            "image": "https://via.placeholder.com/400x300/f5c2c2/1a1a1a?text=Firefly+Finder"
        },
        {
            "id": 7,
            "title": "Natural Dye Lab",
            "description": "Guides users in creating and experimenting with natural dyes. Developed a Flask API backend with three models (DyeMaterial, Mordant, DyeResult) and full CRUD functionality. Implemented form validation and multiple React Router routes for a dynamic user experience.",
            "technologies": ["React", "JavaScript", "Flask", "Python", "SQLAlchemy"],
            "github": "https://github.com/thisbeschojo/natural-dye-lab",
            "demo": None,
            "image": "https://via.placeholder.com/400x300/667eea/ffffff?text=Natural+Dye+Lab"
        },
        {
            "id": 8,
            "title": "Your Life in Weeks",
            "description": "CLI tool to visualize life in weeks, helping users track time and set meaningful goals. Built a CLI application with SQLAlchemy ORM for efficient user data and event management.",
            "technologies": ["Python", "SQLAlchemy", "CLI"],
            "github": "https://github.com/thisbeschojo/your-life-in-weeks",
            "demo": None,
            "image": "https://via.placeholder.com/400x300/764ba2/ffffff?text=Your+Life+in+Weeks"
        },
        {
            "id": 9,
            "title": "The Abyss Gazes Back",
            "description": "An interactive game where users navigate moral dilemmas and are categorized into archetypes. Set up json-server for GET and POST requests, enabling data submission and retrieval.",
            "technologies": ["React", "JavaScript", "json-server"],
            "github": "https://github.com/thisbeschojo/the-abyss-gazes-back",
            "demo": None,
            "image": "https://via.placeholder.com/400x300/f5c2c2/1a1a1a?text=The+Abyss+Gazes+Back"
        }
    ],
    "skills": {
        "frontend": ["React", "JavaScript", "CSS", "HTML"],
        "backend": ["Python", "Flask", "Node.js", "RESTful APIs"],
        "tools": ["SQL", "PyTest", "Mocha", "Git", "GitHub"]
    },
    "timeline": [
        {
            "year": 2025,
            "entries": [
                {
                    "id": "2025-graduated-flatiron",
                    "category": "Education",
                    "title": "Graduated Flatiron School SWE certificate",
                    "description": "Completed Full Stack Web Development program in Python with Flask and JavaScript.",
                    "isNew": True,
                    "month": 5
                },
                {
                    "id": "2025-began-tech-elevate",
                    "category": "Work",
                    "title": "Began Internship with TechElevate",
                    "description": "Remote internship developing and maintaining TechElevate's website.",
                    "isNew": True,
                    "month": 5
                },
                {
                    "id": "2025-began-freelance",
                    "category": "Work",
                    "title": "Began Freelance work (Shark Stewards, Teaching While Queer)",
                    "description": "Working with nonprofits to build and optimize WordPress sites.",
                    "isNew": True,
                    "month": 6
                }
            ]
        },
        {
            "year": 2024,
            "entries": [
                {
                    "id": "2024-left-mkg",
                    "category": "Work",
                    "title": "Left job at MKG",
                    "description": "Completed role at Medical Knowledge Group.",
                    "isNew": False
                }
            ]
        },
        {
            "year": 2023,
            "entries": [
                {
                    "id": "2023-began-mkg",
                    "category": "Work",
                    "title": "Began job at Medical Knowledge Group",
                    "description": "Started as Associate - Healthcare Consulting & Market Research.",
                    "isNew": False
                }
            ]
        },
        {
            "year": 2021,
            "entries": [
                {
                    "id": "2021-graduated-georgetown",
                    "category": "Education",
                    "title": "Graduated Georgetown with biotechnology masters",
                    "description": "Completed degree in Biotechnology, Biosciences.",
                    "isNew": False
                }
            ]
        },
        {
            "year": 2020,
            "entries": [
                {
                    "id": "2020-graduated-westminster",
                    "category": "Education",
                    "title": "Graduated University of Westminster with psychology masters",
                    "description": "Completed Psychology degree in London, England.",
                    "isNew": False
                }
            ]
        },
        {
            "year": 2018,
            "entries": [
                {
                    "id": "2018-graduated-wake-forest",
                    "category": "Education",
                    "title": "Graduated Wake Forest biology degree",
                    "description": "Completed degree in Biology with minor in Chemistry.",
                    "isNew": False
                }
            ]
        }
    ]
}

@app.route('/api/portfolio', methods=['GET'])
def get_portfolio():
    """Get portfolio data"""
    return jsonify(portfolio_data)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)

