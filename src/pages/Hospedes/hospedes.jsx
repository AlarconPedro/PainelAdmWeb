import React, { useState, useEffect } from 'react';
import { apiHospedes } from '../../services/Api';
import { useLocation } from 'react-router-dom';

import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"
// import { Form, Button, Table, Modal, Spinner } from 'react-bootstrap';

function Hospedes() {
    const location = useLocation();
    const evento = location.state.from;

    const [hospedesData, setHospedesData] = useState([]);

    const [carregando, setCarregando] = useState(false);
    const [abrirCadastro, setAbrirCadastro] = useState(false);
    const [pagante, setPagante] = useState(false);
    const [cobrante, setCobrante] = useState(false);

    const [nome, setNome] = useState('');
    const [comunidade, setComunidade] = useState('');

    const getHospedes = async () => {
        setCarregando(true);
        let retorno = await apiHospedes.getHospedes(evento);
        if (retorno !== null) {
            setHospedesData(retorno);
        }
        setCarregando(false);
    }

    const abrirFecharCadastro = () => {
        setAbrirCadastro(!abrirCadastro);
    }

    const handleCheck = (event) => {
        if (event.target.name === "pesCatequista")
            setPagante(event.target.checked);
        else if (event.target.name === "pesSalmista")
            setCobrante(event.target.checked);
    }

    const handleNome = (event) => {
        setNome(event.target.value);
    }

    const handleComunidade = (event) => {
        setComunidade(event.target.value);
    }

    useEffect(() => {
        getHospedes();
    }, []);

    return (
        <React.Fragment>
            <FormModel
                titulo="Listagem de Hóspedes"
                subtitulo="CCMZ"
                icone="user"
                tipoContainer="form-container"
                Cabecalho="Hóspedes"
                BotaoAdd="Adicionar Hóspede"
                getDados={getHospedes}
                getByNome={getHospedes}
                funcAbrirCadastro={abrirFecharCadastro}
                carregando={carregando}
                colunas={[
                    { nome: "Nome" },
                    { nome: "Comunidade" },
                    { nome: "Pagante" },
                    { nome: "Cobrante" },
                ]}
            >
                <tbody>
                    {hospedesData.map((hospede) => (
                        <tr key={hospede.pesCodigo}>
                            <td className="pt-3">{hospede.pesNome}</td>
                            <td className="pt-3">{hospede.comunidade}</td>
                            <td className="pt-3">
                                <input className="form-check-input" type="checkbox" id="pagante" value="pagante" checked={hospede.pagante} />
                            </td>
                            <td className="pt-3">
                                <input className="form-check-input" type="checkbox" id="cobrante" value="cobrante" checked={hospede.cobrante} />
                            </td>
                            <td>
                                <button className="btn btn-warning" onClick={() => this.selecionarEvento(hospede, "Editar")}>
                                    <i className="fa fa-pencil"></i>
                                </button>{" "}
                                <button className="btn btn-danger" onClick={() => this.selecionarEvento(hospede, "Excluir")}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </FormModel>
        </React.Fragment>
    );
}

export default Hospedes;


// import React from 'react';

// import FormModel from "../../forms/Modelo"
// import FormInserir from "../../forms/FormInserir"
// import FormEditar from "../../forms/FormEditar"
// import FormExcluir from "../../forms/FormExcluir"

// import { apiHospedes } from "../../services/Api";
// import { useLocation } from 'react-router-dom'

// class Hospedes extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             hospedesData: [],
//             carregando: false,
//             abrirCadastro: false,
//         };
//     }

//     getHospedes = async () => {
//         this.setState({ carregando: true });
//         let retorno = await apiHospedes.getHospedes(this.props.evento);
//         if (retorno.statusCode === 200)
//             this.setState({ hospedesData: retorno.data, carregando: false });
//         else
//             this.setState({ carregando: false });
//     }

//     // getEventoCodigo = async () => {
//     //     function useQuery() {
//     //         const location = useLocation()
//     //         const { from } = location.state
//     //         return from;
//     //     }

//     //     return useQuery();
//     // }

//     abrirFecharCadastro = () => {
//         this.setState({ abrirCadastro: !this.state.abrirCadastro });
//     }

//     componentDidMount() {
//         this.setState({ carregando: true });
//         this.getHospedes();
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 <FormModel
//                     titulo="Listagem de Hóspedes"
//                     subtitulo="CCMZ"
//                     icone="user"
//                     tipoContainer="form-container"
//                     Cabecalho="Hóspedes"
//                     BotaoAdd="Adicionar Hóspede"
//                     getDados={this.getEventos}
//                     getByNome={this.getVendedorNome}
//                     funcAbrirCadastro={this.abrirFecharCadastro}
//                     carregando={this.state.carregando}
//                     colunas={[
//                         { nome: "Nome" },
//                         { nome: "Comunidade" },
//                         { nome: "Pagante" },
//                         { nome: "Cobrante" },
//                     ]}
//                 >
//                     <tbody>
//                         {this.state.hospedesData.map((hospede) => (
//                             <tr key={hospede.pesCodigo}>
//                                 <td className="pt-3">{hospede.pesNome}</td>
//                                 <td className="pt-3"></td>
//                                 <div className="col-md-3">
//                                     <div className="form-check form-check-inline">
//                                         <input className="form-check-input" type="checkbox" id="pesCatequista" value="pesCatequista" name="pesCatequista" onChange={this.handleCheck} />
//                                         <label className="form-check-label" for="pesCatequista">Pagante</label>
//                                     </div>
//                                     <div className="form-check form-check-inline">
//                                         <input className="form-check-input" type="checkbox" id="pesSalmista" value="pesSalmista" name="pesSalmista" onChange={this.handleCheck} />
//                                         <label className="form-check-label" for="pesSalmista">Cobrante</label>
//                                     </div>
//                                 </div>
//                                 <td>
//                                     <button className="btn btn-warning" onClick={() => this.selecionarEvento(hospede, "Editar")}>
//                                         <i className="fa fa-pencil"></i>
//                                     </button>{" "}
//                                     <button className="btn btn-danger" onClick={() => this.selecionarEvento(hospede, "Excluir")}>
//                                         <i className="fa fa-trash"></i>
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </FormModel>
//             </React.Fragment>
//         );
//     }
// }

// export default Hospedes;