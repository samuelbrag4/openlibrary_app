"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./bookList.module.css";

const BookList = ({ searchQuery, category }) => {
  const url = "https://openlibrary.org/api/books";
  const isbnList = ["0451526538", "9780140449136", "9780140449266"]; // Exemplos de ISBNs

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          params: {
            bibkeys: isbnList.map((isbn) => `ISBN:${isbn}`).join(","),
            format: "json",
            jscmd: "data",
          },
        });
        setBooks(Object.values(response.data));
        setLoading(false);
      } catch (error) {
        console.log("Erro ao buscar livros na API");
        setError("Não foi possível carregar os livros. Tente novamente mais tarde!");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.authors?.some((author) =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      category === "" || book.subjects?.some((subject) => subject === category);

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className={styles.loading}>Carregando livros...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.bookGrid}>
        {filteredBooks.map((book, index) => (
          <div key={index} className={styles.bookCard}>
            <div className={styles.imageContainer}>
              <img
                src={book.cover?.medium || book.cover?.small || ""}
                alt={book.title}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h2 className={styles.bookTitle}>{book.title}</h2>
              <p className={styles.author}>
                Autor: {book.authors?.map((author) => author.name).join(", ")}
              </p>
              <p className={styles.year}>
                Publicado: {book.publish_date || "Desconhecido"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;