import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from '../pages/Home/Home';
import Quartos from '../pages/Quartos/quartos';
import Eventos from '../pages/Eventos/eventos';
import Usuarios from '../pages/Usuarios/usuarios'
import Pessoas from '../pages/Pessoas/pessoas'
import Comunidade from '../pages/Comunidade/comunidade';

export default nav => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/quartos" element={<Quartos />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/pessoas" element={<Pessoas />} />
            <Route path="/comunidade" element={<Comunidade />} />
            {localStorage.getItem("Admin") === "true" ?
                <Route path="/usuarios" element={<Usuarios />} />
                : null}
            <Route path="*" element={<Home />} />
        </Routes>
    );
}