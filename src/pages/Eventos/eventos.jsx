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
            comunidadesData: [],
            evento: {},
            comunidade: {},
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
                    nome={"Comunidades"}
                    abrir={this.state.abrirCadastro}
                    funcAbrir={this.abrirFecharCadastro}
                    funcPost={this.postComunidade}
                    valido={this.state.valido}
                >
                    {this.state.carregando ?
                        <div class="justify-content-center">
                            <div class="spinner-border loader" role="status" />
                        </div> :
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Comunidade</th>
                                    <th scope="col">Pavilhão</th>
                                    <th scope="col">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.comunidadesData.map((comunidade) => (
                                    <tr key={comunidade.comCodigo}>
                                        <td>{comunidade.comNome}</td>
                                        <td><button className="btn btn-danger" onClick={() => this.desvincularUsuarioEmpresa(comunidade.uspCodigo)}><i className="fa fa-trash"></i></button></td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="col-md-6">
                                        <div>
                                            <select id="empresa" className="form-select" name="empCodigo" defaultValue={"Escolha uma Comunidade"} value={this.state.comunidade.comCodigo ?? 0} onChange={this.selecionarEmpresa}>
                                                {this.state.comunidadesData.map((comunidade) => (
                                                    <option key={comunidade.comCodigo} value={comunidade.comCodigo}>{comunidade.comNome}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                    <td className="col-md-5">
                                        <div>
                                            {
                                                this.state.comunidadesData.length < 1 ?
                                                    <select className="form-select" disabled={true} defaultValue={"Escolha uma Pessoa"} />
                                                    :
                                                    <select id="pessoa" className="form-select" name="pesCodigo" disabled={this.state.comunidadesData.length < 1} defaultValue={"Escolha uma Pessoa"} value={this.state.comunidade.comCodigo} onChange={this.selecionarPessoa}>
                                                        {this.state.comunidadesData.map((comunidade) => (
                                                            <option key={comunidade.comCodigo} value={comunidade.comCodigo}>{comunidade.comNome}</option>
                                                        ))}
                                                    </select>
                                            }
                                        </div>
                                    </td>
                                    <td className="col-md-2">
                                        <div>
                                            <button className="btn btn-success" disabled={this.state.comunidadesData.length < 1} onClick={() => this.preparaDadosPessoa()}><i className="fa fa-plus"></i></button>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>}
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