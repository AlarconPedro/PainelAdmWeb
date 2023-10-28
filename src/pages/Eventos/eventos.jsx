import React from "react";

import ApiPessoas from "../../services/ApiRoutes/ApiPessoas";
import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";

import { apiEvento } from "../../services/Api";

import { BsHouseFill, BsPeopleFill } from "react-icons/bs"
import { FaBed } from "react-icons/fa";

import ConverteData from "../../classes/Funcoes/ConverteData";
import DataToPost from "../../classes/Funcoes/DataToPost";
import FormQuartos from "../../forms/FormQuartos";

import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';

class Eventos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventosData: [],
            eventoQuartos: [],
            pavilhoesData: [],
            comunidadesData: [],
            selected: [],
            options: [
                // { value: 'one', label: 'Option One' },
                // { value: 'two', label: 'Option Two' },
            ],
            eventoInitialState: {
                eveCodigo: 0,
                eveNome: "",
                eveDatainicio: new Date("01/01/2023"),
                eveDatafim: new Date("01/02/2023"),
                tbEventoQuartos: [],
            },
            evento: {
                eveCodigo: 0,
                eveNome: "",
                eveDatainicio: new Date("01/01/2023"),
                eveDatafim: new Date("01/02/2023"),
                tbEventoQuartos: [],
            },
            pavilhao: {},
            comunidade: {},
            abrirCadastro: false,
            abrirEditar: false,
            abrirExcluir: false,
            abrirQuartos: false,
            carregando: true,
            valido: true,
        }
    }

    atualizaCampoDataInicio = e => {
        this.setState({ evento: { ...this.state.evento, eveDataInicio: e } });
    }

    atualizaCampoDataFim = e => {
        this.setState({ evento: { ...this.state.evento, eveDataFim: e } })
    }

    atualizaDadosListBox = (quartoLista) => {
        let quartos = [];
        quartoLista.forEach(element => {
            quartos.push({ value: element.quaCodigo, label: element.quaNome });
        });
        this.setState({ options: quartos });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ evento: { ...this.state.evento, [name]: value } });
    }

    abrirFecharCadastro = () => {
        this.setState({ abrirCadastro: !this.state.abrirCadastro, evento: this.state.eventoInitialState });
        this.getEventos();
    }

    abrirFecharEditar = () => {
        this.setState({ abrirEditar: !this.state.abrirEditar });
        this.getEventos();
    }

    abrirFecharExcluir = () => {
        this.setState({ abrirExcluir: !this.state.abrirExcluir });
        this.getEventos();
    }

    abrirFecharQuartos = () => {
        this.setState({ abrirQuartos: !this.state.abrirQuartos });
    }

    getEventos = async () => {
        this.setState({ carregando: true });
        let eventos = await apiEvento.getEventos();
        this.setState({ eventosData: eventos, carregando: false });
    }

    getEventoId = async (id) => {
        this.setState({ carregando: true });
        let evento = await apiEvento.getEvento(id);
        this.setState({ evento: evento, carregando: false });
    }

    getPavilhoes = async () => {
        this.setState({ carregando: true });
        let pavilhoes = await apiEvento.getPavilhoes();
        this.setState({ pavilhoesData: pavilhoes, carregando: false });
    }

    getComunidades = async () => {
        this.setState({ carregando: true });
        let comunidades = await apiEvento.getComunidades();
        this.setState({ comunidadesData: comunidades, carregando: false });
    }

    getQuartosByPavilhao = async (id) => {
        this.setState({ carregando: true });
        let quartos = await apiEvento.getQuartosPavilhao(id);
        console.log(quartos);
        this.setState({ eventoQuartos: quartos, carregando: false });
        this.atualizaDadosListBox(quartos);
    }

    salvarQuarto = async () => { }

    postEvento = async (evento) => {
        this.setState({ carregando: true });
        let retorno;
        this.state.evento.eveDatainicio = DataToPost(this.state.evento.eveDatainicio);
        this.state.evento.eveDatafim = DataToPost(this.state.evento.eveDatafim);
        retorno = await apiEvento.postEvento(this.state.evento);
        if (retorno === 200) {
            this.abrirFecharCadastro();
        }
        this.setState({ carregando: false });
    }

    putEvento = async (evento) => {
        this.setState({ carregando: true });
        let retorno;
        retorno = await apiEvento.putEvento(this.state.evento);
        if (retorno === 200) {
            this.abrirFecharEditar();
        }
        this.setState({ carregando: false });
    }

    deleteEvento = async () => {
        this.setState({ carregando: true });
        let retorno;
        retorno = await apiEvento.deleteEvento(this.state.evento.eveCodigo);
        if (retorno === 200) {
            this.abrirFecharExcluir();
        }
        this.setState({ carregando: false });
    }

    componentDidMount() {
        this.setState({ carregando: true });
        this.getEventos();
    }

    selecionarEvento = async (evento, acao) => {
        this.setState({ evento: evento })
        if (acao === "Editar") {
            this.abrirFecharEditar();
        } else if (acao === "Excluir") {
            this.abrirFecharExcluir();
        } else if (acao === "Quartos") {
            await this.getPavilhoes();
            this.abrirFecharQuartos();
        }
    }

    selecionarPavilhao = async (pavilhao) => {
        const { value } = pavilhao.target;
        await this.getQuartosByPavilhao(value);
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
                        { nome: "Hóspedes" },
                        { nome: "Alocar Hóspedes" },
                    ]}
                >
                    <tbody>
                        {this.state.eventosData.map((evento) => (
                            <tr key={evento.eveCodigo}>
                                <td className="pt-3">{evento.eveNome}</td>
                                <td className="pt-3">{ConverteData(evento.eveDatainicio)}</td>
                                <td className="pt-3">{ConverteData(evento.eveDatafim)}</td>
                                <td>
                                    <td className="pl-5 pt-lg-2 listar" onClick={() => this.selecionarEvento(evento, "Quartos")}><FaBed /></td>
                                </td>
                                <td>
                                    <td className="pl-5 pt-lg-2 listar" onClick={() => this.selecionarEvento(evento, "Hospedes")}><BsPeopleFill /></td>
                                </td>
                                <td>
                                    <td className="pl-5 pt-lg-2 listar" onClick={() => this.selecionarEvento(evento, "Distribuir")}><BsHouseFill /></td>
                                </td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => this.selecionarEvento(evento, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => this.selecionarEvento(evento, "Excluir")}>
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
                    funcPost={this.postEvento}
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
                                    <input type="text" className="form-control" id="nome" name="eveNome" value={this.state.evento.eveNome} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label mb-0">Data Início:</label>
                                    <DatePicker
                                        calendarContainer={""}
                                        className="form-control"
                                        name="eveDataInicio"
                                        selected={new Date(this.state.evento.eveDatainicio)}
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
                                        calendarContainer={""}
                                        className="form-control"
                                        name="eveDataFim"
                                        selected={new Date(this.state.evento.eveDatafim)}
                                        onChange={date => this.atualizaCampoDataFim(date)}
                                        // showTimeSelect={true}
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
                    }
                </FormInserir>
                <FormEditar
                    nome={"Comunidades"}
                    abrir={this.state.abrirEditar}
                    funcAbrir={this.abrirFecharEditar}
                    funcPut={this.putEvento}
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
                                    <input type="text" className="form-control" id="nome" name="eveNome" value={this.state.evento.eveNome} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label mb-0">Data Início:</label>
                                    <DatePicker
                                        calendarContainer={""}
                                        className="form-control"
                                        name="eveDataInicio"
                                        selected={new Date(this.state.evento.eveDatainicio)}
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
                                        calendarContainer={""}
                                        className="form-control"
                                        name="eveDataFim"
                                        selected={new Date(this.state.evento.eveDatafim)}
                                        onChange={date => this.atualizaCampoDataFim(date)}
                                        // showTimeSelect={true}
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
                    }
                </FormEditar>
                <FormExcluir
                    nome={"Comunidades"}
                    dados={this.state.evento.eveNome}
                    abrir={this.state.abrirExcluir}
                    funcAbrir={this.abrirFecharExcluir}
                    funcDelete={this.deleteEvento}
                    valido={this.state.valido}
                />
                <FormQuartos
                    nome={"Quartos"}
                    abrir={this.state.abrirQuartos}
                    funcAbrir={this.abrirFecharQuartos}
                    funcSalvar={this.salvarQuarto}
                    valido={this.state.valido}
                >
                    <form className="row g-3 form-group">
                        <div className="col-md-6">
                            <label htmlFor="status" className="form-label mb-0">Pavilhão</label>
                            <select id="status" className="form-select" name="eveNome" value={this.state.evento.eveNome} onChange={this.selecionarPavilhao}>
                                <option value="">Selecione</option>
                                {this.state.pavilhoesData.map((pavilhao) => (
                                    <option key={pavilhao.bloCodigo} value={pavilhao.bloCodigo} onClick={() => this.selecionarPavilhao(pavilhao)}>{pavilhao.bloNome}</option>
                                ))}
                            </select>
                        </div>
                        {
                            this.state.carregando ?
                                <div class="justify-content-center">
                                    <div class="spinner-border loader" role="status" />
                                </div>
                                :
                                <DualListBox
                                    options={this.state.options}
                                    selected={this.state.selected}
                                    onChange={(value) => this.setState({ selected: value })}
                                />
                        }
                    </form>
                </FormQuartos>
            </React.Fragment>
        );
    }
}

export default Eventos;