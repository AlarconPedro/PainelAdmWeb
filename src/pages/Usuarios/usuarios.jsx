import React from "react";

import Api from "../../services/Api";

import Firebase from "../../services/Firebase";
import validator from 'validator'

import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

import { empresasUrl, usuariosUrl } from "../../services/RotasApi";
import { Form } from "reactstrap";

class Usuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrirCadastro: false,
            abrirEditar: false,
            abrirExcluir: false,
            carregando: false,
            valido: true,
            textoValido: "Preencha todos os campos",
            usuariosData: [],
            empresasData: [],
            usuarioInitialState: {
                usuCodigo: 0,
                usuNome: "",
                usuSenha: "",
                usuFuncao: "",
                usuEndereco: "",
                usuBairro: "",
                usuCidade: "",
                usuUf: "",
                usuCep: "",
                usuFone: "",
                usuCelular: "",
                usuEmail: "",
                usuDiaaniversario: 0,
                usuMesaniversario: 0,
                usuObs: "",
                usuLogin: "",
                usuTipo: 0,
                usuPerfilacesso: 0,
                usuAcessoComercial: "",
                usuAcessoMusical: "",
                usuAcessoLocucao: "",
                usuAutorizacaoacesso: 0,
                usuIdFirebase: "",
                usuPesCodigo: 0,
                usuAcessoCloud: "S",
                tbDireitos: []
            },
            usuario: {
                usuCodigo: 0,
                usuNome: "",
                usuSenha: "",
                usuFuncao: "",
                usuEndereco: "",
                usuBairro: "",
                usuCidade: "",
                usuUf: "",
                usuCep: "",
                usuFone: "",
                usuCelular: "",
                usuEmail: "",
                usuDiaaniversario: 0,
                usuMesaniversario: 0,
                usuObs: "",
                usuLogin: "",
                usuTipo: 0,
                usuPerfilacesso: 0,
                usuAcessoComercial: "",
                usuAcessoMusical: "",
                usuAcessoLocucao: "",
                usuAutorizacaoacesso: 0,
                usuIdFirebase: "",
                usuPesCodigo: 0,
                usuAcessoCloud: "S",
                tbDireitos: []
            },
            empresa: {
                empCodigo: 0,
                empNome: "",
                empCidade: "",
            },
        }
    }

    componentDidMount() {
        this.setState({ carregando: true });
        this.getUsuarios();
    }

    componentDidUpdate(prevProps) { }

    selecionarUsuario = (usuario, acao) => {
        this.setState({ usuario: usuario });
        if (acao === "Editar") {
            this.getDadosUsuario(usuario);
            this.getEmpresas();
            this.setState({ abrirEditar: true });
        } else if (acao === "Excluir") {
            this.getDadosUsuario(usuario);
            this.setState({ abrirExcluir: true });
        }
    }

    selecionarEmpresa = (empresa) => {
        this.setState({ empresa: empresa });
    }

    preparaDados = async () => {
        var dadosEditados = this.state.usuario;
        await this.setState({ usuario: this.state.usuarioInitialState });
        this.state.usuario.usuIdFirebase = dadosEditados.usuIdFirebase;
        this.state.usuario.usuAcessoCloud = dadosEditados.usuAcessoCloud;
        this.state.usuario.usuCodigo = dadosEditados.usuCodigo;
        this.state.usuario.usuNome = dadosEditados.usuNome;
        this.state.usuario.usuLogin = dadosEditados.usuLogin;
        this.state.usuario.usuSenha = dadosEditados.usuSenha;
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ usuario: { ...this.state.usuario, [name]: value } });
    }

    changeCheckbox = (event) => {
        const { name, value } = event.target;
        this.setState({ usuario: { ...this.state.usuario, [name]: value === "true" ? "S" : "N" } });
    }

    abrirFecharCadastro = () => {
        this.setState({ usuario: this.state.usuarioInitialState });
        this.setState({ abrirCadastro: !this.state.abrirCadastro });
        this.getUsuarios();
    }

    abrirFecharEditar = () => {
        this.setState({ abrirEditar: !this.state.abrirEditar });
        this.setState({ usuario: this.state.usuarioInitialState });
        this.getUsuarios();

    }

    abrirFecharExcluir = () => {
        this.setState({ abrirExcluir: !this.state.abrirExcluir });
        this.getUsuarios();
    }

    getUsuarios = async () => {
        this.setState({ carregando: true });
        await Api.get(`${usuariosUrl}`).then((response) => {
            this.setState({ usuariosData: response.data });
        }).catch((error) => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getDadosUsuario = async (usuario) => {
        await Api.get(`${usuariosUrl}detalhes/${usuario.usuCodigo}`).then((response) => {
            this.setState({ usuario: response.data });
        }).catch((error) => {
            console.log(error);
        });
    }

    getEmpresas = async () => {
        this.setState({ carregando: true });
        await Api.get(`${empresasUrl}`).then((response) => {
            this.setState({ empresasData: response.data });
            this.setState({ empresa: response.data[0] });
        }).catch((error) => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    postUsuario = async () => {
        this.setState({ carregando: true });
        if (this.state.usuario.usuNome !== "" && validator.isEmail(this.state.usuario.usuLogin) !== "" && this.state.usuario.usuSenha !== "" && this.state.usuario.usuSenha.length >= 6 && this.state.usuario.usuAcessoCloud !== "") {
            this.setState({ valido: true });
            if (this.state.usuario.usuAcessoCloud === 'false') {
                this.state.usuario.usuAcessoCloud = 'N';
            } else {
                this.state.usuario.usuAcessoCloud = 'S';
            }
            await Firebase.auth().createUserWithEmailAndPassword(this.state.usuario.usuLogin, this.state.usuario.usuSenha).then(async (userCredential) => {
                // Signed in
                var user = userCredential.user;
                this.state.usuario.usuIdFirebase = user.uid;
                await Api.post(`${usuariosUrl}${this.state.empresa.empCodigo}`, this.state.usuario).then((response) => {
                    this.getUsuarios();
                }).catch((error) => {
                    console.log(error);
                    this.setState({ valido: false });
                    this.setState({ textoValido: "Dados de Login Inválidos" });
                    return false;
                });
                return true;
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        } else {
            this.setState({ valido: false });
            this.setState({ textoValido: "Dados de Login Inválidos" });
            return false;
        }
        this.setState({ carregando: false });
        return true;
    }

    putUsuario = async () => {
        this.setState({ carregando: true });
        await this.preparaDados();
        await Api.put(`${usuariosUrl}${this.state.usuario.usuCodigo}`, this.state.usuario).then((response) => {
            this.getUsuarios();
        }).catch((error) => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    deleteVendedor = async () => {
        await Firebase.auth()
            .signInWithEmailAndPassword(this.state.usuario.usuLogin, this.state.usuario.usuSenha)
            .then((response) => {
                var user = response.user;
                Firebase.auth().currentUser.delete().then(() => {
                    Api.delete(`${usuariosUrl}${this.state.usuario.usuCodigo}`).then((response) => {
                        this.getUsuarios();
                        this.setState({ abrirExcluir: false });
                    }).catch((error) => {
                        console.log(error);
                        return false;
                    });
                }).catch((error) => {
                    console.log(error);
                    return false;
                });
                return true;
            });

    }

    render() {
        return (
            <React.Fragment >
                <FormModel
                    titulo="Cadastro Usuários"
                    subtitulo="Omega Agenda Comercial"
                    icone="user"
                    tipoContainer="form-container"
                    Cabecalho="Usuários"
                    BotaoAdd="Adicionar Usuário"
                    dadosApi={this.state.usuariosData}
                    getDados={this.getUsuarios}
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
                    nome={"Usuário"}
                    abrir={this.state.abrirCadastro}
                    funcAbrir={this.abrirFecharCadastro}
                    funcPost={this.postUsuario}
                >
                    {this.state.valido ? <form className="row g-3 form-group">
                        <div className="col-md-5">
                            <label htmlFor="empresa" className="form-label">Empresa</label>
                            <select id="empresa" className="form-select" name="empCodigo" value={this.state.usuario.usuAcessoCloud} onChange={this.handleChange}>
                                {this.state.empresasData.map((empresa) => (
                                    <option value={empresa.empCodigo}>{empresa.empNome} - {empresa.empCidade}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-7">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" name="usuNome" value={this.state.usuario.usuNome} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Login</label>
                            <input type="email" className="form-control" id="email" name="usuLogin" value={this.state.usuario.usuLogin} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <input type="password" className="form-control" id="password" name="usuSenha" value={this.state.usuario.usuSenha} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select id="status" className="form-select" name="usuAcessoCloud" value={this.state.usuario.usuAcessoCloud} onChange={this.handleChange}>
                                <option value={true}>Ativo</option>
                                <option value={false}>Inativo</option>
                            </select>
                        </div>
                    </form>
                        :
                        <form className="row g-3 form-group">
                            <div className="alert alert-danger d-flex align-items-center h-25" role="alert">
                                <div>
                                    <i className="fa fa-exclamation-triangle"> {this.state.textoValido}</i>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <label htmlFor="empresa" className="form-label">Empresa</label>
                                <select id="empresa" className="form-select" name="empCodigo" value={this.state.empresa.empCodigo} onChange={this.selecionarEmpresa}>
                                    {this.state.empresasData.map((empresa) => (
                                        <option value={empresa.empCodigo}>{empresa.empNome} - {empresa.empCidade}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-7">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="nome" name="usuNome" value={this.state.usuario.usuNome} onChange={this.handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Login</label>
                                <input type="email" className="form-control" id="email" name="usuLogin" value={this.state.usuario.usuLogin} onChange={this.handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="password" name="usuSenha" value={this.state.usuario.usuSenha} onChange={this.handleChange} />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select id="status" className="form-select" name="usuAcessoCloud" value={this.state.usuario.usuAcessoCloud} onChange={this.changeCheckbox}>
                                    <option value={true}>Ativo</option>
                                    <option value={false}>Inativo</option>
                                </select>
                            </div>
                        </form>
                    }

                </FormInserir>
                <FormEditar
                    nome={"Usuário"}
                    abrir={this.state.abrirEditar}
                    funcAbrir={this.abrirFecharEditar}
                    funcPut={this.putUsuario}
                >
                    <form className="row g-3 form-group">
                        <div className="col-md-5">
                            <label htmlFor="empresa" className="form-label">Empresa</label>
                            <select id="empresa" className="form-select" name="empCodigo" value={this.state.empresa.empCodigo} onChange={this.selecionarEmpresa}>
                                {this.state.empresasData.map((empresa) => (
                                    <option key={empresa.empCodigo} value={empresa.empCodigo}>{empresa.empNome} - {empresa.empCidade}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-7">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" name="usuNome" value={this.state.usuario.usuNome} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Login</label>
                            <input type="email" className="form-control" id="email" name="usuLogin" value={this.state.usuario.usuLogin} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <input type="password" className="form-control" id="password" name="usuSenha" value={this.state.usuario.usuSenha} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select id="status" className="form-select" name="usuAcessoCloud" value={this.state.usuario.usuAcessoCloud === 'S' ? true : false} onChange={this.changeCheckbox}>
                                <option value={true}>Ativo</option>
                                <option value={false}>Inativo</option>
                            </select>
                        </div>
                    </form>
                </FormEditar>
                <FormExcluir
                    nome={"Usuário"}
                    abrir={this.state.abrirExcluir}
                    dados={this.state.usuario.usuNome}
                    funcDelete={this.deleteVendedor}
                    funcAbrir={this.abrirFecharExcluir}
                />
            </React.Fragment >
        );
    }
}

export default Usuarios;