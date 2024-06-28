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
  const [isCartVisible, setIsCartVisible] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data } = await axios.get('https://api.magicthegathering.io/v1/cards');
        setCards(() => ({ data: data.cards, loading: false }));
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCards();
  }, []);


  const addToCart = (card) => {
    setCart([...cart, card]);
  };
  const buyCard = async (cardId) => {
    try {
      await axios.put(`http://localhost:3000/cards/${cardId}/buy`,{name:cart[0].name,});
      removeFromCart(cardId); // Удаляем карту из корзины после покупки
    } catch (error) {
      console.error("Ошибка при покупке карты:", error);
    }
  };
  const removeFromCart = (cardId) => {
    setCart(cart.filter(item => item.id !== cardId));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <MDBContainer className="py-5">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <input
              type="text"
              className="search-hover"
              placeholder="Поиск..."
              style={{ color: "black" }}
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            /><SideBarZ cards={cards.data} setCards={setCards}/>
        </MDBContainer>
        <MDBContainer className="py-5">
            <button onClick={() => setIsCartVisible(!isCartVisible)}>
              {isCartVisible ? "Скрыть корзину" : "Показать корзину"}
            </button>
            {isCartVisible && (
              <div className={styles.cartContainer}>
                <h2>Корзина</h2>
                {cart.map(item => (
                  <div key={item.id} className={styles.cartItem}>
                    <img src={item.imageUrl} alt={item.name} className={styles.cartItemImage} />
                    <div className={styles.cartItemDetails}>
                      <span>{item.name}</span>
                      <p>{item.type}</p>
                      <button onClick={() => removeFromCart(item.id)}>Убрать</button>
                      <button onClick={() => buyCard(item.id)}>Купить</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
              (card, i) => i % 2 === 0 && <Cards key={card.id} card={card} addToCart={addToCart} user={user}/>
            )}
        </div>
      </div>
    </>
  );
}