/* eslint-disable no-alert */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { getAuthCookies } from '../../utils/utility';
import './ProfilePage.css';
import CustomSelect from '../../components/Select/Select'

function ProfilePage() {
  const { accessToken } = getAuthCookies();
  const [userState, setUserState] = useState({});
  const [descriptionState, setDescriptionState] = useState('');
  const [frazzleState, setFrazzleState] = useState('');
  const [rarityState, setRarityState] = useState('');
  const [priceState, setPriceState] = useState('');
  const [nameState, setNameState] = useState('');
  const [image, setImage] = useState(null);

  const getUserData = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const { user } = decoded;
      setUserState({ ...userState, username: user.username, email: user.email });
    }
  };

  const options = ['Выберите потёртость', 'С завода', 'Закалённая в боях', 'Немного поношенная', 'Поношенная', 'После полевыех испытаний'];
  const optionsRare = ['Выберите редкость', 'Common', 'Uncommon', 'Rare', 'Mythical', 'Legendary'];

  useEffect(() => {
    getUserData(accessToken);
  }, [accessToken]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container1">
      <div className="leftSide"></div>
      <div className="rightSide">
        <h1 className="pageTitle">Ваша информация</h1>
        <input type="file" onChange={handleImageChange} />
        <input
          className="inputProfile"
          type="text"
          value={nameState}
          onChange={(e) => setNameState(e.target.value)}
          placeholder="Название карточки"
        />
        <CustomSelect 
          options={options}
          plsceholder='Выберите потёртость'
        />
        <CustomSelect 
          options={optionsRare}
          plsceholder='Выберите редкость'
        />
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
        <button className="btnProfile">Выставить карточку на продажу</button>
      </div>
    </div>
  );
}

export default ProfilePage;
