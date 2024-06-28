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
  const { refreshToken } = getAuthCookies();
  console.log(refreshToken);
  const [userState, setUserState] = useState({});
  const [descriptionState, setDescriptionState] = useState('');
  const [frazzleState, setFrazzleState] = useState('');
  const [rarityState, setRarityState] = useState('');
  const [priceState, setPriceState] = useState('');
  const [nameState, setNameState] = useState('');
  const [cardState, setCardState] = useState('');
  const [categoryState, setCategoryState] = useState('');
  const [artistState, setArtistState] = useState('');
  const [typeState, setTypeState] = useState('');
  const [imgState, setImgState] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState(null);
  const [reqBody, setReqBody] = useState({});

  const resetForm = () => {
    // setImgState('');
    setNameState('');
    setCardState('');
    setCategoryState('');
    setArtistState('');
    setTypeState('');
    setFrazzleState('');
    setRarityState('');
    setPriceState('');
    setDescriptionState('');
    setReqBody({});
  };

  const getUserData = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const { user } = decoded;
      setUserState({ ...userState, username: user.username, email: user.email, id: user.id });
    }
  };

  const options = ['Выберите потёртость', 'С завода', 'Закалённая в боях', 'Немного поношенная', 'Поношенная', 'После полевыех испытаний'];
  const optionsRare = ['Выберите редкость', 'Common', 'Uncommon', 'Rare', 'Mythical', 'Legendary'];

  useEffect(() => {
    getUserData(refreshToken);
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleClick = async () => {
    console.log(reqBody);
    console.log(userState);
    try {
      const result = await axios.post(
        `http://localhost:3000/api/router/posts:${userState.id}`,
        reqBody,
        { withCredentials: true }
      );
      resetForm();
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };
/* <img src={post.img ? post.img : "card.jpg"} /> */
  return (
    <div className="container1">
      
      <div className="leftSide">
        {<img src={imgState  ? imgState : "card.jpg"}/>}
      </div>
      <div className="rightSide">
        <h1 className="pageTitle">Добавить новую карту</h1>
        <input type="file" onChange={handleImageChange} />
        <input
          className="inputProfile"
          type="text"
          value={nameState}
          onChange={(e) => {
            setNameState(e.target.value)
            setReqBody({...reqBody, "name": e.target.value})
          }}
          placeholder="Название карточки"
        />
        <input
          className="inputProfile"
          type="text"
          value={cardState}
          onChange={(e) => {
            setCardState(e.target.value)
            setReqBody({...reqBody, "setName": e.target.value})
          }}
          placeholder="Название колоды"
        />
        <input
          className="inputProfile"
          type="text"
          value={categoryState}
          onChange={(e) => {
            setCategoryState(e.target.value)
            setReqBody({...reqBody, "category": e.target.value})
          }}
          placeholder="Введите категорию"
        />
        <input
          className="inputProfile"
          type="text"
          value={artistState}
          onChange={(e) => {
            setArtistState(e.target.value)
            setReqBody({...reqBody, "artist": e.target.value})
          }}
          placeholder="Введите владельца карты"
        />
        <input
          className="inputProfile"
          type="text"
          value={typeState}
          onChange={(e) => {
            setTypeState(e.target.value)
            setReqBody({...reqBody, "type": e.target.value})
          }}
          placeholder="Введите тип карты"
        />
        <CustomSelect 
          setReqBody={setReqBody}
          reqBody={reqBody}
          options={options}
          plsceholder='Выберите потёртость'
        />
        <CustomSelect 
          setReqBody={setReqBody}
          reqBody={reqBody}
          options={optionsRare}
          plsceholder='Выберите редкость'
        />
        <input
          className="inputProfile"
          type="text"
          value={priceState}
          onChange={(e) => {
            setPriceState(e.target.value)
            setReqBody({...reqBody, "price": e.target.value})
          }}
          placeholder="Стоимость"
        />
        <input
          className="inputProfile desc"
          type="text"
          value={descriptionState}
          onChange={(e) => {
            setDescriptionState(e.target.value)
            setReqBody({...reqBody, "description": e.target.value})
          }}
          placeholder="Введите описание карточки"
        />
        <input
          className="inputProfile"
          type="text"
          value={imgState}
          onChange={(e) => {
            setImgState(e.target.value)
            setReqBody({...reqBody, "img": e.target.value})
          }}
          placeholder="Загрузите картинку"
        />
        <button className="btnProfile" onClick={handleClick}>Выставить карточку на продажу</button>
      </div>
    </div>
  );
}

export default ProfilePage;
