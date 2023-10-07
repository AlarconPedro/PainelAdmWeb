import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from '../pages/Home/Home';
import Vendedores from '../pages/Vendedores/vendedores';
import Usuarios from '../pages/Usuarios/usuarios'
import Pessoas from '../pages/Pessoas/pessoas'
import Comunidade from '../pages/Comunidade/comunidade';

export default nav => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/quartos" element={<Vendedores />} />
            <Route path="/pessoas" element={<Pessoas />} />
            <Route path="/comunidade" element={<Comunidade />} />
            {localStorage.getItem("Admin") === "true" ?
                <Route path="/usuarios" element={<Usuarios />} />
                : null}
            <Route path="*" element={<Home />} />
        </Routes>
    );
}