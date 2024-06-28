import React, { useEffect, useState } from "react";
import "../../components/SearchBar.css";
import { MDBContainer } from "mdb-react-ui-kit";
import styles from "./HomePage.module.css";
import axios from "axios";
import Cards from "../../components/Card";
import SideBarZ from "../../components/SideBarZ.jsx";

export default function HomePage({ user }) {
  const [searchInput, setSearchInput] = useState("");
  const [cards, setCards] = useState({
    loading: true,
  });
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const fetchCards = async (query = "") => {
    try {
      const { data } = await axios.get(
        `https://api.magicthegathering.io/v1/cards`
      );
      const filteredCards = data.cards.filter(card =>
        card.name.toLowerCase().includes(query.toLowerCase()) ||
        card.type.toLowerCase().includes(query.toLowerCase()) ||
        card.artist.toLowerCase().includes(query.toLowerCase()) ||
        card.setName.toLowerCase().includes(query.toLowerCase()) ||
        card.rarity.toLowerCase().includes(query.toLowerCase())
      );
      setCards({ data: filteredCards, loading: false });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCards(searchInput);
  }, [searchInput]);

  const addToCart = (card) => {
    setCart([...cart, card]);
  };
  const buyCard = async (cardId) => {
    try {
      await axios.put(`http://localhost:3000/cards/${cardId}/buy`, {
        name: cart[0].name,
      });
      removeFromCart(cardId); // Удаляем карту из корзины после покупки
    } catch (error) {
      console.error("Ошибка при покупке карты:", error);
    }
  };
  const removeFromCart = (cardId) => {
    setCart(cart.filter((item) => item.id !== cardId));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <MDBContainer className="py-5">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
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
          <SideBarZ cards={cards.data} setCards={setCards} fetchCards={fetchCards} searchInput={searchInput}/>
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
