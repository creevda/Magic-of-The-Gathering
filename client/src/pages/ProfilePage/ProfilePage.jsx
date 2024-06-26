import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getAuthCookies } from '../../utils/utility.js';
import './ProfilePage.css';

function ProfilePage() {
  const { accessToken } = getAuthCookies();
  const [userState, setUserState] = useState({});
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
    <div className="pageWindow">
      <img className="foto2" src="../../../img/1.png" alt="foto" />
      <h1 className="pageTitle">Ваша информация</h1>
      <p className="userTitle">{`Привет, ${userState.username} !`}</p>
      <p className="userTitle">{`Твой Email: ${userState.email}`}</p>
    </div>
  );
}

export default ProfilePage;
