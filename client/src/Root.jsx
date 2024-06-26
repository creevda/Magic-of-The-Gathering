import React from "react";
import Layout from "./components/Layout/Layout";
import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Layout />
      <Outlet />
    </>
  );
}
