import React, { useEffect, useState } from "react";
import "../../components/SearchBar.css";
import { MDBContainer } from "mdb-react-ui-kit";
import styles from "./HomePage.module.css";
import axios from "axios";
import Cards from "../../components/Card";
import SideBarZ from "../../components/SideBarZ.jsx";

export default function HomePage({ user,cart , setCart }) {
  const [searchInput, setSearchInput] = useState("");
  const [cards, setCards] = useState({
    loading: true,
  });
  const [filtersVisible, setFiltersVisible] = useState(false);
  const addToCart = (card) => {
    setCart([...cart, card]);
  };
  

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data } = await axios.get(
          "https://api.magicthegathering.io/v1/cards"
        );
        setCards(() => ({ data: data.cards, loading: false }));
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCards();
  }, []);



  return (
    <>
     
      <div className={styles.wrapper}>
        <MDBContainer className="py-5">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            
          >
            <input
              type="text"
              className="search-hover"
              placeholder="Поиск..."
              style={{ color: "black" }}
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
          </div>
        </MDBContainer>
        <SideBarZ cards={cards.data} setCards={setCards} />
        
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
              (card, i) =>
                i % 2 === 0 && (
                  <Cards
                    key={card.id}
                    card={card}
                    addToCart={addToCart}
                    user={user}
                  />
                )
            )}
        </div>
      </div>
    </>
  );
}
