import React from "react";

import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

import ApiQuartos from "../../services/ApiRoutes/ApiQuartos";

import { BsFillShieldLockFill } from "react-icons/bs";

import FormAcesso from "../../forms/FormAcesso";
import { Alert } from "reactstrap";

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
            quartoInitialState: {
                quaCodigo: 0,
                quaNome: "",
                bloCodigo: 0,
                quaQtdcamas: 0,
                bloCodigoNavigation: {},
                tbEventoQuartos: [],
                tbQuartoPessoas: []
            },
            quarto: {
                quaCodigo: 0,
                quaNome: "",
                bloCodigo: 0,
                quaQtdcamas: 0,
                bloCodigoNavigation: {},
                tbEventoQuartos: [],
                tbQuartoPessoas: []
            },
        }
    }

    componentDidMount() {
        this.setState({ carregando: true });
        this.getVendedores();
    }

    changeCadastro = (event) => {
        const { name, value } = event.target;
        this.setState({ pessoa: { ...this.state.pessoa, [name]: value } });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ quarto: { ...this.state.quarto, [name]: value } });
    }

    selecionaQuarto = async (quarto, tipo) => {
        this.setState({ quarto: quarto });
        if (tipo === "Editar") {
            await this.getVendedorCodigo(quarto.quaCodigo);
            this.setState({ abrirEditar: !this.state.abrirEditar });
        } else if (tipo === "Excluir") {
            this.setState({ abrirExcluir: !this.state.abrirExcluir });
        }
    }

    abrirFecharCadastro = () => {
        this.setState({ abrirCadastro: !this.state.abrirCadastro });
        this.setState({ vendedor: this.state.vendedoresInitialState });
        this.getQuartos();
    }
    abrirFecharEditar = () => {
        this.setState({ abrirEditar: !this.state.abrirEditar });
        this.setState({ vendedor: this.state.vendedoresInitialState });
        this.getQuartos();
    }

    abrirFecharExcluir = () => {
        this.setState({ abrirExcluir: !this.state.abrirExcluir });
        this.setState({ vendedor: this.state.vendedoresInitialState });
        this.getQuartos();
    }

    getQuartos = async () => {
        this.setState({ carregando: true })
        let quartos = await ApiQuartos.getQuartos();
        this.setState({ quartoData: quartos, carregando: false })
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
                        { nome: "Nome do Bloco" },
                        { nome: "Qtd. Camas" },
                    ]}
                >
                    <tbody>
                        {this.state.quartoData.map((quarto) => (
                            <tr key={quarto.quaCodigo}>
                                <td className="pt-3">{quarto.quaNome}</td>
                                <td className="pt-3">{quarto.bloCodigo}</td>
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
                    nome={"Quarto"}
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
                    nome={"Quarto"}
                    abrir={this.state.abrirExcluir}
                    dados={this.state.quarto.quaNome}
                    funcDelete={this.deleteVendedor}
                    funcAbrir={this.abrirFecharExcluir}
                />
            </React.Fragment>
        );
    }
}

export default Quarto;