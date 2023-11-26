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
    const [abrirEditar, setAbrirEditar] = useState(false);
    const [abrirExcluir, setAbrirExcluir] = useState(false);

    const [pagante, setPagante] = useState(false);
    const [cobrante, setCobrante] = useState(false);

    const [nome, setNome] = useState('');
    const [comunidade, setComunidade] = useState('');
    const [hospede, setHospede] = useState({});

    const hoespedeInicial = {
        pesCodigo: 0,
        pagante: true,
        cobrante: true,
    }

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

    const abrirFecharEditar = () => {
        setAbrirEditar(!abrirEditar);
    }

    const abrirFecharExcluir = () => {
        setAbrirExcluir(!abrirExcluir);
    }

    const atualizarHospede = async (event) => {
        event.preventDefault();
        setCarregando(true);
        let retorno = await apiHospedes.putHospede(evento, nome, comunidade, pagante, cobrante);
        if (retorno !== null) {
            setHospedesData(retorno);
        }
        setCarregando(false);
    }

    const handleCheck = (event) => {
        if (event.target.name === "pesCatequista")
            setPagante(event.target.checked);
        else if (event.target.name === "pesSalmista")
            setCobrante(event.target.checked);
    }

    const selecionaHospede = (hospede, operacao) => {
        // const { name, value } = event.target;
        // setHospede({
        //     ...hospede,
        //     [name]: value
        // });
        setHospede(hospede);
        if (operacao === "Editar")
            abrirFecharEditar();
        else if (operacao === "Excluir")
            abrirFecharExcluir();
    }

    const handleNome = (event) => {
        setNome(event.target.value);
    }

    const handleComunidade = (event) => {
        setComunidade(event.target.value);
    }

    useEffect(() => {
        getHospedes();
        setHospede(hoespedeInicial);
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
                                <input className="form-check-input" type="checkbox" id="pagante" value="pagante" checked={hospede.pagante === null ? true : false} />
                            </td>
                            <td className="pt-3">
                                <input className="form-check-input" type="checkbox" id="cobrante" value="cobrante" checked={hospede.cobrante === null ? true : false} />
                            </td>
                            <td>
                                <button className="btn btn-warning" onClick={() => selecionaHospede(hospede, "Editar")}>
                                    <i className="fa fa-pencil"></i>
                                </button>{" "}
                                <button className="btn btn-danger" onClick={() => selecionaHospede(hospede, "Excluir")}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </FormModel>
            <FormEditar
                nome={"Hóspede"}
                abrir={abrirEditar}
                funcAbrir={abrirFecharEditar}
                funcPut={atualizarHospede}
            >
                <div className='row col-md-12 d-flex justify-content-around'>
                    <div className='col-md-6'>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="pagante" name="pesCatequista" onChange={handleCheck} />
                            <label className="form-check-label p-1" htmlFor="pagante">
                                Pagante
                            </label>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="cobrante" name="pesSalmista" onChange={handleCheck} />
                            <label className="form-check-label p-1" htmlFor="cobrante">
                                Cobrante
                            </label>
                        </div>
                    </div>
                </div>

            </FormEditar>
        </React.Fragment>
    );
}

export default Hospedes;