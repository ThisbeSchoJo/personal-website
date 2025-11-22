import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BooksPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

interface Book {
  id: string;
  title: string;
  author: string;
  link: string;
  cover_image?: string;
  rating?: number;
  date_read?: string;
  description?: string;
}

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [goodreadsUserId, setGoodreadsUserId] = useState('');
  const [inputUserId, setInputUserId] = useState('');
  const [hasAutoLoaded, setHasAutoLoaded] = useState(false);

  // Load saved user ID from localStorage
  useEffect(() => {
    const savedInput = localStorage.getItem('goodreads_user_input');
    const savedUserId = localStorage.getItem('goodreads_user_id');
    if (savedInput) {
      setInputUserId(savedInput);
    } else if (savedUserId) {
      setInputUserId(savedUserId);
    }
    if (savedUserId) {
      setGoodreadsUserId(savedUserId);
    }
  }, []);

  const extractUserId = (input: string): string | null => {
    const trimmed = input.trim();
    if (!trimmed) return null;
    
    // If it's a full URL, extract the user ID
    const urlMatch = trimmed.match(/goodreads\.com\/user\/show\/([^/?]+)/);
    if (urlMatch) {
      // Extract just the numeric part if there's a slug
      const fullId = urlMatch[1];
      const numericMatch = fullId.match(/^(\d+)/);
      return numericMatch ? numericMatch[1] : fullId;
    }
    
    // If it's just the numeric ID or ID with slug, extract numeric part
    const numericMatch = trimmed.match(/^(\d+)/);
    if (numericMatch) {
      return numericMatch[1];
    }
    
    // Return as-is if no pattern matches
    return trimmed;
  };

  const fetchBooks = async (userIdInput: string) => {
    const userId = extractUserId(userIdInput);
    
    if (!userId) {
      setError('Please enter your Goodreads user ID or full profile URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/goodreads`, {
        params: { user_id: userId }
      });
      
      setBooks(response.data.books || []);
      // Save both the extracted ID and the original input for user convenience
      localStorage.setItem('goodreads_user_id', userId);
      localStorage.setItem('goodreads_user_input', userIdInput);
      setGoodreadsUserId(userId);
      setInputUserId(userIdInput); // Keep the original input
      setHasAutoLoaded(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.response?.data?.details || 'Failed to fetch books from Goodreads';
      setError(errorMessage);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(inputUserId);
  };

  const handleLoadBooks = () => {
    if (inputUserId) {
      fetchBooks(inputUserId);
    } else if (goodreadsUserId) {
      fetchBooks(goodreadsUserId);
    }
  };

  // Auto-load books if user ID is saved (only on initial load)
  useEffect(() => {
    if (goodreadsUserId && !hasAutoLoaded && books.length === 0 && !loading && !error && inputUserId) {
      fetchBooks(inputUserId);
      setHasAutoLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goodreadsUserId, inputUserId, hasAutoLoaded]);

  return (
    <section className="section books-section">
      <div className="section-content">
        <h2 className="section-title">Books I've Read</h2>
        
        <div className="books-setup">
          <p className="books-intro">
            Connect your Goodreads account to display the books you've read. 
            Enter your Goodreads user ID (the numbers from your profile URL) or paste your full profile URL.
            Make sure your profile and "read" shelf are set to public.
          </p>
          
          <form onSubmit={handleSubmit} className="goodreads-form">
            <input
              type="text"
              className="goodreads-input"
              value={inputUserId}
              onChange={(e) => setInputUserId(e.target.value)}
              placeholder="Enter Goodreads user ID or profile URL (e.g., 48019961 or goodreads.com/user/show/48019961)"
            />
            <button type="submit" className="goodreads-submit-btn" disabled={loading}>
              {loading ? 'Loading...' : 'Load Books'}
            </button>
          </form>
          
          {goodreadsUserId && (
            <button 
              onClick={handleLoadBooks} 
              className="goodreads-refresh-btn"
              disabled={loading}
            >
              Refresh Books
            </button>
          )}
        </div>

        {error && (
          <div className="books-error">
            <p><strong>Error:</strong> {error}</p>
            <p className="books-error-help">
              Make sure your Goodreads profile is public, you have books on your "read" shelf, 
              and you've entered the correct user ID from your profile URL.
            </p>
          </div>
        )}

        {loading && (
          <div className="books-loading">
            <div className="spinner"></div>
            <p>Loading your books from Goodreads...</p>
          </div>
        )}

        {!loading && books.length > 0 && (
          <>
            <p className="books-count">Showing {books.length} books</p>
            <div className="books-grid">
              {books.map((book) => (
                <a
                  key={book.id}
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-card"
                >
                  {book.cover_image ? (
                    <img
                      src={book.cover_image}
                      alt={`${book.title} by ${book.author}`}
                      className="book-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="book-cover-placeholder">
                      <span>{book.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                    {book.rating && (
                      <div className="book-rating">
                        {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {!loading && books.length === 0 && !error && goodreadsUserId && (
          <div className="books-empty">
            <p>No books found. Make sure your Goodreads profile is public.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BooksPage;

