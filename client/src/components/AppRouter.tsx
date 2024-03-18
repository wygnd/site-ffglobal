import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "@/components/Layout";
import AdminPage from "@/pages/adminPage/AdminPage";
import NotFound from "@/components/notFound/NotFound";
import MainPage from "@/pages/mainPage/MainPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="*" element={<NotFound/>}/>
        <Route path="" element={<MainPage/>}/>
        <Route path="admin" element={<AdminPage/>}/>
      </Route>
    </Routes>
  );
};

export default AppRouter;