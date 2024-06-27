import React from "react";
import Layout from "./components/Layout/Layout";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";

export default function Root() {
  return (
    <>
      <Header />
      {/* <Layout /> */}
      <Outlet />
    </>
  );
}
