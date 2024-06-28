/* eslint-disable react/button-has-type */
import React from 'react';
import './Header.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "../../pages/HomePage/HomePage.module.css";

function Header({user, isCartVisible, setIsCartVisible,cart,setCart}) {
  
  console.log(user)
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
  const logout = async () => {
    const result = await axios.get(
      'http://localhost:3000/auth/logout',
      { withCredentials: true },
    );
    if (result.status === 200) {
      navigate('/login');
    }
  };

  return (
    <>
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
            </div> )}
    <div className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="logo">Magic: The Gathering.</div>
      <div className="userLogo">
        <div id='first'>{ (user? user.username : 'гость')}</div>
        <div >Москва </div>
      </div>
     
      <nav className="header-nav">
         <button className="header-btn" onClick={() => navigate('/')}>Личный кабинет</button> 
        <button className="header-btn" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </nav>
      {menuOpen && (
        <div className="menu">
          <ul>
            <li>
              <button onClick={() => setIsCartVisible(!isCartVisible)}>Корзина</button>
            </li>
            <li>
              <button onClick={() => navigate('/link2')}>Пополнить</button>
            </li>
            <li>
              <button onClick={logout}>Выйти</button>
            </li>
          </ul>
        </div>
      )}
    </div>
    </>
  );
}

export default Header;