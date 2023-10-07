import React from "react";

import ApiPessoas from "../../services/ApiRoutes/ApiPessoas";
import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

import Api from "../../services/Api";

class Pessoas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pessoasData: [],
            pessoa: {},
            abrirCadastro: false,
        }
    }

    getPessoasApi = async () => {
        let pessoas = await Api.pessoa.getPessoas();
        this.setState({ pessoasData: pessoas });
    }

    getPessoas = async () => {
        let pessoas = await ApiPessoas.getPessoas();
        this.setState({ pessoasData: pessoas });
    }

    getPessoaId = async (id) => {
        let pessoa = await ApiPessoas.getPessoa(id);
        this.setState({ pessoa: pessoa });
    }

    componentDidMount() {
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
                    getDados={this.getPessoasApi}
                    getByNome={this.getVendedorNome}
                    funcAbrirCadastro={this.abrirFecharCadastro}
                    colunas={[
                        { nome: "Nome" },
                        { nome: "Login" },
                        { nome: "Acesso Cloud" },
                    ]}
                >
                    {this.state.carregando ? <div className="spinner-border loader" role="status" />
                        :
                        <tbody>
                            {this.state.usuariosData.map((usuario) => (
                                <tr key={usuario.usuCodigo}>
                                    <td className="pt-3">{usuario.usuNome}</td>
                                    <td className="pt-3">{usuario.usuLogin}</td>
                                    <td className="pt-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" checked={usuario.usuAcessoCloud === "S" ? true : false} value={usuario.usuAcessoCloud === "S" ? true : false} />
                                        </div>
                                    </td>

                                    <td>
                                        <button className="btn btn-warning" onClick={() => this.selecionarUsuario(usuario, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => this.selecionarUsuario(usuario, "Excluir")}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </FormModel>
                <FormInserir
                    titulo="Inserir Pessoa"
                    subtitulo="CCMZ"
                    icone="user"
                    tipoContainer="form-container"
                    Cabecalho="Pessoas"
                    BotaoAdd="Adicionar Pessoa"
                    dadosApi={this.state.pessoasData}
                    getDados={this.getPessoasApi}
                    getByNome={this.getVendedorNome}
                    funcAbrirCadastro={this.abrirFecharCadastro}
                    colunas={[
                        { nome: "Nome" },
                        { nome: "Login" },
                        { nome: "Acesso Cloud" },
                    ]}
                >
                    <form>
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" placeholder="Nome" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login">Login</label>
                            <input type="text" className="form-control" id="login" placeholder="Login" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="senha">Senha</label>
                            <input type="password" className="form-control" id="senha" placeholder="Senha" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="acessoCloud">Acesso Cloud</label>
                            <input type="text" className="form-control" id="acessoCloud" placeholder="Acesso Cloud" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipo">Tipo</label>
                            <select className="form-control" id="tipo">
                                <option>Administrador</option>
                                <option>Usuário</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </form>
                </FormInserir>
            </React.Fragment>
        );
    }
}

export default Pessoas;