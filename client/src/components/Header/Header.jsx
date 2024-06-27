/* eslint-disable react/button-has-type */
import React from 'react';
import './Header.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

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
    <div className="header">
      <div className="logo">Карточки, картишки, картюшечки</div>
      <nav className="header-nav">
        { pathname !== '/' && <button className="header-btn" onClick={() => navigate('/')}>Личный кабинет</button> }
        { pathname === '/' && <button className="header-btn" onClick={logout}>Выйти из учётной записи</button> }
      </nav>
    </div>
  );
}

export default Header;