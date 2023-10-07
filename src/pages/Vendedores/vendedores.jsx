import React from "react";
import validator from 'validator'
import InputMask from 'react-input-mask';

import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

import AxiosConnection from "../../services/AxiosConnection";

import Firebase from "../../services/Firebase";

import { BsFillShieldLockFill } from "react-icons/bs";

import { pessoaUrl } from "../../services/RotasApi";
import FormAcesso from "../../forms/FormAcesso";
import { Alert } from "reactstrap";

class Vendedores extends React.Component {
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
            vendedoresData: [],
            usuarioData: [],
            vendedoresInitialState: {
                pesCodigo: 0,
                pesNome: "",
                pesEmail: "",
                pesFone: "",
                pesComissao: 0,
                pesStatus: "",
            },
            usuarioInitialState: {
                usuCodigo: 0,
                usuNome: "",
                usuSenha: "",
                usuFuncao: "",
                usuEndereco: "",
                usuBairro: "",
                usuCidade: "",
                usuUf: "",
                usuCep: "'",
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
                usuAcessoCloud: "N",
                usuAutorizacaoacesso: 0,
                usuIdFirebase: "",
                usuPesCodigo: 0,
                tbDireitos: []
            },
            pessoaInitialState: {
                pesCodigo: 0,
                atiCodigo: 0,
                pesNome: "",
                pesEndereco: null,
                pesBairro: null,
                pesCidade: null,
                pesEstado: null,
                pesCgccpf: "",
                pesInscricao: null,
                pesCep: null,
                pesFone: null,
                pesFax: null,
                pesRazaosocial: null,
                pesEmail: "",
                pesWeb: null,
                pesPessoa: "F",
                pesCelular: "",
                pesAnivdia: null,
                pesAnivmes: null,
                //TODO Statuc = C - CLiente \\ E - Ex-Cliente
                pesStatus: "C",
                pesCliente: "N",
                pesFornecedor: "N",
                pesVendedor: "S",
                pesFuncionario: "N",
                pesComissao: null,
                //TODO Empresa = 8 - Omega
                empCodigo: localStorage.getItem("Codigo"),
                pesNumero: null,
                pesObservacao: null,
                pesContato: null,
                pesClientedesde: null,
                pesGuid: null,
                empCodigoNavigation: null,
                tbAgendacomercials: [],
                tbComissionadoscontratos: [],
                tbContasrecebers: [],
                tbContratos: []
            },
            vendedor: {
                pesCodigo: 0,
                pesNome: "",
                pesEmail: "",
                pesFone: "",
                pesCelular: "",
                pesComissao: 0,
                pesStatus: "",
                pesCgccpf: "",
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
                usuCep: "'",
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
                usuAcessoCloud: "N",
                usuAutorizacaoacesso: 0,
                usuIdFirebase: "",
                usuPesCodigo: 0,
                tbDireitos: []
            },
            pessoa: {
                pesCodigo: 0,
                atiCodigo: 0,
                pesNome: "",
                pesEndereco: null,
                pesBairro: null,
                pesCidade: null,
                pesEstado: null,
                pesCgccpf: "",
                pesInscricao: null,
                pesCep: null,
                pesFone: null,
                pesFax: null,
                pesRazaosocial: null,
                pesEmail: "",
                pesWeb: null,
                pesPessoa: "F",
                pesCelular: "",
                pesAnivdia: null,
                pesAnivmes: null,
                //TODO Statuc = C - CLiente \\ E - Ex-Cliente
                pesStatus: "C",
                pesCliente: "N",
                pesFornecedor: "N",
                pesVendedor: "S",
                pesFuncionario: "N",
                pesComissao: null,
                //TODO Empresa = 8 - Omega
                empCodigo: localStorage.getItem("Codigo"),
                pesNumero: null,
                pesObservacao: null,
                pesContato: null,
                pesClientedesde: null,
                pesGuid: null,
                empCodigoNavigation: null,
                tbAgendacomercials: [],
                tbComissionadoscontratos: [],
                tbContasrecebers: [],
                tbContratos: []
            }
        }
    }

    componentDidMount() {
        this.setState({ carregando: true });
        this.getVendedores();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.vendedoresData !== this.state.vendedoresData) {
            this.setState({ vendedoresData: this.state.vendedoresData });
        }
        if (prevState.vendedoresInitialState !== this.state.vendedoresInitialState) {
            this.setState({ vendedoresInitialState: this.state.vendedoresInitialState });
        }
        if (prevState.vendedor !== this.state.vendedor) {
            this.setState({ vendedor: this.state.vendedor });
        }
    }

    changeCadastro = (event) => {
        const { name, value } = event.target;
        this.setState({ pessoa: { ...this.state.pessoa, [name]: value } });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ vendedor: { ...this.state.vendedor, [name]: value } });
    }

    handleChangeLogin = (event) => {
        if (event.target.name === "usuLogin") {
            this.setState({ vendedor: { ...this.state.vendedor, pesEmail: event.target.value } });
        }
        const { name, value } = event.target;
        this.setState({ usuario: { ...this.state.usuario, [name]: value } });
    }

    selecionarVendedor = async (vendedor, tipo) => {
        this.setState({ vendedor: vendedor });
        if (tipo === "Editar") {
            await this.getVendedorCodigo(vendedor.pesCodigo);
            this.setState({ abrirEditar: !this.state.abrirEditar });
        } else if (tipo === "Excluir") {
            this.setState({ abrirExcluir: !this.state.abrirExcluir });
        } else if (tipo === "Acesso") {
            var retorno = await this.getUsuarios(vendedor.pesCodigo);
            if (retorno.length == undefined) {
                this.setState({ usuario: retorno });
            } else {
                this.setState({ usuario: this.state.usuarioInitialState });
            }
            this.setState({ abrirAcesso: !this.state.abrirAcesso });
        }
    }

    prepararDados = (tipo) => {
        this.state.pessoa.pesCodigo = this.state.vendedor.pesCodigo;
        this.state.pessoa.pesNome = this.state.vendedor.pesNome;
        this.state.pessoa.pesEmail = this.state.vendedor.pesEmail;
        this.state.pessoa.pesFone = this.state.vendedor.pesFone;
        this.state.pessoa.pesCelular = this.state.vendedor.pesCelular;
        this.state.pessoa.pesCgccpf = this.state.vendedor.pesCgccpf;
        this.state.pessoa.pesComissao = this.state.vendedor.pesComissao;
        this.state.pessoa.pesStatus = this.state.vendedor.pesStatus;
        this.setState({ pessoa: this.state.pessoa });
        if (tipo === "P") {
            return this.postVendedor();
        } else {
            return this.putVendedor();
        }
    }

    criarUsuario = async (email, senha) => {
        var retorno = await Firebase.auth().createUserWithEmailAndPassword(email, senha).catch((error) => {
            console.log(error);
        });
        return retorno;
    }

    postUsuario = async (url) => {
        this.setState({ carregando: true });
        if (this.state.usuario.usuLogin == "") {
            this.state.usuario.usuLogin = this.state.vendedor.pesEmail;
        }
        if (this.state.usuario.usuPesCodigo == 0) {
            this.state.usuario.usuPesCodigo = this.state.vendedor.pesCodigo;
        }
        var idUsuarioFirebase = await this.criarUsuario(this.state.usuario.usuLogin, this.state.usuario.usuSenha);
        if (idUsuarioFirebase != undefined) {
            this.state.usuario.usuIdFirebase = idUsuarioFirebase.user.uid;
            let retorno;
            var response = await AxiosConnection.post(`${pessoaUrl}usuario`, this.state.usuario).then(response => {
                retorno = response.status;
            }).catch((error) => {
                console.log(error);
            });
            // if (retorno === 200) {
            //     // var idUsuarioFirebase = await this.criarUsuario(this.state.usuario.usuLogin, this.state.usuario.usuSenha)
            // }
        }
        // this.atualizarDados(this.state.usuario, `${pessoaUrl}usuario`);
        this.setState({ carregando: false });
    }

    postVendedor = async () => {
        this.setState({ carregando: true });
        await AxiosConnection.post("pessoa", this.state.pessoa).then(response => {
            return true;
        }).catch((error) => {
            console.log(error);
            return false;
        });
        this.setState({ pessoa: this.state.pessoaInitialState });
        this.setState({ carregando: false });
    }

    // atualizarDados = async (dados, url) => {
    //     this.setState({ carregando: true });
    //     await Api.put(url, dados).then(response => {
    //         console.log(response.data);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    //     this.setState({ carregando: false });
    // }

    putUsuario = async () => {
        if (validator.isEmail(this.state.usuario.usuLogin)) {
            if (this.state.usuario.usuSenha.length >= 6) {
                this.setState({ valido: true });
                if (this.usuarioData > 0) {
                    this.atualizarDados(this.state.usuario, `${pessoaUrl}usuario/${this.state.usuario.usuPesCodigo}`);
                } else {
                    this.postUsuario();
                }
            } else {
                this.setState({ textoValido: "Digite uma senha com no mínimo 6 caracteres." });
                this.setState({ valido: false });
                return false;
            }
        } else {
            this.setState({ textoValido: "Digite um Email válido." });
            this.setState({ valido: false });
            return false;
        }
        return true;

    }

    putVendedor = async () => {
        this.setState({ carregando: true });
        await AxiosConnection.put(`${pessoaUrl}${this.state.pessoa.pesCodigo}`, this.state.pessoa).then(response => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
        this.setState({ pessoa: this.state.pessoaInitialState });
        this.setState({ carregando: false });
    }

    getVendedores = async () => {
        this.setState({ carregando: true });
        var url = `${pessoaUrl}vendedores/${localStorage.getItem("Codigo")}`;
        await AxiosConnection.get(url).then(response => {
            this.setState({ vendedoresData: response.data });
            this.setState({ carregando: false });
        }).catch((error) => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    getUsuarios = async (idUsuario) => {
        this.setState({ carregando: true });
        var url = `${pessoaUrl}usuario/${idUsuario}`;
        var retorno = [];
        await AxiosConnection.get(url).then(response => {
            retorno = response.data;
        }).catch((error) => {
            console.log(error);
        });
        this.setState({ carregando: false });
        return retorno;
    }

    getVendedorNome = () => { }

    getVendedorCodigo = async (codigo) => {
        this.setState({ carregando: true });
        var url = `${pessoaUrl}vendedor/${codigo}`;
        await AxiosConnection.get(url).then(response => {
            console.log(response.data);
            this.setState({ vendedor: response.data });
            this.setState({ carregando: false });
        }).catch((error) => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    deleteUsuario = async () => {
        this.setState({ carregando: true });
        await AxiosConnection.delete(`${pessoaUrl}usuario/${this.state.vendedor.pesCodigo}`).then(response => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    deleteVendedor = async () => {
        this.setState({ carregando: true });
        await AxiosConnection.delete(`${pessoaUrl}${this.state.vendedor.pesCodigo}`).then(response => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
        this.setState({ carregando: false });
    }

    abrirFecharCadastro = () => {
        this.setState({ abrirCadastro: !this.state.abrirCadastro });
        this.setState({ vendedor: this.state.vendedoresInitialState });
        this.getVendedores();
    }

    abrirFecharEditar = () => {
        this.setState({ abrirEditar: !this.state.abrirEditar });
        this.setState({ vendedor: this.state.vendedoresInitialState });
        this.getVendedores();
    }

    abrirFecharExcluir = () => {
        this.setState({ abrirExcluir: !this.state.abrirExcluir });
        this.setState({ vendedor: this.state.vendedoresInitialState });
        this.getVendedores();
    }

    abrirFecharAcesso = () => {
        this.setState({ abrirAcesso: !this.state.abrirAcesso });
        this.setState({ vendedorLogin: this.state.usuarioInitialState });
        this.setState({ valido: true });
        this.getVendedores();
    }

    render() {
        return (
            <React.Fragment>
                <FormModel
                    urlApi={"http://localhost:3000/vendedores"}
                    titulo="Cadastro Vendedores"
                    subtitulo="Omega Agenda Comercial"
                    icone="user"
                    tipoContainer="form-container"
                    Cabecalho="Vendedores"
                    BotaoAdd="Adicionar Vendedor"
                    dadosApi={this.state.vendedoresData}
                    getDados={this.getVendedores}
                    getByNome={this.getVendedorNome}
                    funcAbrirCadastro={this.abrirFecharCadastro}
                    colunas={[
                        { nome: "Nome" },
                        { nome: "Telefone" },
                        { nome: "Comissão" },
                        { nome: "Ativo" },
                        { nome: "Acesso" },
                    ]}
                >
                    {this.state.carregando ? <div className="spinner-border loader" role="status" />
                        :
                        <tbody>
                            {this.state.vendedoresData.map((vendedor) => (
                                <tr key={vendedor.pesCodigo}>
                                    <td className="pt-3">{vendedor.pesNome}</td>
                                    <td className="pt-3">{vendedor.pesFone}</td>
                                    <td className="pt-3">{vendedor.pesComissao} %</td>
                                    <td className="pt-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" checked={vendedor.pesStatus} value={true} />
                                        </div>
                                    </td>
                                    <td>
                                        {/*                                         <Link className="text-decoration-none" to={"/atividades"} state={{ codigo: (vendedor.pesCodigo) }}> */}
                                        <td className="pl-5 pt-3 listar" onClick={() => this.selecionarVendedor(vendedor, "Acesso")}><BsFillShieldLockFill /></td>
                                        {/*                                         </Link> */}
                                    </td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => this.selecionarVendedor(vendedor, "Editar")}>
                                            <i className="fa fa-pencil"></i>
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => this.selecionarVendedor(vendedor, "Excluir")}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </FormModel>
                <FormInserir
                    nome={"Vendedor"}
                    abrir={this.state.abrirCadastro}
                    funcAbrir={this.abrirFecharCadastro}
                    funcPost={this.prepararDados}
                >
                    <form className="row g-3 form-group">
                        <div className="col-md-4">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" name="pesNome" value={this.state.pessoa.pesNome} onChange={this.changeCadastro} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="pesEmail" value={this.state.pessoa.pesEmail} onChange={this.changeCadastro} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="telefone" className="form-label">Telefone</label>
                            <input type="text" className="form-control" id="telefone" name="pesFone" value={this.state.pessoa.pesFone} onChange={this.changeCadastro} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="celular" className="form-label">Celular</label>
                            <input type="text" className="form-control" id="celular" name="pesCelular" value={this.state.pessoa.pesCelular} onChange={this.changeCadastro} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="cpf" className="form-label">CPF</label>
                            <input type="text" className="form-control" id="cpf" name="pesCgccpf" value={this.state.pessoa.pesCgccpf} onChange={this.changeCadastro} />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="comissao" className="form-label">Comissão %</label>
                            <input type="number" className="form-control" id="comissao" name="pesComissao" value={this.state.pessoa.pesComissao} onChange={this.changeCadastro} />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select id="status" className="form-select" name="pesStatus" value={this.state.pessoa.pesStatus} onChange={this.changeCadastro}>
                                <option value={true}>Ativo</option>
                                <option value={false}>Inativo</option>
                            </select>
                        </div>
                    </form>
                </FormInserir>
                <FormEditar
                    nome={"Vendedor"}
                    abrir={this.state.abrirEditar}
                    funcAbrir={this.abrirFecharEditar}
                    funcPut={this.prepararDados}
                >
                    <form className="row g-3 form-group">
                        <div className="col-md-4">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="nome" name="pesNome" value={this.state.vendedor.pesNome} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="pesEmail" value={this.state.vendedor.pesEmail} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="telefone" className="form-label">Telefone</label>
                            <input type="text" className="form-control" id="telefone" name="pesFone" value={this.state.vendedor.pesFone} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="celular" className="form-label">Celular</label>
                            <input type="text" className="form-control" id="celular" name="pesCelular" value={this.state.vendedor.pesCelular} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="cpf" className="form-label">CPF</label>
                            <input type="text" className="form-control" id="cpf" name="pesCgccpf" value={this.state.vendedor.pesCgccpf} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="comissao" className="form-label">Comissão %</label>
                            <input type="number" className="form-control" id="comissao" name="pesComissao" value={this.state.vendedor.pesComissao} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select id="status" className="form-select" name="pesStatus" value={this.state.vendedor.pesStatus} onChange={this.handleChange}>
                                <option value={true}>Ativo</option>
                                <option value={false}>Inativo</option>
                            </select>
                        </div>
                    </form>
                </FormEditar>
                <FormExcluir
                    nome={"Vendedor"}
                    abrir={this.state.abrirExcluir}
                    dados={this.state.vendedor.pesNome}
                    funcDelete={this.deleteVendedor}
                    funcAbrir={this.abrirFecharExcluir}
                />
                <FormAcesso
                    nome={this.state.vendedor.pesNome}
                    abrir={this.state.abrirAcesso}
                    funcAbrir={this.abrirFecharAcesso}
                    funcPut={this.putUsuario}
                >
                    {!this.state.valido ?
                        <form className="row g-3 form-group">
                            <div className="alert alert-danger d-flex align-items-center h-25" role="alert">
                                <div>
                                    <i className="fa fa-exclamation-triangle"> {this.state.textoValido}</i>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="nome" className="form-label">Usuário</label>
                                <input type="text" className="form-control" id="nome" name="usuLogin" value={this.state.usuario.usuLogin == "" ? this.state.vendedor.pesEmail : this.state.usuario.usuLogin} onChange={this.handleChangeLogin} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="password" name="usuSenha" value={this.state.usuario.usuSenha} onChange={this.handleChangeLogin} />
                            </div>

                        </form>
                        :
                        <form className="row g-3 form-group">
                            <div className="col-md-6">
                                <label htmlFor="nome" className="form-label">Usuário</label>
                                <input type="text" className="form-control" id="nome" name="usuLogin" value={this.state.usuario.usuLogin == "" ? this.state.vendedor.pesEmail : this.state.usuario.usuLogin} onChange={this.handleChangeLogin} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <input type="password" className="form-control" id="password" name="usuSenha" value={this.state.usuario.usuSenha} onChange={this.handleChangeLogin} />
                            </div>

                        </form>
                    }
                </FormAcesso>
            </React.Fragment>
        );
    }
}

export default Vendedores;