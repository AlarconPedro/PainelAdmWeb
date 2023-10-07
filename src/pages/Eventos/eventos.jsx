import React from "react";

import ApiPessoas from "../../services/ApiRoutes/ApiPessoas";
import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

import { apiEvento } from "../../services/Api";

class Eventos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventosData: [],
            evento: {},
            abrirCadastro: false,
            carregando: true,
            valido: true,
        }
    }

    abrirFecharCadastro = () => {
        this.setState({ abrirCadastro: !this.state.abrirCadastro });
        this.getEventos();
    }

    getEventos = async () => {
        let eventos = await apiEvento.getEventos();
        this.setState({ eventosData: eventos, carregando: false });
    }

    getEventoId = async (id) => {
        let evento = await apiEvento.getEvento(id);
        this.setState({ evento: evento, carregando: false });
    }

    postEvento = async (evento) => {
        await apiEvento.postEvento(evento);
        this.abrirFecharCadastro();
    }

    componentDidMount() {
        this.setState({ carregando: true });
        this.getEventos();
    }

    render() {
        return (
            <React.Fragment>
                <FormModel
                    titulo="Cadastro Eventos"
                    subtitulo="CCMZ"
                    icone="calendar"
                    tipoContainer="form-container"
                    Cabecalho="Eventos"
                    BotaoAdd="Adicionar Evento"
                    dadosApi={this.state.eventosData}
                    getDados={this.getEventos}
                    getByNome={this.getVendedorNome}
                    funcAbrirCadastro={this.abrirFecharCadastro}
                    carregando={this.state.carregando}
                    colunas={[
                        { nome: "Nome" },
                        { nome: "Data Início" },
                        { nome: "Data Fim" },
                    ]}
                >
                    <tbody>
                        {this.state.eventosData.map((evento) => (
                            <tr key={evento.eveCodigo}>
                                <td className="pt-3">{evento.eveNome}</td>
                                <td className="pt-3">{evento.EveInicio}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => this.selecionarUsuario(evento, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => this.selecionarUsuario(evento, "Excluir")}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </FormModel>
                <FormInserir
                    post={this.postEvento}
                    abrirFecharCadastro={this.abrirFecharCadastro}
                    carregando={this.state.carregando}
                    valido={this.state.valido}
                >
                </FormInserir>
                <FormEditar
                    put={this.putEvento}
                    abrirFecharCadastro={this.abrirFecharCadastro}
                    carregando={this.state.carregando}
                    valido={this.state.valido}
                    evento={this.state.evento}
                >
                </FormEditar>
            </React.Fragment>
        );
    }
}

export default Eventos;