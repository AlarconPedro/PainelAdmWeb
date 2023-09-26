import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from '../pages/Login/login';
import Principal from '../estrutura/EstruturaPages';

export default Rotas => {
    if (localStorage.length > 0 && localStorage.getItem("logado") === "true") {
        if (window.location.pathname === "/login") {
            window.location.replace("/home");
        }
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="*" element={<Principal />} />
                <Route path="/*" element={<Principal />} />
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};