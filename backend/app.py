from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Portfolio data
portfolio_data = {
    "name": "Thisbe Scholfield-Johnson",
    "title": "Software Engineer",
    "bio": "Full-stack developer experienced in Python with Flask and JavaScript with a background in STEM research and consulting. Possess strong skills in creative problem-solving and user-centered thinking that help innovative, experience-driven companies build intuitive and meaningful applications.",
    "email": "thisbeschojo@gmail.com",
    "phone": "417-389-4611",
    "location": "Brooklyn, New York",
    "github": "https://github.com/thisbeschojo",
    "linkedin": "https://linkedin.com/in/thisbeschojo",
    "projects": [
        # {
        #     "id": 1,
        #     "title": "Build a Bike with Tadej",
        #     "description": "App where users build a bike with Tadej Pogacar. Built with a React frontend and Flask backend, using SQLAlchemy for ORM and SQLite for storage. Features OpenAI integration to simulate conversation with Tadej and an online shopping feature.",
        #     "technologies": ["React", "JavaScript", "Flask", "Python", "SQLAlchemy", "SQLite", "OpenAI"],
        #     "github": "https://github.com/thisbeschojo/build-a-bike-with-tadej",
        #     "demoVideo": None,
        #     "image": "https://via.placeholder.com/400x300/667eea/ffffff?text=Build+a+Bike+with+Tadej",
        #     "status": "Not yet started"
        # },
        {
            "id": 2,
            "title": "Chickens",
            "description": "A location-based app that connects local egg sellers with nearby buyers. The app empowers backyard farmers and small-scale producers to share surplus eggs while promoting transparency around space and sourcing ethics.",
            "technologies": ["React", "JavaScript", "Flask", "Python"],
            "github": "https://github.com/thisbeschojo/chickens",
            "demoVideo": None,
            "image": "https://via.placeholder.com/400x300/764ba2/ffffff?text=Chickens",
            "status": "In Progress"
        },
        {
            "id": 3,
            "title": "Happy Food",
            "description": "MCP server analyzing the mood effects of foods based on nutritional and neurotransmitter data. Built in TypeScript + Node.js, integrating the USDA FoodData Central API and a local fallback database for mood analysis.",
            "technologies": ["TypeScript", "Node.js", "USDA FoodData API"],
            "github": "https://github.com/thisbeschojo/happy-food",
            "demoVideo": "https://youtu.be/D6VTj3kSKYY?si=xcKVSUdVhTHOF3O2",
            "image": "https://via.placeholder.com/400x300/f5c2c2/1a1a1a?text=Happy+Food"
        },
        {
            "id": 4,
            "title": "MoodRing",
            "description": "AI-powered journal app that analyzes emotions and creates visual mood representations through color-coded entries. Full-stack journaling platform using React.js frontend with Flask/SQLAlchemy backend, implementing user authentication and RESTful APIs.",
            "technologies": ["React", "JavaScript", "Flask", "Python", "SQLAlchemy", "OpenAI GPT-3.5"],
            "github": "https://github.com/thisbeschojo/moodring",
            "demoVideo": "https://youtu.be/bG4ZhJL69BE?si=MrkOQnMnXmA8_ufy",
            "image": "https://via.placeholder.com/400x300/667eea/ffffff?text=MoodRing"
        },
        {
            "id": 5,
            "title": "Still Strava",
            "description": "App inspired by Strava that allows users to log, share, and interact with outdoor activities. Full-stack social platform using React.js frontend with Flask/SQLAlchemy backend, implementing JWT authentication and RESTful APIs.",
            "technologies": ["React", "JavaScript", "Flask", "Python", "SQLAlchemy", "JWT", "Google Maps API", "Chart.js"],
            "github": "https://github.com/thisbeschojo/still-strava",
            "demoVideo": "https://youtu.be/iDY6MuXFTGE?si=xFC3k54P1PN8VDwE",
            "image": "https://via.placeholder.com/400x300/764ba2/ffffff?text=Still+Strava"
        },
        {
            "id": 6,
            "title": "Firefly Finder",
            "description": "Interactive map-based app for logging and exploring firefly sightings. Full-stack citizen science platform using React.js frontend with Flask/SQLAlchemy backend, implementing user authentication and RESTful APIs for firefly sighting documentation.",
            "technologies": ["React", "JavaScript", "Flask", "Python", "SQLAlchemy", "Google Maps API", "iNaturalist API"],
            "github": "https://github.com/thisbeschojo/firefly-finder",
            "demoVideo": "https://youtu.be/wXEtFoRQyhs?si=zysyXjCuZcV28noX",
            "image": "https://via.placeholder.com/400x300/f5c2c2/1a1a1a?text=Firefly+Finder"
        },
        {
            "id": 7,
            "title": "Natural Dye Lab",
            "description": "Guides users in creating and experimenting with natural dyes. Developed a Flask API backend with three models (DyeMaterial, Mordant, DyeResult) and full CRUD functionality. Implemented form validation and multiple React Router routes for a dynamic user experience.",
            "technologies": ["React", "JavaScript", "Flask", "Python", "SQLAlchemy"],
            "github": "https://github.com/thisbeschojo/natural-dye-lab",
            "demoVideo": "https://youtu.be/wu4RoJ_DpQU?si=oFPNedMcrXbxreEp",
            "image": "https://via.placeholder.com/400x300/667eea/ffffff?text=Natural+Dye+Lab"
        },
        {
            "id": 8,
            "title": "Your Life in Weeks",
            "description": "CLI tool to visualize life in weeks, helping users track time and set meaningful goals. Built a CLI application with SQLAlchemy ORM for efficient user data and event management.",
            "technologies": ["Python", "SQLAlchemy", "CLI"],
            "github": "https://github.com/thisbeschojo/your-life-in-weeks",
            "demoVideo": "https://youtu.be/TV8Ulysskbw?si=DYJr4IJITatYua1L",
            "image": "https://via.placeholder.com/400x300/764ba2/ffffff?text=Your+Life+in+Weeks"
        },
        {
            "id": 9,
            "title": "The Abyss Gazes Back",
            "description": "An interactive game where users navigate moral dilemmas and are categorized into archetypes. Set up json-server for GET and POST requests, enabling data submission and retrieval.",
            "technologies": ["React", "JavaScript", "json-server"],
            "github": "https://github.com/thisbeschojo/the-abyss-gazes-back",
            "demoVideo": "https://youtu.be/MqlsRGpNook?si=4bATnjXqx4W6091M",
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
                    "title": "Flatiron School",
                    "description": "Completed intensive program in Python with Flask and JavaScript, focusing on full-stack development, RESTful APIs, and modern web technologies in New York, NY.",
                    "isNew": True,
                    "month": 5
                },
                {
                    "id": "2025-began-tech-elevate",
                    "category": "Work",
                    "title": "TechElevate",
                    "description": "Remote internship developing and maintaining TechElevate's website. Creating websites for independent companies as part of fundraising initiatives for the organization.",
                    "isNew": True,
                    "month": 4
                },
                {
                    "id": "2025-began-freelance",
                    "category": "Work",
                    "title": "Freelance Web Development",
                    "description": "Remote freelance work building and optimizing WordPress sites for nonprofits including Teaching While Queer and Shark Stewards. Focusing on custom navigation, community features, accessibility, and performance optimization.",
                    "isNew": True,
                    "month": 4
                }
            ]
        },
        {
            "year": 2024,
            "entries": [
                {
                    "id": "2024-left-mkg",
                    "category": "Work",
                    "title": "Medical Knowledge Group",
                    "description": "Completed role as Associate in Healthcare Consulting & Market Research in New York, NY. Led quantitative and qualitative research projects, managed vendor coordination and budget tracking, and delivered strategic market insights to healthcare industry clients.",
                    "isNew": False,
                    "month": 9
                },
                {
                    "id": "2024-alaska-bushwhacking",
                    "category": "Personal",
                    "title": "Bushwhacking trip in Alaska",
                    "description": "Embarked on an off-the-grid, all women bushwhacking adventure in Alaska, exploring remote wilderness areas and challenging terrain.",
                    "isNew": False,
                    "month": 8
                },
                {
                    "id": "2024-portugal-cycling",
                    "category": "Personal",
                    "title": "Cycled the coast of Portugal",
                    "description": "Completed a solo cycling journey down the coast of Portugal, from Porto to Lagos, averaging 50 miles per day for 10 days.",
                    "isNew": False,
                    "month": 7
                }
            ]
        },
        {
            "year": 2023,
            "entries": [
                {
                    "id": "2023-began-mkg",
                    "category": "Work",
                    "title": "Medical Knowledge Group",
                    "description": "Associate in Healthcare Consulting & Market Research in New York, NY. Managed research project plans, vendor coordination, and scheduling while delivering strategic insights to healthcare industry clients.",
                    "isNew": False,
                    "month": 1
                },
                {
                    "id": "2023-completed-smg",
                    "category": "Work",
                    "title": "Science and Medicine Group",
                    "description": "Completed remote role as Market Research Analyst. Researched and analyzed life science companies' financial data, market share, and developments. Produced global market reports, interviewed industry experts, and wrote articles on technologies and industry trends.",
                    "isNew": False,
                    "month": 4
                }
            ]
        },
        {
            "year": 2022,
            "entries": [
                {
                    "id": "2022-began-smg",
                    "category": "Work",
                    "title": "Science and Medicine Group",
                    "description": "Remote role as Market Research Analyst analyzing life science companies' financial data, market share, segmentation, and developments. Forecasted future market growth, produced global market reports for laboratory instruments and lab automation, and interviewed industry experts.",
                    "isNew": False,
                    "month": 5
                }
            ]
        },
        {
            "year": 2021,
            "entries": [
                {
                    "id": "2021-graduated-georgetown",
                    "category": "Education",
                    "title": "Georgetown University",
                    "description": "Master of Science in Biotechnology and Biosciences, Washington, D.C.",
                    "isNew": False,
                    "month": 12
                },
                {
                    "id": "2021-began-oxford-biodynamics",
                    "category": "Work",
                    "title": "Oxford BioDynamics",
                    "description": "Remote internship as Market Research Analyst. Conducted competitive analysis and developed market access strategies for two oncological diseases of interest.",
                    "isNew": False,
                    "month": 8
                }
            ]
        },
        {
            "year": 2020,
            "entries": [
                {
                    "id": "2020-graduated-westminster",
                    "category": "Education",
                    "title": "University of Westminster",
                    "description": "Master of Science in Psychology, London, England.",
                    "isNew": False,
                    "month": 9
                },
                {
                    "id": "2020-completed-researcher-missouri",
                    "category": "Work",
                    "title": "University of Missouri",
                    "description": "Completed role as Researcher conducting neuroscience research into addiction, contributing to understanding of neural mechanisms underlying addictive behaviors.",
                    "isNew": False,
                    "month": 8
                }
            ]
        },
        {
            "year": 2019,
            "entries": [
                {
                    "id": "2019-researcher-missouri",
                    "category": "Work",
                    "title": "University of Missouri",
                    "description": "Researcher conducting neuroscience research into addiction, contributing to understanding of neural mechanisms underlying addictive behaviors.",
                    "isNew": False,
                    "month": 1
                }
            ]
        },
        {
            "year": 2018,
            "entries": [
                {
                    "id": "2018-graduated-wake-forest",
                    "category": "Education",
                    "title": "Wake Forest University",
                    "description": "Bachelor of Science in Biology with minor in Chemistry, Winston-Salem, NC.",
                    "isNew": False,
                    "month": 5
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

