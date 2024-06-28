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
      console.log(`http://localhost:3000/cards/${cardId}/buy`);
      console.log(cart);
      await axios.put(`http://localhost:3000/cards/${cardId}/buy`, { name: cart[0].name });

// тут отправка на почту 
      await axios.post('http://localhost:3000/send-email', {
        subject: 'Покупка карты',
        text: `Вы успешно приобрели карту с ID: ${cardId}.`,
        recipient: '@mail', // почта пользователя
      });
      removeFromCart(cardId); 
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

        <MDBContainer className="py-5">
          <button onClick={() => setIsCartVisible(!isCartVisible)}>
            {isCartVisible ? "Скрыть корзину" : "Показать корзину"}
          </button>
          {isCartVisible && (
            <div className={styles.cartContainer}>
              <h2>Корзина</h2>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={styles.cartItemImage}
                  />
                  <div className={styles.cartItemDetails}>
                    <span>{item.name}</span>
                    <p>{item.type}</p>
                    <button onClick={() => removeFromCart(item.id)}>
                      Убрать
                    </button>
                    <button onClick={() => buyCard(item.id)}>Купить</button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
