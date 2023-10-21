import React from "react";

import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

import ApiQuartos from "../../services/ApiRoutes/ApiQuartos";

import { BsFillShieldLockFill } from "react-icons/bs";

import FormAcesso from "../../forms/FormAcesso";
import { Alert } from "reactstrap";
import ApiBlocos from "../../services/ApiRoutes/ApiBlocos";

class Quarto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrirCadastro: false,
            abrirEditar: false,
            abrirExcluir: false,
            abrirAcesso: false,
            carregando: false,
            valido: true,
            textoValido: "",
            quartoData: [],
            blocoData: [],
            quartoInitialState: {
                quaCodigo: 0,
                quaNome: "",
                bloCodigo: 0,
                quaQtdcamas: 0,
                tbEventoQuartos: [],
                tbQuartoPessoas: []
            },
            quarto: {
                quaCodigo: 0,
                quaNome: "",
                bloCodigo: 0,
                quaQtdcamas: 0,
                tbEventoQuartos: [],
                tbQuartoPessoas: []
            },
        }
    }

    componentDidMount() {
        this.setState({ carregando: true });
        this.getQuartos();
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ quarto: { ...this.state.quarto, [name]: value } });
    }

    selecionaQuarto = async (quarto, tipo) => {
        this.setState({ quarto: quarto });
        if (tipo === "Editar") {
            // let retorno = await this.getQuartoById(quarto.quaCodigo);
            // if (retorno === 200)
            this.setState({ abrirEditar: !this.state.abrirEditar });
            this.getQuartos();

        } else if (tipo === "Excluir") {
            this.setState({ abrirExcluir: !this.state.abrirExcluir });
        }
    }

    abrirFecharCadastro = async () => {
        await this.getBlocos();
        this.setState({ abrirCadastro: !this.state.abrirCadastro });
        this.setState({ quarto: this.state.quartoInitialState });
        this.getQuartos();
    }
    abrirFecharEditar = async () => {
        await this.getBlocos();
        this.setState({ abrirEditar: !this.state.abrirEditar });
        this.setState({ quarto: this.state.quartoInitialState });
        this.getQuartos();
    }

    abrirFecharExcluir = () => {
        this.setState({ abrirExcluir: !this.state.abrirExcluir });
        this.setState({ quarto: this.state.quartoInitialState });
        this.getQuartos();
    }

    getQuartos = async () => {
        this.setState({ carregando: true })
        let quartos = await ApiQuartos.getQuartos();
        this.setState({ quartoData: quartos, carregando: false })
    }

    getQuartoById = async (id) => {
        this.setState({ carregando: true })
        let quartoSelecionado = await ApiQuartos.getQuartoId(id);
        if (quartoSelecionado !== null) {
            this.setState({ quarto: quartoSelecionado, carregando: false })
            return 200;
        } else {
            this.setState({ valido: false, textoValido: "Erro ao selecionar quarto", carregando: false });
            return 400;
        }
    }

    getBlocos = async () => {
        this.setState({ carregando: true });
        let blocos = await ApiBlocos.getBlocos();
        this.setState({ blocoData: blocos, carregando: false });
    }

    postQuartos = async () => {
        this.setState({ carregando: true });
        let retorno = await ApiQuartos.postQuartos(this.state.quarto);
        if (retorno === 200) {
            this.setState({ carregando: false, quarto: this.state.quartoInitialState });
            this.abrirFecharCadastro();
            this.getQuartos();
        }
    }

    deleteQuarto = async () => {
        this.setState({ carregando: true });
        let retorno = await ApiQuartos.deleteQuarto(this.state.quarto.quaCodigo);
        if (retorno === 200) {
            this.setState({ carregando: false, quarto: this.state.quartoInitialState });
            this.abrirFecharExcluir();
            this.getQuartos();
        }
    }

    render() {
        return (
            <React.Fragment>
                <FormModel
                    urlApi={"http://localhost:3000/vendedores"}
                    titulo="Cadastro Quartos"
                    subtitulo="CCMZ"
                    icone="bed"
                    tipoContainer="form-container"
                    Cabecalho="Quartos"
                    BotaoAdd="Adicionar Quarto"
                    dadosApi={this.state.vendedoresData}
                    getDados={this.getVendedores}
                    getByNome={this.getVendedorNome}
                    funcAbrirCadastro={this.abrirFecharCadastro}
                    carregando={this.state.carregando}
                    colunas={[
                        { nome: "Nome" },
                        { nome: "Bloco" },
                        { nome: "Qtd. Camas" },
                    ]}
                >
                    <tbody>
                        {this.state.quartoData.map((quarto) => (
                            <tr key={quarto.quaCodigo}>
                                <td className="pt-3">{quarto.quaNome}</td>
                                <td className="pt-3">{quarto.bloco}</td>
                                <td className="pt-3">{quarto.quaQtdcamas}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => this.selecionaQuarto(quarto, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => this.selecionaQuarto(quarto, "Excluir")}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </FormModel>
                <FormInserir
                    nome={"Quarto"}
                    abrir={this.state.abrirCadastro}
                    funcAbrir={this.abrirFecharCadastro}
                    funcPost={this.postQuartos}
                >
                    <form className="row g-3 form-group">
                        <div className="col-md-6">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" name="quaNome" value={this.state.quarto.quaNome} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="bloco" className="form-label">Bloco</label>
                            <select id="bloco" className="form-select" name="bloCodigo" value={this.state.quarto.bloCodigo} onChange={this.handleChange}>
                                {this.state.blocoData.map((bloco) => (
                                    <option value={bloco.bloCodigo}>{bloco.bloNome}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="number" className="form-label">Qtd. Camas</label>
                            <input type="number" className="form-control" id="qtdCamas" name="quaQtdcamas" value={this.state.quarto.quaQtdcamas} onChange={this.handleChange} />
                        </div>
                    </form>
                </FormInserir>
                <FormEditar
                    nome={"Quarto"}
                    abrir={this.state.abrirEditar}
                    funcAbrir={this.abrirFecharEditar}
                    funcPut={this.prepararDados}
                >
                    <form className="row g-3 form-group">
                        <div className="col-md-6">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" name="quaNome" value={this.state.quarto.quaNome} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="bloco" className="form-label">Bloco</label>
                            <select id="bloco" className="form-select" name="bloCodigo" value={this.state.quarto.bloCodigo} onChange={this.handleChange}>
                                {this.state.blocoData.map((bloco) => (
                                    <option value={bloco.bloCodigo}>{bloco.bloNome}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="number" className="form-label">Qtd. Camas</label>
                            <input type="number" className="form-control" id="qtdCamas" name="quaQtdcamas" value={this.state.quarto.quaQtdcamas} onChange={this.handleChange} />
                        </div>
                    </form>
                </FormEditar>
                <FormExcluir
                    nome={"Quarto"}
                    abrir={this.state.abrirExcluir}
                    dados={this.state.quarto.quaNome}
                    funcDelete={this.deleteQuarto}
                    funcAbrir={this.abrirFecharExcluir}
                />
            </React.Fragment>
        );
    }
}

export default Quarto;