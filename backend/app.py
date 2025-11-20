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
            "season": "Winter",
            "year": 2025,
            "entries": [
                {
                    "id": "winter-2025-education",
                    "category": "Education",
                    "title": "Full Stack Web Development at Flatiron School",
                    "description": "Started intensive Full Stack Web Development program in Python with Flask and JavaScript in January 2025 in New York, NY.",
                    "details": [
                        "Began studying Python with Flask and JavaScript/React",
                        "Started building full-stack projects with React frontends and Flask backends",
                        "Learning RESTful API design, database management with SQLAlchemy, and authentication systems"
                    ],
                    "isNew": True
                }
            ]
        },
        {
            "season": "Spring",
            "year": 2025,
            "entries": [
                {
                    "id": "spring-2025-work-tech-elevate",
                    "category": "Work",
                    "title": "Intern - Web Development at TechElevate",
                    "description": "Remote internship developing and maintaining TechElevate's website and creating websites for independent companies as part of a fundraiser for TechElevate.",
                    "details": [
                        "Developed and maintained TechElevate's website",
                        "Created websites for independent companies as part of a fundraiser",
                        "Gained experience in client-facing web development projects"
                    ],
                    "isNew": True
                },
                {
                    "id": "spring-2025-freelance",
                    "category": "Work",
                    "title": "Freelance Web Developer",
                    "description": "Working with nonprofits to build and optimize WordPress sites, focusing on custom navigation, community features, and accessibility.",
                    "details": [
                        "Teaching While Queer: Developing WordPress site for LGBTQ+ educator nonprofit, building custom navigation and community features using BuddyX and BuddyPress",
                        "Optimizing site UI with HTML, CSS, and JavaScript for accessibility, performance, and responsiveness",
                        "Shark Stewards: Supporting WordPress development for marine conservation nonprofit, improving site performance, structure, and audience engagement"
                    ],
                    "isNew": True
                },
                {
                    "id": "spring-2025-education",
                    "category": "Education",
                    "title": "Full Stack Web Development at Flatiron School",
                    "description": "Continued Full Stack Web Development program, completed in May 2025 in New York, NY.",
                    "details": [
                        "Completed Python with Flask and JavaScript/React coursework",
                        "Finished multiple full-stack projects with React frontends and Flask backends",
                        "Mastered RESTful API design, database management with SQLAlchemy, and authentication systems",
                        "Graduated from comprehensive bootcamp program focusing on modern web development"
                    ],
                    "isNew": True
                }
            ]
        },
        {
            "season": "Summer",
            "year": 2024,
            "entries": [
                {
                    "id": "summer-2024-work-mkg",
                    "category": "Work",
                    "title": "Associate - Healthcare Consulting & Market Research at Medical Knowledge Group",
                    "description": "Worked in New York, NY from April 2023 to July 2024, managing research project plans and delivering strategic market insights for healthcare clients.",
                    "details": [
                        "Managed research project plans, including vendor coordination, budget tracking, and scheduling",
                        "Led quantitative and qualitative research, delivering strategic market insights and recommendations",
                        "Collaborated with healthcare industry clients to understand market dynamics and trends"
                    ],
                    "isNew": False
                }
            ]
        },
        {
            "season": "Spring",
            "year": 2023,
            "entries": [
                {
                    "id": "spring-2023-work-mkg",
                    "category": "Work",
                    "title": "Associate - Healthcare Consulting & Market Research at Medical Knowledge Group",
                    "description": "Started position in New York, NY in April 2023, managing research project plans and delivering strategic market insights for healthcare clients.",
                    "details": [
                        "Managed research project plans, including vendor coordination, budget tracking, and scheduling",
                        "Led quantitative and qualitative research, delivering strategic market insights and recommendations",
                        "Collaborated with healthcare industry clients to understand market dynamics and trends"
                    ],
                    "isNew": False
                }
            ]
        },
        {
            "season": "Winter",
            "year": 2021,
            "entries": [
                {
                    "id": "winter-2021-education-georgetown",
                    "category": "Education",
                    "title": "Biotechnology, Biosciences at Georgetown University",
                    "description": "Graduated with degree in Biotechnology, Biosciences from Georgetown University in Washington, D.C. in December 2021.",
                    "details": [
                        "Studied biotechnology and biosciences",
                        "Developed strong foundation in STEM research and scientific methodology",
                        "Completed degree program in December 2021"
                    ],
                    "isNew": False
                }
            ]
        },
        {
            "season": "Fall",
            "year": 2020,
            "entries": [
                {
                    "id": "fall-2020-education-westminster",
                    "category": "Education",
                    "title": "Psychology at Westminster University",
                    "description": "Studied Psychology at Westminster University in London, England.",
                    "details": [
                        "Explored psychological principles and research methods",
                        "Gained international academic experience studying in London",
                        "Began studies in September 2019"
                    ],
                    "isNew": False
                }
            ]
        },
        {
            "season": "Spring",
            "year": 2018,
            "entries": [
                {
                    "id": "spring-2018-education-wake-forest",
                    "category": "Education",
                    "title": "Biology, Chemistry (minor) at Wake Forest University",
                    "description": "Graduated from Wake Forest University in Winston-Salem, NC in May 2018 with a degree in Biology and minor in Chemistry.",
                    "details": [
                        "Focused on biological sciences and chemistry",
                        "Developed strong analytical and research skills",
                        "Built foundation for future work in biotechnology and STEM fields",
                        "Graduated in May 2018"
                    ],
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

