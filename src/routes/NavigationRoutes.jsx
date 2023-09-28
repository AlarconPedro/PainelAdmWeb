import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from '../pages/Home/Home';
import Vendedores from '../pages/Vendedores/vendedores';
import Usuarios from '../pages/Usuarios/usuarios'

export default nav => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/quartos" element={<Vendedores />} />
            {localStorage.getItem("Admin") === "true" ?
                <Route path="/usuarios" element={<Usuarios />} />
                : null}
            <Route path="*" element={<Home />} />
        </Routes>
    );
}