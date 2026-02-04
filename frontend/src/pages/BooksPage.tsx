import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import { PortfolioData } from "../types";
import "../styles/BooksPage.css";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5001/api";

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
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null,
  );
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch portfolio data to get Goodreads user ID
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/portfolio`);
        setPortfolioData(response.data);

        // Automatically fetch books if Goodreads user ID is available
        if (response.data.goodreads_user_id) {
          fetchBooks(response.data.goodreads_user_id);
        } else {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        console.error("Error fetching portfolio data:", err);
      }
    };

    fetchPortfolioData();
  }, []);

  const fetchBooks = async (userId: string) => {
    if (!userId) {
      setError("Goodreads user ID not configured");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_BASE_URL}/goodreads`, {
        params: { user_id: userId },
      });

      setBooks(response.data.books || []);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.details ||
        "Failed to fetch books from Goodreads";
      setError(errorMessage);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !portfolioData) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <section className="section books-section">
        <div className="section-content">
          <h2 className="section-title">Books I've Read</h2>

          {error && (
            <div className="books-error">
              <p>
                <strong>Error:</strong> {error}
              </p>
              <p className="books-error-help">
                Make sure your Goodreads profile is public and you have books on
                your "read" shelf.
              </p>
            </div>
          )}

          {loading && (
            <div className="books-loading">
              <div className="spinner"></div>
              <p>Loading books from Goodreads...</p>
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
                          (e.target as HTMLImageElement).style.display = "none";
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
                          {"★".repeat(book.rating)}
                          {"☆".repeat(5 - book.rating)}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}

          {!loading &&
            books.length === 0 &&
            !error &&
            portfolioData?.goodreads_user_id && (
              <div className="books-empty">
                <p>
                  No books found. Make sure your Goodreads profile is public.
                </p>
              </div>
            )}
        </div>
      </section>
      {portfolioData && <Footer name={portfolioData.name} />}
    </>
  );
};

export default BooksPage;
