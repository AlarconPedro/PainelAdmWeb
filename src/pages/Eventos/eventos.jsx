import React from "react";

import ApiPessoas from "../../services/ApiRoutes/ApiPessoas";
import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"
import FormQuartos from "../../forms/FormQuartos";
import FormPessoas from "../../forms/FormPessoas";

import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";

import { apiEvento } from "../../services/Api";

import { BsHouseFill, BsPeopleFill } from "react-icons/bs"
import { FaBed } from "react-icons/fa";

import ConverteData from "../../classes/Funcoes/ConverteData";
import DataToPost from "../../classes/Funcoes/DataToPost";

import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import "react-datepicker/dist/react-datepicker.css";

class Eventos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventosData: [],
            eventoQuartos: [],
            pessoasEvento: [],
            pavilhoesData: [],
            comunidadesData: [],
            selectedQuartos: [],
            selectedPessoas: [],
            optionsQuartos: [
                // { value: 'one', label: 'Option One' },
                // { value: 'two', label: 'Option Two' },
            ],
            optionsPessoas: [],
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
            abrirPessoas: false,
            carregando: true,
            valido: true,
            vazio: false,
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
        this.setState({ optionsQuartos: quartos });
    }

    atualizaQuartosAlocados = (quartoLista) => {
        let quartos = [];
        quartoLista.forEach(element => {
            quartos.push(element.quaCodigo);
        });
        this.setState({ selectedQuartos: quartos });
    }

    atualizaDadosListBoxPessoas = (pessoasLista) => {
        let pessoas = [];
        pessoasLista.forEach(element => {
            pessoas.push({ value: element.pesCodigo, label: element.pesNome });
        });
        this.setState({ optionsPessoas: pessoas });
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
        this.getEventos();
    }

    abrirFecharPessoas = () => {
        this.setState({ abrirPessoas: !this.state.abrirPessoas });
        this.getEventos();
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
        this.setState({ carregando: false });
        this.atualizaDadosListBox(quartos);
    }

    getQuartosAlocados = async (codigoPavilhao, codigoEvento) => {
        this.setState({ carregando: true });
        let quartos = await apiEvento.getQuartosAlocados(codigoPavilhao, codigoEvento);
        this.setState({ carregando: false });
        this.atualizaQuartosAlocados(quartos);
    }

    getPessoasEvento = async (codigoComunidade) => {
        this.setState({ carregando: true });
        let pessoas = await apiEvento.getPessoasEvento(codigoComunidade);
        this.setState({ pessoasEvento: pessoas, carregando: false });
    }

    salvarQuarto = async () => {
        this.setState({ carregando: true });
        let quartoLista = [];
        this.state.selectedQuartos.forEach(element => {
            quartoLista.push({
                evqCodigo: 0,
                quaCodigo: element,
                eveCodigo: this.state.evento.eveCodigo,
            });
        });
        let retorno;
        retorno = await apiEvento.postQuartos(quartoLista, this.state.pavilhao);
        if (retorno === 200) {
            this.abrirFecharQuartos();
        }
        this.setState({ carregando: false });
    }

    salvarPessoas = async () => {
        this.setState({ carregando: true });
        let pessoaLista = [];
        this.state.selectedPessoas.forEach(element => {
            pessoaLista.push({
                evpCodigo: 0,
                pesCodigo: element,
                eveCodigo: this.state.evento.eveCodigo,
            });
        });
        let retorno;
        retorno = await apiEvento.postPessoas(pessoaLista, this.state.comunidade);
        if (retorno === 200) {
            this.abrirFecharPessoas();
        }
        this.setState({ carregando: false });
    }

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
        } else if (acao === "Hospedes") {
            await this.getComunidades();
            this.abrirFecharPessoas();
        }
    }

    selecionarPavilhao = async (pavilhao) => {
        const { value } = pavilhao.target;
        this.setState({ pavilhao: value });
        await this.getQuartosByPavilhao(value);
        await this.getQuartosAlocados(this.state.pavilhao, this.state.evento.eveCodigo);
    }

    selecionarComunidade = async (comunidade) => {
        const { value } = comunidade.target;
        this.setState({ comunidade: value });
        await this.getPessoasEvento(value);
        this.atualizaDadosListBoxPessoas(this.state.pessoasEvento);
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
                    vazio={this.state.selectedQuartos.length === 0}
                >
                    <form className="row g-3 form-group">
                        <div className="col-md-6">
                            <label htmlFor="status" className="form-label mb-0">Bloco</label>
                            <select id="status" className="form-select" name="eveNome" value={this.state.pavilhao.bloNome} onChange={this.selecionarPavilhao}>
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
                                <div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="status" className="form-label mb-0">Disponível</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="status" className="form-label mb-0">Alocados</label>
                                        </div>
                                    </div>
                                    <DualListBox
                                        options={this.state.optionsQuartos}
                                        selected={this.state.selectedQuartos}
                                        onChange={(value) => this.setState({ selectedQuartos: value })}
                                    />
                                </div>

                        }
                    </form>
                </FormQuartos>
                <FormPessoas
                    nome={"Pessoas"}
                    abrir={this.state.abrirPessoas}
                    funcAbrir={this.abrirFecharPessoas}
                    funcSalvar={this.salvarPessoas}
                    valido={this.state.valido}
                    vazio={this.state.selectedPessoas.length === 0}
                >
                    <form className="row g-3 form-group">
                        <div className="col-md-6">
                            <label htmlFor="status" className="form-label mb-0">Comunidade</label>
                            <select id="status" className="form-select" name="eveNome" value={this.state.comunidade.comNome} onChange={this.selecionarComunidade}>
                                <option value="">Selecione</option>
                                {this.state.comunidadesData.map((comunidade) => (
                                    <option key={comunidade.comCodigo} value={comunidade.comCodigo} onClick={() => this.selecionarComunidade(comunidade)}>{comunidade.comNome}</option>
                                ))}
                            </select>
                        </div>
                        {
                            this.state.carregando ?
                                <div class="justify-content-center">
                                    <div class="spinner-border loader" role="status" />
                                </div>
                                :
                                <div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="status" className="form-label mb-0">Disponível</label>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="status" className="form-label mb-0">Alocados</label>
                                        </div>
                                    </div>
                                    <DualListBox
                                        options={this.state.optionsPessoas}
                                        selected={this.state.selectedPessoas}
                                        onChange={(value) => this.setState({ selectedPessoas: value })}
                                    />
                                </div>

                        }
                    </form>
                </FormPessoas>
            </React.Fragment>
        );
    }
}

export default Eventos;