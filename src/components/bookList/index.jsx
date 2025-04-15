"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./bookList.module.css";

const BookList = ({ searchQuery }) => {
  const url = "https://openlibrary.org/api/books";
  const isbnList = ["0451526538", "9780140449136", "9780140449266"]; // Exemplos de ISBNs

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Livros adicionados manualmente
  const manualBooks = [
    {
      title: "O Pequeno Príncipe",
      authors: [{ name: "Antoine de Saint-Exupéry" }],
      publish_date: "1943",
      cover: { medium: "https://via.placeholder.com/150" },
    },
    {
      title: "Dom Casmurro",
      authors: [{ name: "Machado de Assis" }],
      publish_date: "1899",
      cover: { medium: "https://via.placeholder.com/150" },
    },
    {
      title: "1984",
      authors: [{ name: "George Orwell" }],
      publish_date: "1949",
      cover: { medium: "https://via.placeholder.com/150" },
    },
    {
      title: "Memórias Póstumas de Brás Cubas",
      authors: [{ name: "Machado de Assis" }],
      publish_date: "1881",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas.jpg/800px-Mem%C3%B3rias_P%C3%B3stumas_de_Br%C3%A1s_Cubas.jpg",
      },
    },
    {
      title: "Vidas Secas",
      authors: [{ name: "Graciliano Ramos" }],
      publish_date: "1938",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/pt/0/0f/Vidas_Secas.jpg",
      },
    },
    {
      title: "Grande Sertão: Veredas",
      authors: [{ name: "João Guimarães Rosa" }],
      publish_date: "1956",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/pt/1/1c/Grande_Sert%C3%A3o_Veredas.jpg",
      },
    },
    {
      title: "Macunaíma",
      authors: [{ name: "Mário de Andrade" }],
      publish_date: "1928",
      cover: {
        medium: "https://upload.wikimedia.org/wikipedia/pt/3/3f/Macunaima.jpg",
      },
    },
    {
      title: "Iracema",
      authors: [{ name: "José de Alencar" }],
      publish_date: "1865",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Iracema.jpg/800px-Iracema.jpg",
      },
    },
    {
      title: "O Cortiço",
      authors: [{ name: "Aluísio Azevedo" }],
      publish_date: "1890",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/O_Corti%C3%A7o.jpg/800px-O_Corti%C3%A7o.jpg",
      },
    },
    {
      title: "A Moreninha",
      authors: [{ name: "Joaquim Manuel de Macedo" }],
      publish_date: "1844",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/A_Moreninha.jpg/800px-A_Moreninha.jpg",
      },
    },
    {
      title: "A Escrava Isaura",
      authors: [{ name: "Bernardo Guimarães" }],
      publish_date: "1875",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/A_Escrava_Isaura.jpg/800px-A_Escrava_Isaura.jpg",
      },
    },
    {
      title: "Triste Fim de Policarpo Quaresma",
      authors: [{ name: "Lima Barreto" }],
      publish_date: "1915",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Triste_Fim_de_Policarpo_Quaresma.jpg/800px-Triste_Fim_de_Policarpo_Quaresma.jpg",
      },
    },
    {
      title: "Quarto de Despejo",
      authors: [{ name: "Carolina Maria de Jesus" }],
      publish_date: "1960",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Quarto_de_Despejo.jpg/800px-Quarto_de_Despejo.jpg",
      },
    },
    {
      title: "A Hora da Estrela",
      authors: [{ name: "Clarice Lispector" }],
      publish_date: "1977",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/A_Hora_da_Estrela.jpg/800px-A_Hora_da_Estrela.jpg",
      },
    },
    {
      title: "O Tempo e o Vento",
      authors: [{ name: "Erico Verissimo" }],
      publish_date: "1949",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/O_Tempo_e_o_Vento.jpg/800px-O_Tempo_e_o_Vento.jpg",
      },
    },
    {
      title: "Os Sertões",
      authors: [{ name: "Euclides da Cunha" }],
      publish_date: "1902",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Os_Sert%C3%B5es.jpg/800px-Os_Sert%C3%B5es.jpg",
      },
    },
    {
      title: "Marília de Dirceu",
      authors: [{ name: "Tomás Antônio Gonzaga" }],
      publish_date: "1792",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Mar%C3%ADlia_de_Dirceu.jpg/800px-Mar%C3%ADlia_de_Dirceu.jpg",
      },
    },
    {
      title: "Noite na Taverna",
      authors: [{ name: "Álvares de Azevedo" }],
      publish_date: "1855",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Noite_na_Taverna.jpg/800px-Noite_na_Taverna.jpg",
      },
    },
    {
      title: "Poema Sujo",
      authors: [{ name: "Ferreira Gullar" }],
      publish_date: "1976",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Poema_Sujo.jpg/800px-Poema_Sujo.jpg",
      },
    },
    {
      title: "Os Miseráveis",
      authors: [{ name: "Victor Hugo" }],
      publish_date: "1862",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/7/7d/Les_Mis%C3%A9rables_1st_Edition_1862.jpg",
      },
    },
    {
      title: "O Processo",
      authors: [{ name: "Franz Kafka" }],
      publish_date: "1925",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/4/4f/Franz_Kafka_Der_Prozess_1925.jpg",
      },
    },
    {
      title: "Decamerão",
      authors: [{ name: "Giovanni Boccaccio" }],
      publish_date: "1353",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/0/0d/Decameron_Boccaccio.jpg",
      },
    },
    {
      title: "Os Lusíadas",
      authors: [{ name: "Luís de Camões" }],
      publish_date: "1572",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/0/0c/Os_Lusiadas_1572.jpg",
      },
    },
    {
      title: "O Nome da Rosa",
      authors: [{ name: "Umberto Eco" }],
      publish_date: "1980",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/en/7/7b/Name_of_the_rose.jpg",
      },
    },
    {
      title: "Frankenstein",
      authors: [{ name: "Mary Shelley" }],
      publish_date: "1818",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/3/35/Frankenstein_1818_edition_title_page.jpg",
      },
    },
    {
      title: "A Volta ao Mundo em 80 Dias",
      authors: [{ name: "Júlio Verne" }],
      publish_date: "1873",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/2/2e/Around_the_World_in_Eighty_Days_cover.jpg",
      },
    },
    {
      title: "O Estrangeiro",
      authors: [{ name: "Albert Camus" }],
      publish_date: "1942",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/en/8/8f/L%E2%80%99%C3%89tranger_%28Camus_novel%29.jpg",
      },
    },
    {
      title: "Em Busca do Tempo Perdido",
      authors: [{ name: "Marcel Proust" }],
      publish_date: "1913",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/4/4e/Marcel_Proust_-_A_la_recherche_du_temps_perdu.jpg",
      },
    },
    {
      title: "O Sol é para Todos",
      authors: [{ name: "Harper Lee" }],
      publish_date: "1960",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/en/7/79/To_Kill_a_Mockingbird.JPG",
      },
    },
    {
      title: "O Grande Gatsby",
      authors: [{ name: "F. Scott Fitzgerald" }],
      publish_date: "1925",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/a/a0/The_Great_Gatsby_cover_1925_%281%29.jpg",
      },
    },
    {
      title: "O Apanhador no Campo de Centeio",
      authors: [{ name: "J.D. Salinger" }],
      publish_date: "1951",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/en/3/32/Rye_catcher.jpg",
      },
    },
    {
      title: "Jane Eyre",
      authors: [{ name: "Charlotte Brontë" }],
      publish_date: "1847",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/3/3d/Jane_Eyre_title_page.jpg",
      },
    },
    {
      title: "O Morro dos Ventos Uivantes",
      authors: [{ name: "Emily Brontë" }],
      publish_date: "1847",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/0/0b/Wuthering_Heights_1847.jpg",
      },
    },
    {
      title: "Orgulho e Preconceito",
      authors: [{ name: "Jane Austen" }],
      publish_date: "1813",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/commons/1/1e/PrideAndPrejudiceTitlePage.jpg",
      },
    },
    {
      title: "A Revolução dos Bichos",
      authors: [{ name: "George Orwell" }],
      publish_date: "1945",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/en/f/fb/Animal_Farm_-_1st_edition.jpg",
      },
    },
    {
      title: "Admirável Mundo Novo",
      authors: [{ name: "Aldous Huxley" }],
      publish_date: "1932",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg",
      },
    },
    {
      title: "O Senhor dos Anéis",
      authors: [{ name: "J.R.R. Tolkien" }],
      publish_date: "1954",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/en/8/8e/The_Lord_of_the_Rings_cover.gif",
      },
    },
    {
      title: "O Hobbit",
      authors: [{ name: "J.R.R. Tolkien" }],
      publish_date: "1937",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg",
      },
    },
    {
      title: "O Código Da Vinci",
      authors: [{ name: "Dan Brown" }],
      publish_date: "2003",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/en/6/6b/DaVinciCode.jpg",
      },
    },
    {
      title: "O Alquimista",
      authors: [{ name: "Paulo Coelho" }],
      publish_date: "1988",
      cover: {
        medium:
          "https://upload.wikimedia.org/wikipedia/en/c/c4/TheAlchemist.jpg",
      },
    },
  ];

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

        const apiBooks = Object.values(response.data).map((book) => ({
          title: book.title || "Título Desconhecido",
          authors: book.authors || [{ name: "Autor Desconhecido" }],
          publish_date: book.publish_date || "Data Desconhecida",
          cover: book.cover || { medium: "https://via.placeholder.com/150" },
        }));

        setBooks([...manualBooks, ...apiBooks]); // Combina livros manuais com os da API
        setLoading(false);
      } catch (error) {
        console.log("Erro ao buscar livros na API:", error);
        setError(
          "Não foi possível carregar os livros. Tente novamente mais tarde!"
        );
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    return (
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.authors?.some((author) =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
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
              <button className={styles.detailsButton}>Ver Detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
