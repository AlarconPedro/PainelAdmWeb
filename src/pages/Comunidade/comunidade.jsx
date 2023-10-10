import React from "react";

import { apiComunidade } from "../../services/Api";

import ApiComunidade from "../../services/ApiRoutes/ApiComunidade";

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
            comunidade: {
                comCodigo: 0,
                comNome: "",
                comCidade: "",
                comUF: "",
            },
            abrirCadastro: false,
            carregando: true,
            valido: true,
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ comunidade: { ...this.state.comunidade, [name]: value } });
    }

    abrirFecharCadastro = () => {
        this.setState({ abrirCadastro: !this.state.abrirCadastro });
        this.getComunidade();
    }

    getComunidade = async () => {
        let comunidade = await ApiComunidade.getComunidade();
        this.setState({ comunidadeData: comunidade, carregando: false });
    }

    getComunidadeApi = async () => {
        let comunidade = await ApiComunidade.getComunidade();
        this.setState({ comunidadeData: comunidade });
    }

    getComunidadeId = async (id) => {
        let comunidade = await ApiComunidade.getComunidade(id);
        this.setState({ comunidade: comunidade, carregando: false });
    }

    postComunidade = async () => {
        await ApiComunidade.postComunidade(this.state.comunidade);
        this.abrirFecharCadastro();
    }

    componentDidMount() {
        this.setState({ carregando: true });
        this.getComunidade();
    }

    render() {
        return (
            <React.Fragment>
                <FormModel
                    titulo="Cadastro Comunidade"
                    subtitulo="CCMZ"
                    icone="user"
                    tipoContainer="form-container"
                    Cabecalho="Comunidades"
                    BotaoAdd="Adicionar Comunidade"
                    dadosApi={this.state.comunidadeData}
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
                    nome={"Comunidades"}
                    abrir={this.state.abrirCadastro}
                    funcAbrir={this.abrirFecharCadastro}
                    funcPost={this.postComunidade}
                >
                    {this.state.valido ?
                        <form className="row g-3 form-group">
                            <div className="col-md-5">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="nome" name="comNome" value={this.state.comunidade.comNome} onChange={this.handleChange} />
                            </div>
                            <div className="col-md-5">
                                <label htmlFor="cidade" className="form-label">Cidade</label>
                                <input type="text" className="form-control" id="cidade" name="comCidade" value={this.state.comunidade.comCidade} onChange={this.handleChange} />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="UF" className="form-label">UF</label>
                                <input type="text" className="form-control" id="UF" name="comUF" maxLength={2} value={this.state.comunidade.comUF} onChange={this.handleChange} />
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
            </React.Fragment>
        );
    }
}

export default Comunidade;