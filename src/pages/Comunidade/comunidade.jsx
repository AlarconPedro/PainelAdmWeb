import React from "react";

import Api from "../../services/Api";

import ApiPessoas from "../../services/ApiRoutes/ApiPessoas";
import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

class Comunidade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comunidadeData: [],
            comunidade: {},
            abrirCadastro: false,
            carregando: true,
            valido: true,
        }
    }

    abrirFecharCadastro = () => {
        this.setState({ abrirCadastro: !this.state.abrirCadastro });
        this.getComunidade();
    }

    getComunidadeApi = async () => {
        let comunidade = await Api.comunidade.getComunidade();
        this.setState({ comunidadeData: comunidade });
    }

    getComunidade = async () => {
        let comunidade = await Api.comunidade.getComunidade();
        this.setState({ comunidadeData: comunidade });
    }

    getComunidadeId = async (id) => {
        let comunidade = await Api.comunidade.getComunidade(id);
        this.setState({ comunidade: comunidade });
    }

    postComunidade = async (usuario) => {
        await Api.comunidade.postComunidade(usuario);
        this.abrirFecharCadastro();
    }

    componentDidMount() {
        this.getComunidade();
    }

    render() {
        return (
            <React.Fragment>
                <FormModel
                    titulo="Cadastro Pessoas"
                    subtitulo="CCMZ"
                    icone="user"
                    tipoContainer="form-container"
                    Cabecalho="Pessoas"
                    BotaoAdd="Adicionar Pessoa"
                    dadosApi={this.state.pessoasData}
                    getDados={this.getComunidade}
                    getByNome={this.getVendedorNome}
                    funcAbrirCadastro={this.abrirFecharCadastro}
                    carregando={this.state.carregando}
                    colunas={[
                        { nome: "Nome" },
                        { nome: "Gênero" },
                        { nome: "Comunidade" },
                    ]}
                >
                    <tbody>
                        {this.state.comunidadeData.map((comunidade) => (
                            <tr key={comunidade.comCodigo}>
                                <td className="pt-3">{comunidade.comNome}</td>
                                <td className="pt-3">{comunidade.comNumero}</td>
                                <td className="pt-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={comunidade.usuAcessoCloud === "S" ? true : false} value={comunidade.usuAcessoCloud === "S" ? true : false} />
                                    </div>
                                </td>

                                <td>
                                    <button className="btn btn-warning" onClick={() => this.selecionarUsuario(comunidade, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => this.selecionarUsuario(comunidade, "Excluir")}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </FormModel>
                <FormInserir
                    nome={"Pessoas"}
                    abrir={this.state.abrirCadastro}
                    funcAbrir={this.abrirFecharCadastro}
                    funcPost={this.postUsuario}
                >
                    {this.state.valido ? <form className="row g-3 form-group">
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
            </React.Fragment>
        );
    }
}

export default Comunidade;