/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [stateLogin, setStateLogin] = useState('');
  const [statePassword, setStatePassword] = useState('');

  const loginHandler = async () => {
    const result = await axios.post(
      'http://localhost:3000/auth/login',
      {
        email: stateLogin,
        password: statePassword,
      },
      { withCredentials: true },
    );

    if (result.status === 200) {
      navigate('/');
    }
  };
  return (
    <div className="logWindow">
      <h1 className="logTitle">Авторизация</h1>
      <div className="inputBlockLog">
        <input
          className="inputLog"
          value={stateLogin}
          onChange={(e) => setStateLogin(e.target.value)}
          placeholder="Введите ваш email"
        />
        <input
          className="inputLog"
          type="password"
          value={statePassword}
          onChange={(e) => setStatePassword(e.target.value)}
          placeholder="Введите пароль"
        />
      </div>
      <div className="buttonBlockLog">
        <button className="logBtn" onClick={loginHandler}>Выполнить вход</button>
        <button className="logBtn" onClick={() => navigate('/registration')}>К регистрации</button>
      </div>
    </div>
  );
}

export default LoginPage;
