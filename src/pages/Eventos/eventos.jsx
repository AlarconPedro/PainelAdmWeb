import React from "react";

import ApiPessoas from "../../services/ApiRoutes/ApiPessoas";
import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";

import { apiEvento } from "../../services/Api";

class Eventos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventosData: [],
            comunidadesData: [],
            eventoInitialState: {
                eveCodigo: 0,
                eveNome: "",
                eveDataInicio: new Date("01/01/2023"),
                eveDataFim: new Date("01/02/2023"),
            },
            evento: {
                eveCodigo: 0,
                eveNome: "",
                eveDataInicio: new Date("01/01/2023"),
                eveDataFim: new Date("01/02/2023"),
            },
            comunidade: {},
            abrirCadastro: false,
            carregando: true,
            valido: true,
        }
    }

    atualizaCampoDataInicio = () => { }

    atualizaCampoDataFim = () => { }

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
                        { nome: "Quartos" },
                        { nome: "Participantes" },
                        { nome: "Distribuir Quartos" },
                    ]}
                >
                    <tbody>
                        {this.state.eventosData.map((evento) => (
                            <tr key={evento.eveCodigo}>
                                <td className="pt-3">{evento.eveNome}</td>
                                <td className="pt-3">{evento.eveDatainicio}</td>
                                <td className="pt-3">{evento.eveDatafim}</td>
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
                        this.state.valido ?
                            <form className="row g-3 form-group">
                                <div className="col-md-6">
                                    <label htmlFor="nome" className="form-label mb-0">Nome</label>
                                    <input type="text" className="form-control" id="nome" name="bloNome" value={this.state.evento.eveNome} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label mb-0">Data Início:</label>
                                    <DatePicker
                                        className="form-control"
                                        name="eveDataInicio"
                                        selected={new Date(this.state.evento.eveDataInicio)}
                                        onChange={date => this.atualizaCampoDataInicio(date)}
                                        dateFormat={"dd/MM/yyyy"}
                                        timeFormat="yyyy-MM-dd"
                                        customInput={
                                            <InputMask
                                                type="text"
                                                mask="99/99/9999"
                                            />
                                        }
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label mb-0">Data Fim:</label>
                                    <DatePicker
                                        className="form-control"
                                        name="eveDataFim"
                                        selected={new Date(this.state.evento.eveDataFim)}
                                        onChange={date => this.atualizaCampoDataFim(date)}
                                        dateFormat={"dd/MM/yyyy"}
                                        timeFormat="yyyy-MM-dd"
                                        customInput={
                                            <InputMask
                                                type="text"
                                                mask="99/99/9999"
                                            />
                                        }
                                    />
                                </div>
                            </form>
                            :
                            <form className="row g-3 form-group">
                                <div className="alert alert-danger d-flex align-items-center h-25" role="alert">
                                    <div>
                                        <i className="fa fa-exclamation-triangle"> {this.state.textoValido}</i>
                                    </div>
                                </div>
                            </form>
                        // <table class="table">
                        //     <thead>
                        //         <tr>
                        //             <th scope="col">Comunidade</th>
                        //             <th scope="col">Pavilhão</th>
                        //             <th scope="col">Ações</th>
                        //         </tr>
                        //     </thead>
                        //     <tbody>
                        //         {this.state.comunidadesData.map((comunidade) => (
                        //             <tr key={comunidade.comCodigo}>
                        //                 <td>{comunidade.comNome}</td>
                        //                 <td><button className="btn btn-danger" onClick={() => this.desvincularUsuarioEmpresa(comunidade.uspCodigo)}><i className="fa fa-trash"></i></button></td>
                        //             </tr>
                        //         ))}
                        //         <tr>
                        //             <td className="col-md-6">
                        //                 <div>
                        //                     <select id="empresa" className="form-select" name="empCodigo" defaultValue={"Escolha uma Comunidade"} value={this.state.comunidade.comCodigo ?? 0} onChange={this.selecionarEmpresa}>
                        //                         {this.state.comunidadesData.map((comunidade) => (
                        //                             <option key={comunidade.comCodigo} value={comunidade.comCodigo}>{comunidade.comNome}</option>
                        //                         ))}
                        //                     </select>
                        //                 </div>
                        //             </td>
                        //             <td className="col-md-5">
                        //                 <div>
                        //                     {
                        //                         this.state.comunidadesData.length < 1 ?
                        //                             <select className="form-select" disabled={true} defaultValue={"Escolha uma Pessoa"} />
                        //                             :
                        //                             <select id="pessoa" className="form-select" name="pesCodigo" disabled={this.state.comunidadesData.length < 1} defaultValue={"Escolha uma Pessoa"} value={this.state.comunidade.comCodigo} onChange={this.selecionarPessoa}>
                        //                                 {this.state.comunidadesData.map((comunidade) => (
                        //                                     <option key={comunidade.comCodigo} value={comunidade.comCodigo}>{comunidade.comNome}</option>
                        //                                 ))}
                        //                             </select>
                        //                     }
                        //                 </div>
                        //             </td>
                        //             <td className="col-md-2">
                        //                 <div>
                        //                     <button className="btn btn-success" disabled={this.state.comunidadesData.length < 1} onClick={() => this.preparaDadosPessoa()}><i className="fa fa-plus"></i></button>
                        //                 </div>
                        //             </td>
                        //         </tr>
                        //     </tbody>
                        // </table>
                    }
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