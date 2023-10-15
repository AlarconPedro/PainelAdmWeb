import React from "react";

import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

import ApiBlocos from "../../services/ApiRoutes/ApiBlocos";

class Blocos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocosData: [],
            blocoInitialState: {},
            bloco: {
                bloCodigo: 0,
                bloNome: "",
            },
            abrirCadastro: false,
            abrirEditar: false,
            abrirExcluir: false,
            carregando: true,
            valido: true,
        }
    }

    componentDidMount() {
        this.getBlocos();
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ bloco: { ...this.state.bloco, [name]: value } });
    }

    abrirFecharCadastro = () => {
        this.setState({ abrirCadastro: !this.state.abrirCadastro });
        this.getBlocos();
    }

    abrirFecharEditar = () => {
        this.setState({ abrirEditar: !this.state.abrirEditar });
        this.getBlocos();
    }

    abrirFecharExcluir = () => {
        this.setState({ abrirExcluir: !this.state.abrirExcluir });
        this.getBlocos();
    }

    selecionarBloco = async (bloco, tipo) => {
        if (tipo === "Editar") {
            this.setState({ bloco: bloco, abrirEditar: true });
        } else {
            this.setState({ bloco: bloco, abrirExcluir: true });
        }
    }

    getBlocos = async () => {
        this.setState({ carregando: true });
        let blocos = await ApiBlocos.getBlocos();
        this.setState({ blocosData: blocos, carregando: false });
    }

    render() {
        return (
            <React.Fragment>
                <FormModel
                    titulo="Cadastro Blocos"
                    subtitulo="CCMZ"
                    icone="user"
                    tipoContainer="form-container"
                    Cabecalho="Blocos"
                    BotaoAdd="Adicionar Bloco"
                    dadosApi={this.state.blocosData}
                    getDados={this.getBlocos}
                    getByNome={this.getVendedorNome}
                    funcAbrirCadastro={this.abrirFecharCadastro}
                    carregando={this.state.carregando}
                    colunas={[
                        { nome: "Nome" },
                        { nome: "Qtd. Quartos" },
                        { nome: "Quartos Livres" },
                        { nome: "Quartos Ocupados" },
                    ]}
                >
                    <tbody>
                        {this.state.blocosData.map((bloco) => (
                            <tr key={bloco.bloCodigo}>
                                <td className="pt-3">{bloco.bloNome}</td>
                                <td className="pt-3">{bloco.qtdQuartos}</td>
                                <td className="pt-3">{bloco.qtdLivres}</td>
                                <td className="pt-3">{bloco.qtdOcupados}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => this.selecionarBloco(bloco, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => this.selecionarBloco(bloco, "Excluir")}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </FormModel>
                <FormInserir
                    nome={"Bloco"}
                    abrir={this.state.abrirCadastro}
                    funcAbrir={this.abrirFecharCadastro}
                    funcPost={this.postComunidade}
                >
                    {this.state.valido ?
                        <form className="row g-3 form-group">
                            <div className="col-md-5">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="nome" name="comNome" value={this.state.bloco.bloNome} onChange={this.handleChange} />
                            </div>
                        </form>
                        :
                        <form className="row g-3 form-group">
                            <div className="alert alert-danger d-flex align-items-center h-25" role="alert">
                                <div>
                                    <i className="fa fa-exclamation-triangle"> {this.state.textoValido}</i>
                                </div>
                            </div>
                        </form>}
                </FormInserir>
                <FormEditar
                    nome={"Comunidades"}
                    abrir={this.state.abrirEditar}
                    funcAbrir={this.abrirFecharEditar}
                    funcPut={this.putComunidade}
                >
                    {this.state.valido ?
                        <form className="row g-3 form-group">
                            <div className="col-md-5">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="nome" name="comNome" value={this.state.bloco.bloNome} onChange={this.handleChange} />
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
                    dados={this.state.bloco.bloNome}
                    abrir={this.state.abrirExcluir}
                    funcAbrir={this.abrirFecharExcluir}
                    funcDelete={this.deleteComunidade}
                />
            </React.Fragment>
        );
    }
}

export default Blocos;