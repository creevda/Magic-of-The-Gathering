/* eslint-disable react/button-has-type */
import React from "react";
import "./Header.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Header({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = async () => {
    const result = await axios.get("http://localhost:3000/auth/logout", {
      withCredentials: true,
    });
    if (result.status === 200) {
      navigate("/login");
    }
  };

  return (
    <div className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="logo" onClick={() => navigate("/")}>Magic: The Gathering.</div>
      <div className="userLogo">
        <div id="first">{user ? user.username : "гость"}</div>
        <div>{user ? user.city : "Москва"}</div>
      </div>

      <nav className="header-nav">
        {/* // { pathname === '/' && <button className="header-btn" onClick={() => navigate('/basket')}>Корзина</button> }
       // { pathname === '/' && <button className="header-btn" onClick={() => navigate('/profile')}>Личный кабинет</button> }
       // { pathname === '/profile' && <button className="header-btn" onClick={()=>navigate('/')}>Главная страница</button> }
       // { pathname === '/profile' && <button className="header-btn" onClick={logout}>Выйти из учётной записи</button> } */}


      { pathname === '/' && <button className="header-btn" onClick={() => navigate('/profile')}>Личный кабинет</button> }
      { pathname === '/profile' && <button className="header-btn" onClick={()=>navigate('/')}>Главная страница</button> }
        <button className="header-btn" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>


        {/* <button className="header-btn" onClick={() => navigate("/profile")}>
          Личный кабинет
        </button>
        <button className="header-btn" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button> */}
      </nav>
      {menuOpen && (
        <div className="menu">
          <ul>
            <li>
              <button onClick={() => navigate("/link1")}>Корзина</button>
            </li>
            <li>
              <button onClick={() => navigate("/link2")}>Пополнить</button>
            </li>
            <li>
              <button onClick={logout}>Выйти</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
