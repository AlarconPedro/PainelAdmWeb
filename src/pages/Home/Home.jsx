import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./Home.css";
import Mestre from "../../estrutura/Mestre";

import Session from "../../routes/Session";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.verificaLogin();
    }

    componentDidUpdate() {
    }

    verificaLogin() {
        if (localStorage.length === 0 && localStorage.getItem("logado") === "false") {
            return Session({ isLogged: false, isIdle: true });
        } else {
            window.history.pushState(null, '', window.location.href);
        }
    }

    render() {
        return (
            <React.Fragment>
                <Mestre icon="home" title="Dashboard" subtitle="Omega Agenda Comercial">
                    <div className="row">
                        <div className="col-12">
                            <div className="jumbotron">
                                <h1 className="display-3">Bem vindo!</h1>
                                <p className="lead">Este é o seu painel de controle.</p>
                                <hr className="my-4" />
                                <div className="row home">
                                    <div className="column">
                                        <p className="lead">
                                            <Link to={"/vendedores"}>
                                                <a className="btn btn-primary btn-lg" href="" role="button">
                                                    <i className="fa fa-users"></i> Gerenciar Vendedores
                                                </a>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Mestre>
            </React.Fragment>
        );
    }
}

export default Home;