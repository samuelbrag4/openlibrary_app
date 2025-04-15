"use client";

import { useState } from "react";
import BookList from "@/components/bookList";
import styles from "./page.module.css";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a pesquisa
  const [category, setCategory] = useState(""); // Estado para a categoria

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
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
          <select
            value={category}
            onChange={handleCategoryChange}
            className={styles.categorySelect}
          >
            <option value="">Todas as Categorias</option>
            <option value="Ficção">Ficção</option>
            <option value="História">História</option>
            <option value="Ciência">Ciência</option>
          </select>
        </div>
      </header>

      <main className={styles.main}>
        <BookList searchQuery={searchQuery} category={category} />
      </main>

      <footer className={styles.footer}>
        <p>Desenvolvido durante o curso de Desenvolvimento de Sistemas</p>
      </footer>
    </div>
  );
}