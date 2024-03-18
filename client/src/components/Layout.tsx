import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "@/components/header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet/>
      <hr/>
      <footer>Sup, this footer</footer>
    </>
  );
};

export default Layout;