import React from "react";
import "./css/Header.css"

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';

export default props => {
    const options = [
        '','sair'
    ];
    const defaultOption = options[0];

    const onSelect = (option) => {
        console.log(option);
    };

    return (
        <header className="header d-none d-sm-flex flex-lg-row">
            <div className="flex-column">
                <h1 className="mt-3">
                    <i className={`fa fa-${props.icon}`}></i> {props.title}
                </h1>
                <p className="lead text-muted">{props.subtitle}</p>
            </div>
            <div className="usuario">
                <div className="areaUsuario" role="button" data-toggle="dropdown" aria-expanded="false">
                    <img src={localStorage.getItem("Imagem")} alt="icone" />
                    <div className="usuarioLogado">
                        <h6>{localStorage.getItem("Nome")}</h6>
                    </div>
                </div>
            </div>
            {/* <div className="usuario">
                <div className="areaUsuario" role="button" data-toggle="dropdown" aria-expanded="false">
                    <img src={localStorage.getItem("Imagem")} alt="icone" />
                    <div className="usuarioLogado">
                        <h6>{localStorage.getItem("Nome")}</h6>
                    </div>
                    <Dropdown options={options} onChange={onSelect} value={defaultOption} placeholder="Select an option"></Dropdown>
                </div>
            </div> */}
        </header>
    );
}