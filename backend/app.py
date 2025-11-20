from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Sample portfolio data
portfolio_data = {
    "name": "Your Name",
    "title": "Full Stack Developer",
    "bio": "Passionate developer with expertise in TypeScript, JavaScript, Python, and React.",
    "email": "your.email@example.com",
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername",
    "projects": [
        {
            "id": 1,
            "title": "Project 1",
            "description": "A full-stack web application built with React and Flask.",
            "technologies": ["React", "TypeScript", "Flask", "Python"],
            "github": "https://github.com/yourusername/project1",
            "demo": "https://project1-demo.com",
            "image": "https://via.placeholder.com/400x300/667eea/ffffff?text=Project+1"
        },
        {
            "id": 2,
            "title": "Project 2",
            "description": "A RESTful API service with Python and Flask.",
            "technologies": ["Python", "Flask", "PostgreSQL"],
            "github": "https://github.com/yourusername/project2",
            "demo": None,
            "image": "https://via.placeholder.com/400x300/764ba2/ffffff?text=Project+2"
        },
        {
            "id": 3,
            "title": "Project 3",
            "description": "A modern web app with React and TypeScript.",
            "technologies": ["React", "TypeScript", "Node.js"],
            "github": "https://github.com/yourusername/project3",
            "demo": "https://project3-demo.com",
            "image": "https://via.placeholder.com/400x300/f5c2c2/1a1a1a?text=Project+3"
        }
    ],
    "skills": {
        "frontend": ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
        "backend": ["Python", "Flask", "Node.js"],
        "tools": ["Git", "Docker", "PostgreSQL", "MongoDB"]
    },
    "timeline": [
        {
            "season": "Summer",
            "year": 2023,
            "entries": [
                {
                    "id": "summer-2023-work",
                    "category": "Work",
                    "title": "Software Engineering Intern",
                    "description": "Worked as a software engineering intern at a tech company, focusing on full-stack development.",
                    "details": [
                        "Developed new features using React and TypeScript for the company's web application",
                        "Collaborated with cross-functional teams including designers and product managers",
                        "Improved application performance by optimizing database queries",
                        "Participated in code reviews and agile development practices",
                        "Presented weekly updates to the engineering team"
                    ],
                    "isNew": True
                }
            ]
        },
        {
            "season": "Spring",
            "year": 2023,
            "entries": [
                {
                    "id": "spring-2023-classes",
                    "category": "Classes",
                    "title": "Advanced Web Development",
                    "description": "Completed coursework in advanced web development and modern JavaScript frameworks.",
                    "details": [
                        "Built several full-stack applications using React and Node.js",
                        "Learned about state management with Redux and Context API",
                        "Explored server-side rendering with Next.js",
                        "Completed final project: an e-commerce platform with payment integration"
                    ],
                    "isNew": False
                },
                {
                    "id": "spring-2023-extracurriculars",
                    "category": "Extracurriculars",
                    "title": "Hackathon Organizer",
                    "description": "Organized and participated in multiple hackathons, helping create a vibrant developer community.",
                    "details": [
                        "Planned and executed a 24-hour hackathon with over 200 participants",
                        "Coordinated with sponsors and mentors",
                        "Mentored beginner developers and helped them build their first projects",
                        "Won first place in the university's annual coding competition"
                    ],
                    "isNew": True
                }
            ]
        },
        {
            "season": "Winter",
            "year": 2023,
            "entries": [
                {
                    "id": "winter-2023-work",
                    "category": "Work",
                    "title": "Product Manager",
                    "description": "Worked as a product manager, leading feature development and user research initiatives.",
                    "details": [
                        "Conducted user interviews and analyzed feedback to inform product decisions",
                        "Wrote product requirements documents (PRDs) for new features",
                        "Collaborated with engineering and design teams throughout the development lifecycle",
                        "Launched two major features that increased user engagement by 30%",
                        "Presented product strategy to company leadership"
                    ],
                    "isNew": False
                }
            ]
        },
        {
            "season": "Fall",
            "year": 2022,
            "entries": [
                {
                    "id": "fall-2022-classes",
                    "category": "Classes",
                    "title": "Machine Learning Fundamentals",
                    "description": "Studied machine learning algorithms and their applications in real-world problems.",
                    "details": [
                        "Implemented various ML algorithms from scratch in Python",
                        "Completed projects on image classification and natural language processing",
                        "Collaborated on a research project analyzing social media sentiment",
                        "Final project: recommendation system using collaborative filtering"
                    ],
                    "isNew": False
                },
                {
                    "id": "fall-2022-work",
                    "category": "Work",
                    "title": "Frontend Developer Intern",
                    "description": "Interned as a frontend developer, building user interfaces and improving user experience.",
                    "details": [
                        "Developed responsive web components using React and CSS",
                        "Fixed bugs and improved existing features based on user feedback",
                        "Participated in daily stand-ups and sprint planning meetings",
                        "Contributed to the company's design system documentation"
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

