import React, { useState, useEffect, useRef } from 'react';
import './IdeasPage.css';

interface Idea {
  id: number;
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const IdeasPage: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load ideas from localStorage on mount
  useEffect(() => {
    const savedIdeas = localStorage.getItem('ideas');
    if (savedIdeas) {
      try {
        const parsed = JSON.parse(savedIdeas);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Initialize with random positions and velocities if missing
          const initialized = parsed.map((idea: any) => ({
            id: idea.id || Date.now() + Math.random(),
            text: idea.text || '',
            x: typeof idea.x === 'number' ? idea.x : Math.random() * 80 + 10,
            y: typeof idea.y === 'number' ? idea.y : Math.random() * 60 + 10,
            vx: typeof idea.vx === 'number' ? idea.vx : (Math.random() - 0.5) * 0.5,
            vy: typeof idea.vy === 'number' ? idea.vy : (Math.random() - 0.5) * 0.5,
          }));
          setIdeas(initialized);
        }
      } catch (e) {
        console.error('Error loading ideas:', e);
      }
    }
  }, []);

  // Save ideas to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }, [ideas]);

  // Animation loop for moving ideas
  useEffect(() => {
    if (ideas.length === 0) return;

    const interval = setInterval(() => {
      setIdeas(prevIdeas => 
        prevIdeas.map(idea => {
          let newX = idea.x + idea.vx;
          let newY = idea.y + idea.vy;
          let newVx = idea.vx;
          let newVy = idea.vy;

          // Bounce off edges
          if (newX <= 0 || newX >= 90) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(90, newX));
          }
          if (newY <= 0 || newY >= 85) {
            newVy = -newVy;
            newY = Math.max(0, Math.min(85, newY));
          }

          // Occasionally add some randomness to velocity
          if (Math.random() < 0.02) {
            newVx += (Math.random() - 0.5) * 0.2;
            newVy += (Math.random() - 0.5) * 0.2;
          }

          // Clamp velocity
          newVx = Math.max(-1, Math.min(1, newVx));
          newVy = Math.max(-1, Math.min(1, newVy));

          return {
            ...idea,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
          };
        })
      );
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [ideas.length]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      const newIdea: Idea = {
        id: Date.now(),
        text: inputText.trim(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 10,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      };
      setIdeas(prev => [...prev, newIdea]);
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  const handleDelete = (id: number) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  return (
    <section className="section ideas-section">
      <div className="section-content">
        <h2 className="section-title">Ideas</h2>
        <form onSubmit={handleSubmit} className="ideas-form">
          <textarea
            className="ideas-textarea"
            value={inputText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Write your ideas here... (Cmd/Ctrl + Enter to submit)"
            rows={4}
          />
          <button type="submit" className="ideas-submit-btn">
            Add Idea
          </button>
        </form>
        <div ref={containerRef} className="ideas-display-container">
          {ideas.map(idea => (
            <div
              key={idea.id}
              className="idea-card"
              style={{
                left: `${idea.x}%`,
                top: `${idea.y}%`,
              }}
              onClick={() => handleDelete(idea.id)}
            >
              {idea.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IdeasPage;

