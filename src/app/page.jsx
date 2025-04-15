"use client";

import { useState } from "react";
import BookList from "@/components/bookList";
import styles from "./page.module.css";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a pesquisa

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Biblioteca Online</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Pesquise por título ou autor..."
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </header>

      <main className={styles.main}>
        <BookList searchQuery={searchQuery} />
      </main>

      <footer className={styles.footer}>
        <p>Desenvolvido durante o curso de Desenvolvimento de Sistemas</p>
      </footer>
    </div>
  );
}