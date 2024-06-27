/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

function RegistrationPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registrationHandler = async () => {
    const result = await axios.post(
      'http://localhost:3000/auth/registration',
      { username: userName, email, password },
      { withCredentials: true },
    );

    if (result.status === 200) {
      navigate('/');
    }
  };

  return (
    <div className="regWindow">
      <h1 className="regTitle">Регистрация</h1>
      <div className="inputBlockReg">
        <input className="regInput" placeholder="Введите ваше имя" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input className="regInput" placeholder="Введите E-mail" value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
        <input className="regInput" type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="buttonBlockReg">
        <button className="regBtn" onClick={registrationHandler}>Зарегистрировать</button>
        <button className="regBtn" onClick={() => navigate('/login')}>К авторизации</button>
      </div>
    </div>
  );
}

export default RegistrationPage;
