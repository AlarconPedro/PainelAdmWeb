import React from "react";

import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

import ApiPessoas from "../../services/ApiRoutes/ApiPessoas";
import ApiComunidade from "../../services/ApiRoutes/ApiComunidade";

import AlertDialogDemo from "../../componentes/Alert/AlertDialog";

class Pessoas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrirCadastro: false,
            carregando: true,
            valido: true,
            abrirDialog: false,
            pessoasData: [],
            comunidadeData: [],
            pessoaInitialState: {
                pesCodigo: 0,
                pesNome: "",
                pesGenero: "",
                comCodigo: 0,
                pesResponsavel: "N",
                pesCatequista: "N",
                pesSalmista: "N",
            },
            pessoa: {
                pesCodigo: 0,
                pesNome: "",
                pesGenero: "M",
                comCodigo: 0,
                pesResponsavel: "N",
                pesCatequista: "N",
                pesSalmista: "N",
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

    handleCheck = (event) => {
        const { name, checked } = event.target;
        this.setState({ pessoa: { ...this.state.pessoa, [name]: checked ? "S" : "N" } });
    }

    abrirFecharCadastro = async () => {
        await this.getComunidades();
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

    abrirFecharDialog = () => {
        this.setState({ abrirDialog: !this.state.abrirDialog });
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

    getComunidades = async () => {
        let comunidade = await ApiComunidade.getComunidade();
        this.setState({ comunidadeData: comunidade, pessoa: { ...this.state.pessoa, comCodigo: comunidade[0].comCodigo } });
    }

    getPessoasApi = async () => {
        let pessoas = await ApiPessoas.getPessoas();
        this.setState({ pessoasData: pessoas });
    }

    getPessoas = async () => {
        this.setState({ carregando: true });
        let pessoas = await ApiPessoas.getPessoas();
        this.setState({ pessoasData: pessoas, carregando: false });
    }

    getPessoaId = async (id) => {
        let pessoa = await ApiPessoas.getPessoa(id);
        this.setState({ pessoa: pessoa, carregando: false });
    }

    postPessoa = async () => {
        let retorno;
        this.setState({ carregando: true });
        retorno = await ApiPessoas.postPessoa(this.state.pessoa);
        if (retorno === 200) {
            this.setState({ valido: true });
            this.setState({ pessoa: this.state.pessoaInitialState });
            this.abrirFecharCadastro();
        } else {
            this.setState({ valido: false, textoValido: "Erro ao cadastrar Pessoa !" });
        }
        this.setState({ carregando: false });
    }

    putPessoa = async (pessoa) => {
        this.setState({ carregando: true });
        await ApiPessoas.putPessoa(pessoa);
        this.abrirFecharEditar();
        this.setState({ carregando: false });
    }

    deletePessoa = async () => {
        let retorno;
        this.setState({ carregando: true });
        try {
            retorno = await ApiPessoas.deletePessoa(this.state.pessoa.pesCodigo);
            if (retorno === 200) {
                this.setState({ valido: true });
                this.setState({ pessoa: this.state.pessoaInitialState });
                this.abrirFecharExcluir();
            }
        } catch {
            this.setState({ valido: false, textoValido: "Pessoa não pode ser excluída, pois está vinculada a uma turma !" });
            this.setState({ abrirDialog: true });
            this.abrirFecharExcluir();
        }
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
                        { nome: "Responsável" },
                        { nome: "Catequista" },
                        { nome: "Salmista" },
                    ]}
                >
                    <tbody>
                        {this.state.pessoasData.map((pessoa) => (
                            <tr key={pessoa.pesCodigo}>
                                <td className="pt-3">{pessoa.pesNome}</td>
                                <td className="pt-3">{pessoa.pesGenero}</td>
                                <td className="pt-3">{pessoa.comunidade}</td>
                                <td className="pt-3">
                                    <input className="form-check-input" type="checkbox" id="pesResponsavel" value="pesResponsavel" checked={pessoa.pesResponsavel === "S" ? true : false} />
                                </td>
                                <td className="pt-3">
                                    <input className="form-check-input" type="checkbox" id="pesCatequista" value="pesCatequista" checked={pessoa.pesCatequista === "S" ? true : false} />
                                </td>
                                <td className="pt-3">
                                    <input className="form-check-input" type="checkbox" id="pesSalmista" value="pesSalmista" checked={pessoa.pesSalmista === "S" ? true : false} />
                                </td>
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
                            <div className="col-md-5">
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
                            <div className="col-md-9">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="pesResponsavel" value="pesResponsavel" name="pesResponsavel" onChange={this.handleCheck} />
                                    <label className="form-check-label ml-2" for="pesResponsavel">Responsável</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="pesCatequista" value="pesCatequista" name="pesCatequista" onChange={this.handleCheck} />
                                    <label className="form-check-label" for="pesCatequista">Catequista</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="pesSalmista" value="pesSalmista" name="pesSalmista" onChange={this.handleCheck} />
                                    <label className="form-check-label" for="pesSalmista">Salmista</label>
                                </div>
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
                            <div className="col-md-5">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="nome" name="pesNome" value={this.state.pessoa.pesNome} onChange={this.handleChange} />
                            </div>
                            <div className="col-md-5">
                                <label htmlFor="comunidade" className="form-label">Comunidade</label>
                                <select id="comunidade" className="form-select" name="comCodigo" value={this.state.pessoa.comCodigo} onChange={this.handleChange}>
                                    <option value={"X"}>Escolha a Comunidade</option>
                                    {this.state.comunidadeData.map((comunidade) => (
                                        <option value={comunidade.comCodigo}>{comunidade.comNome} - {comunidade.comCidade}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="status" className="form-label">Gênero</label>
                                <select id="status" className="form-select" name="pesGenero" value={this.state.pessoa.pesGenero} onChange={this.handleChange}>
                                    <option value={"X"}>Escolha o Sexo</option>
                                    <option value={"M"}>Masculino</option>
                                    <option value={"F"}>Feminino</option>
                                </select>
                            </div>
                            <div className="col-md-9">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="pesResponsavel" value="pesResponsavel" onChange={this.handleChange} />
                                    <label className="form-check-label ml-2" for="pesResponsavel">Responsável</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="pesCatequista" value="pesCatequista" onChange={this.handleChange} />
                                    <label className="form-check-label" for="pesCatequista">Catequista</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" id="pesSalmista" value="pesSalmista" onChange={this.handleChange} />
                                    <label className="form-check-label" for="pesSalmista">Salmista</label>
                                </div>
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
                <FormExcluir
                    nome={"Pessoas"}
                    abrir={this.state.abrirExcluir}
                    funcAbrir={this.abrirFecharExcluir}
                    funcDelete={this.deletePessoa}
                    dados={this.state.pessoa.pesNome}
                />
                <AlertDialogDemo
                    abrir={this.state.abrirDialog}
                    acaoBotao={this.abrirFecharDialog}
                    titulo={"Erro ao excluir Pessoa"}
                    descricao={"Pessoa não pode ser excluída, pois está vinculada a um Evento !"}
                />
            </React.Fragment >
        );
    }
}
export default Pessoas;