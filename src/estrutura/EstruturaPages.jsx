import React from 'react';

import Nav from './Nav';
import NavRotas from '../routes/NavigationRoutes';
import Footer from './Footer';
import Logo from './Logo';

export default props =>
    <div className="app">
        <Logo />
        <Nav />
        <NavRotas />
        <Footer />
    </div>
