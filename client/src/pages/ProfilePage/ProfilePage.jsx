/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getAuthCookies } from '../../utils/utility';
import './ProfilePage.css';

function ProfilePage() {
  const { accessToken } = getAuthCookies();
  const [userState, setUserState] = useState({});
  const [descriptionState, setDescriptionState] = useState('');
  const [frazzleState, setFrazzleState] = useState('');
  const [rarityState, setRarityState] = useState('');
  const [priceState, setPriceState] = useState('');
  const getUserData = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const { user } = decoded;
      setUserState({ ...userState, username: user.username, email: user.email });
    }
  };

  useEffect(() => {
    getUserData(accessToken);
  }, [accessToken]);

  return (
    <div className="container">
      <div className="leftSide"></div>
      <div className="rightSide">
        <h1 className="pageTitle">Ваша информация</h1>
        <button className="btnProfile">Загрузи картинку</button>
        <select
          className="selectProfile"
          value={frazzleState}
          onChange={(e) => setFrazzleState(e.target.value)}
        >
          <option value="">Выберите потёртость</option>
          <option value="New">С завода</option>
          <option value="PreNew">Вид новой</option>
          <option value="Normis">Немного затёрта</option>
          <option value="Bad">Средне испорчена</option>
          <option value="VeryBad">Уберите эту штуку от моего лица</option>
        </select>
        <select
          className="selectProfile"
          value={rarityState}
          onChange={(e) => setRarityState(e.target.value)}
        >
          <option value="">Выберите редкость</option>
          <option value="Common">Common</option>
          <option value="Uncommon">Uncommon</option>
          <option value="Rare">Rare</option>
          <option value="Mythical">Mythical</option>
          <option value="Legendary">Legendary</option>
        </select>
        <input
          className="inputProfile"
          type="text"
          value={priceState}
          onChange={(e) => setPriceState(e.target.value)}
          placeholder="Стоимость"
        />
        <input
          className="inputProfile desc"
          type="text"
          value={descriptionState}
          onChange={(e) => setDescriptionState(e.target.value)}
          placeholder="Введите описание карточки"
        />
      </div>
    </div>
  );
}

export default ProfilePage;
