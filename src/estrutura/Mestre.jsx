import React, { useEffect } from 'react';

import "./css/Mestre.css"

import Header from "./Header";
import useIdle from '../hooks/useIdle';

import Session from '../routes/Session';

export default props => {

    const logout = () => {
        localStorage.clear();
        window.location.replace("/login");
    }

    const { isIdle } = useIdle({
        onIdle: logout,
        idleTime: 5,
    });

    useEffect(() => {
        verificaLogin();
    }, []);

    window.addEventListener('popstate', function () {
        this.window.history.pushState(null, '', window.location.href);
    });

    const verificaLogin = () => {
        if (localStorage.length === 0 && localStorage.getItem("logado") === "false") {
            return Session({ isLogged: false, isIdle: true });
        }
    }

    if (!isIdle && localStorage.length > 0) {
        localStorage.setItem("logado", true);
        return (
            <React.Fragment>
                <Header {...props} />
                <main className="content container-fluid">
                    <div className="p-3 mt-3">
                        {props.children}
                    </div>
                </main>
            </React.Fragment>
        );
    } else {
        localStorage.setItem("logado", false);
        logout();
    }
}