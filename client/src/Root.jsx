import React from "react";
import Layout from "./components/Layout/Layout";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";

export default function Root({user,setIsCartVisible,isCartVisible,cart,setCart }) {
  return (
    <>
      <Header user={user} setIsCartVisible={setIsCartVisible} isCartVisible={isCartVisible} cart={cart} setCart={setCart}/>
      {/* <Layout /> */}
      <Outlet />
    </>
  );
}
