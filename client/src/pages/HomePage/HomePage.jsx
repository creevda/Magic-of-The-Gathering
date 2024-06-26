import React, { useEffect, useState } from "react";
import "../../components/SearchBar.css";
import { MDBContainer } from "mdb-react-ui-kit";
import styles from "./HomePage.module.css";
import axios from "axios";
import Cards from "../../components/Card";

export default function HomePage() {
  const [searchInput, setSearchInput] = useState("");
  const [cards, setCards] = useState({
    loading: true,
  });

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data } = await axios.get(
          `https://api.magicthegathering.io/v1/cards`
        );
        setCards(() => ({ data: data.cards, loading: false }));
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCards();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // searchHandle();
    }
  };
  return (
    <>
      <div className={styles.wrapper}>
        <MDBContainer className="py-5">
          <input
            type="text"
            className="search-hover"
            placeholder="Поиск..."
            style={{ color: "black" }}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            value={searchInput}
          />
        </MDBContainer>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "50px",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          {!cards.loading &&
            cards.data.map(
              (card, i) => i % 2 === 0 && <Cards key={card.id} card={card} />
            )}
        </div>
      </div>
    </>
  );
}
