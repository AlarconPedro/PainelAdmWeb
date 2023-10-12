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
            abrirCadastro: false,
            carregando: true,
            valido: true,
            pessoasData: [],
            comunidadeData: [],
            pessoaInitialState: {
                pesCodigo: 0,
                pesNome: "",
                pesGenero: "",
                comCodigo: 0,
            },
            pessoa: {
                pesCodigo: 0,
                pesNome: "",
                pesGenero: "",
                comCodigo: 0,
            },
            comunidade: {
                comCodigo: 0,
                comNome: "",
                comCidade: "",
                comUF: "",
            },
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ pessoa: { ...this.state.pessoa, [name]: value } });
    }

    abrirFecharCadastro = () => {
        this.setState({ abrirCadastro: !this.state.abrirCadastro });
        this.getPessoas();
    }

    abrirFecharEditar = () => {
        this.setState({ abrirEditar: !this.state.abrirEditar });
        this.getPessoas();
    }

    abrirFecharExcluir = () => {
        this.setState({ abrirExcluir: !this.state.abrirExcluir });
        this.getPessoas();
    }

    selecionarPessoa = (pessoa, operacao) => {
        this.setState({ pessoa: pessoa });
        if (operacao === "Editar") {
            this.abrirFecharEditar();
        } else {
            this.abrirFecharExcluir();
        }
    }

    getPessoasApi = async () => {
        let pessoas = await apiPessoa.getPessoas();
        this.setState({ pessoasData: pessoas });
    }

    getPessoas = async () => {
        this.setState({ carregando: true });
        let pessoas = await apiPessoa.getPessoas();
        this.setState({ pessoasData: pessoas, carregando: false });
    }

    getPessoaId = async (id) => {
        let pessoa = await apiPessoa.getPessoa(id);
        this.setState({ pessoa: pessoa, carregando: false });
    }

    postPessoa = async (pessoa) => {
        this.setState({ carregando: true });
        await apiPessoa.postPessoa(pessoa);
        this.abrirFecharCadastro();
        this.setState({ carregando: false });
    }

    putPessoa = async (pessoa) => {
        this.setState({ carregando: true });
        await apiPessoa.putPessoa(pessoa);
        this.abrirFecharEditar();
        this.setState({ carregando: false });
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
                                <td className="pt-3">{pessoa.pesGenero}</td>
                                <td className="pt-3">{pessoa.comCodigo}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => this.selecionarPessoa(pessoa, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => this.selecionarPessoa(pessoa, "Excluir")}>
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
                    funcPost={this.postPessoa}
                >
                    {this.state.valido ?
                        <form className="row g-3 form-group">
                            <div className="col-md-7">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="nome" name="usuNome" value={this.state.pessoa.pesNome} onChange={this.handleChange} />
                            </div>
                            <div className="col-md-5">
                                <label htmlFor="comunidade" className="form-label">Comunidade</label>
                                <select id="comunidade" className="form-select" name="comCodigo" value={this.state.pessoa.comCodigo} onChange={this.handleChange}>
                                    {this.state.comunidadeData.map((comunidade) => (
                                        <option value={comunidade.comCodigo}>{comunidade.comNome} - {comunidade.comCidade}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="status" className="form-label">Gênero</label>
                                <select id="status" className="form-select" name="pesGenero" value={this.state.pessoa.pesGenero} onChange={this.handleChange}>
                                    <option value={"M"}>Masculino</option>
                                    <option value={"F"}>Feminino</option>
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
                        </form>}
                </FormInserir>
                <FormEditar
                    nome={"Pessoas"}
                    abrir={this.state.abrirEditar}
                    funcAbrir={this.abrirFecharEditar}
                    funcPut={this.putPessoa}
                >
                    {this.state.valido ?
                        <form className="row g-3 form-group">
                            <div className="col-md-7">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="nome" name="pesNome" value={this.state.pessoa.pesNome} onChange={this.handleChange} />
                            </div>
                            <div className="col-md-5">
                                <label htmlFor="comunidade" className="form-label">Comunidade</label>
                                <select id="comunidade" className="form-select" name="comCodigo" value={this.state.pessoa.comCodigo} onChange={this.handleChange}>
                                    {this.state.comunidadeData.map((comunidade) => (
                                        <option value={comunidade.comCodigo}>{comunidade.comNome} - {comunidade.comCidade}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="status" className="form-label">Gênero</label>
                                <select id="status" className="form-select" name="pesGenero" value={this.state.pessoa.pesGenero} onChange={this.handleChange}>
                                    <option value={"M"}>Masculino</option>
                                    <option value={"F"}>Feminino</option>
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
                        </form>}
                </FormEditar>
            </React.Fragment>
        );
    }
}
export default Pessoas;