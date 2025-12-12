from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import requests
import feedparser
from datetime import datetime
import re

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
                    "id": "sailing-baja-california",
                    "category": "Personal",
                    "title": "Sailing Baja California",
                    "description": "Completed an 8-day off-the-grid, all women sailing course in Baja California, Mexico with NOLS.",
                    "isNew": True,
                    "month": 11
                },
                {
                    "id": "2025-began-locusai",
                    "category": "Work",
                    "title": "LocusAI GmbH",
                    "description": "Junior Software Engineer building and maintaining full-stack systems, including backend services, APIs, and AI-powered automation workflows. Integrated third-party systems and cloud infrastructure, ensuring security, data protection, and compliance while contributing to system architecture and performance.",
                    "isNew": True,
                    "month": 12
                },
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
                    "month": 6
                },
                {
                    "id": "2025-began-freelance",
                    "category": "Work",
                    "title": "Freelance Web Development",
                    "description": "Remote freelance work building and optimizing WordPress sites for nonprofits including Teaching While Queer and Shark Stewards. Focusing on custom navigation, community features, accessibility, and performance optimization.",
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

@app.route('/api/goodreads', methods=['GET'])
def get_goodreads_books():
    """Fetch books from Goodreads RSS feed"""
    user_id = request.args.get('user_id')
    
    if not user_id:
        return jsonify({"error": "user_id parameter is required"}), 400
    
    # Goodreads RSS feed URL
    rss_url = f"https://www.goodreads.com/review/list_rss/{user_id}?shelf=read"
    
    try:
        # Fetch the RSS feed with proper headers to avoid 403 errors
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/rss+xml, application/xml, text/xml, */*',
            'Accept-Language': 'en-US,en;q=0.9',
        }
        response = requests.get(rss_url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Parse the RSS feed
        feed = feedparser.parse(response.content)
        
        # Check if feed is valid
        if feed.bozo and feed.bozo_exception:
            error_msg = str(feed.bozo_exception)
            # Check if it's a common error
            if '404' in error_msg or 'not found' in error_msg.lower():
                return jsonify({"error": "Goodreads user not found. Please check your user ID."}), 404
            return jsonify({"error": "Failed to parse RSS feed", "details": error_msg}), 500
        
        # Check if feed has entries
        if not hasattr(feed, 'entries') or len(feed.entries) == 0:
            return jsonify({"error": "No books found. Make sure your 'read' shelf is public and has books."}), 404
        
        books = []
        
        for entry in feed.entries:
            # Extract book information
            # First try to get title and author from dedicated fields
            title = None
            author = 'Unknown Author'
            
            # Check for title field
            if hasattr(entry, 'title') and entry.title:
                title_full = entry.title
                # Remove CDATA if present
                if '<![CDATA[' in title_full:
                    title_full = re.sub(r'<!\[CDATA\[(.*?)\]\]>', r'\1', title_full)
                title = title_full.split(' by ')[0].strip()
                
                # Try to extract author from title
                if ' by ' in title_full:
                    parts = title_full.split(' by ', 1)
                    if len(parts) > 1:
                        title = parts[0].strip()
                        author = parts[1].strip()
            
            # Prefer author_name field if available
            if hasattr(entry, 'author_name') and entry.author_name:
                author = entry.author_name
            elif hasattr(entry, 'author') and entry.author:
                author = entry.author
            
            # Extract book link
            link = entry.get('link', '') or entry.get('id', '')
            
            # Extract book ID - prefer book_id field from RSS
            book_id = None
            if hasattr(entry, 'book_id') and entry.book_id:
                book_id = str(entry.book_id)
            elif link:
                # Fallback: extract from link
                book_id_match = re.search(r'/book/show/(\d+)', link)
                if book_id_match:
                    book_id = book_id_match.group(1)
                else:
                    # Try to extract from id/guid field
                    id_match = re.search(r'(\d+)', entry.get('id', '') or entry.get('guid', ''))
                    if id_match:
                        book_id = id_match.group(1)
            
            # Extract cover image
            cover_image = None
            # Try multiple methods to get cover image
            if hasattr(entry, 'content') and entry.content:
                # Try to find image in content
                img_matches = re.findall(r'<img[^>]+src="([^"]+)"', str(entry.content))
                if img_matches:
                    # Look for book cover images specifically
                    for img_url in img_matches:
                        if 'book' in img_url.lower() or 'cover' in img_url.lower() or 'goodreads' in img_url.lower():
                            cover_image = img_url
                            break
                    if not cover_image and img_matches:
                        cover_image = img_matches[0]
            
            # Also check for book image URLs (prefer larger images)
            if not cover_image:
                for attr in ['book_large_image_url', 'book_medium_image_url', 'book_image_url', 'book_small_image_url']:
                    if hasattr(entry, attr):
                        img_url = getattr(entry, attr)
                        if img_url:
                            cover_image = img_url
                            break
            
            # Extract user's rating (not average rating)
            rating = None
            # Only use user_rating, skip if 0 or invalid
            if hasattr(entry, 'user_rating'):
                try:
                    rating_val = entry.user_rating
                    if isinstance(rating_val, str):
                        rating_val = rating_val.strip()
                    rating_int = int(float(rating_val)) if rating_val else 0
                    # Only set rating if it's between 1-5 (skip 0)
                    if 1 <= rating_int <= 5:
                        rating = rating_int
                except (ValueError, TypeError):
                    pass
            
            # Extract date read
            date_read = None
            for attr in ['user_read_at', 'user_date_added', 'published']:
                if hasattr(entry, attr) and getattr(entry, attr):
                    try:
                        date_read = str(getattr(entry, attr))
                        break
                    except:
                        pass
            
            # Extract description/summary
            description = None
            for attr in ['description', 'summary', 'content']:
                if hasattr(entry, attr) and getattr(entry, attr):
                    desc_text = str(getattr(entry, attr))
                    # Clean up HTML
                    desc_text = re.sub(r'<[^>]+>', '', desc_text)
                    desc_text = desc_text.strip()
                    if desc_text and len(desc_text) > 20:  # Only use if substantial
                        description = desc_text[:500]
                        break
            
            # Only add if we have at least a title
            if title and title.strip() and title != 'Unknown':
                books.append({
                    "id": book_id or f"book_{len(books)}",
                    "title": title.strip(),
                    "author": author.strip() if author else 'Unknown Author',
                    "link": link,
                    "cover_image": cover_image,
                    "rating": rating,
                    "date_read": date_read,
                    "description": description
                })
        
        return jsonify({
            "books": books,
            "total": len(books),
            "feed_title": feed.feed.get('title', ''),
            "feed_link": feed.feed.get('link', '')
        })
        
    except requests.RequestException as e:
        return jsonify({"error": "Failed to fetch Goodreads data", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)

