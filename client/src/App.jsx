/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import HomePage from "./pages/HomePage/HomePage";
import axios from "axios";
import { useEffect, useState } from "react";
import Root from "./Root";
import axiosInstance from "./axiosInstance";
import {setAccessToken} from "./axiosInstance";
function App() {
  const [user, setUser] = useState();
  

  useEffect(() => {
    axiosInstance(`http://localhost:3000/tokens/refresh`).then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    });
  }, []);
  const handleBuy = (id) => {

    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage setUser={setUser} />,
    },
    {
      path: "/registration",
      element: <RegistrationPage setUser={setUser} />,
    },
    {
      path: "/",
      element: <Root user={user}/>,
      children: [
        {
          path: "/home",
          element: <HomePage user={user} />,
        },
        {
          path: "/profile",
          element: <ProfilePage user={user} setUser={setUser} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
