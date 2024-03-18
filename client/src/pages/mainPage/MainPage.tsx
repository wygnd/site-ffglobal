import React from 'react';
import {Outlet} from "react-router-dom";
import {useCounter} from "@/store/counterStore";

const MainPage = () => {

  const {count, inc} = useCounter()

  return (
    <main>
      <h1>Hello, world</h1>
      <span>{count}</span>
      <button onClick={inc}>one up</button>
      <Outlet/>
    </main>
  );
};

export default MainPage;