import React from "react";

import { FaBeer } from 'react-icons/fa';
import {
    BsMegaphoneFill,
    BsFillBellFill,
    BsFillBookmarkFill,
    BsAwardFill,
    BsFillTrophyFill,
    BsFillCalendarFill,
    BsFillPeopleFill
} from "react-icons/bs";

import "./css/Nav.css"

import { Link } from "react-router-dom";

export default props => {
    return (
        <aside className="menu-lateral">
            {localStorage.getItem("Admin") === "true" ?
                <nav className="menu">
                    <Link to={"/home"}>
                        <i className="fa fa-home"></i> Início
                    </Link>
                    <Link to={"/quartos"}>
                        <i><BsFillPeopleFill /></i> Quartos
                    </Link>
                    <Link to={"/usuarios"}>
                        <i><BsFillPeopleFill /></i> Usuarios
                    </Link>
                </nav>
                :
                <nav className="menu">
                    <Link to={"/home"}>
                        <i className="fa fa-home"></i> Início
                    </Link>
                    <Link to={"/quartos"}>
                        <i><BsFillPeopleFill /></i> Quartos
                    </Link> : null
                    {/* <div>
                    <p>
                        <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Cadastros
                            <i className="dropdownIcon">
                                <i className="fa fa-caret-down"></i>
                            </i>
                        </a>
                    </p>
                </div>
                <div className="collapse" id="collapseExample"> */}

                    {/* </div> */}
                </nav>

            }
        </aside>
    )
};