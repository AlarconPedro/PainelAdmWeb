import React from "react";

import ApiPessoas from "../../services/ApiRoutes/ApiPessoas";
import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

import { apiPessoa } from "../../services/Api";

class Pessoas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pessoasData: [],
            pessoa: {},
            abrirCadastro: false,
            carregando: true,
            valido: true,
        }
    }

    abrirFecharCadastro = () => {
        this.setState({ abrirCadastro: !this.state.abrirCadastro });
        this.getPessoas();
    }

    getPessoasApi = async () => {
        let pessoas = await apiPessoa.getPessoas();
        this.setState({ pessoasData: pessoas });
    }

    getPessoas = async () => {
        let pessoas = await apiPessoa.getPessoas();
        this.setState({ pessoasData: pessoas });
    }

    getPessoaId = async (id) => {
        let pessoa = await apiPessoa.getPessoa(id);
        this.setState({ pessoa: pessoa, carregando: false });
    }

    postUsuario = async (usuario) => {
        await apiPessoa.postPessoa(usuario);
        this.abrirFecharCadastro();
    }

    componentDidMount() {
        this.setState({ carregando: true });
        this.getPessoas();
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
                    getDados={this.getPessoas}
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
                        {this.state.pessoasData.map((pessoa) => (
                            <tr key={pessoa.pesCodigo}>
                                <td className="pt-3">{pessoa.pesNome}</td>
                                <td className="pt-3">{pessoa.pesLogin}</td>
                                <td className="pt-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={pessoa.usuAcessoCloud === "S" ? true : false} value={pessoa.usuAcessoCloud === "S" ? true : false} />
                                    </div>
                                </td>

                                <td>
                                    <button className="btn btn-warning" onClick={() => this.selecionarUsuario(pessoa, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => this.selecionarUsuario(pessoa, "Excluir")}>
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

export default Pessoas;