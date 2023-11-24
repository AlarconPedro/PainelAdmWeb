import React from "react";

import Mestre from "../../estrutura/Mestre";

import ApiAlocacao from "../../services/ApiRoutes/ApiAlocacao";

import DualListBox from 'react-dual-listbox';

class DistribuirQuartos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            carregando: false,
            pessoasComunidade: [],
            pessoasQuarto: [],
            eventos: [],
            blocos: [],
            comunidades: [],
            quartos: [],
            quartoInitialState: 0,
            quartoSelecionado: 0,
            comunidadeInitialState: 0,
            comunidadeSelecionada: 0,
            eventoInitialState: 0,
            eventoSelecionado: 0,
            blocoInitialState: 0,
            blocoSelecionado: 0,
            modelPessoaQuartoInitialState: {
                qupCodigo: 0,
                pesCodigo: 0,
                quaCodigo: 0
            },
            modelPessoaQuarto: {
                qupCodigo: 0,
                pesCodigo: 0,
                quaCodigo: 0
            },
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.abrir !== this.props.abrir) {
            this.setState({ abrir: this.props.abrir });
        }
    }

    componentDidMount() {
        this.buscaDados();
    }

    buscaDados = () => {
        this.buscarEventos();
    }

    selecionarCampo = (event) => {
        if (event.target.name === "eveCodigo") {
            this.setState({ eventoSelecionado: event.target.value });
            this.state.eventoSelecionado = event.target.value;
            this.buscarComunidades(event.target.value);
        }
        if (event.target.name === "comCodigo") {
            this.setState({ comunidadeSelecionada: event.target.value });
            this.state.comunidadeSelecionada = event.target.value;
            this.buscarBlocos(event.target.value);
            this.buscarPessoasComunidade(event.target.value);
        }
        if (event.target.name === "bloCodigo") {
            this.setState({ blocoSelecionado: event.target.value });
            this.state.blocoSelecionado = event.target.value;
            this.buscarQuartos(this.state.eventoSelecionado, this.state.blocoSelecionado);
        }
        if (event.target.name === "quaCodigo") {
            this.setState({ quartoSelecionado: event.target.value });
            this.state.quartoSelecionado = event.target.value;
            this.buscarPessoasQuarto(event.target.value);
            this.buscarPessoasComunidade(this.state.comunidadeSelecionada);
        }
        this.recarregaDados();
    }

    recarregaDados = () => {
        if (this.state.eventoSelecionado < 0) {
            this.buscarEventos();
        }
        if (this.state.comunidadeSelecionada < 0) {
            this.buscarComunidades();
        }
        if (this.state.blocoSelecionado < 0) {
            this.buscarBlocos();
        }
        if (this.state.quartoSelecionado < 0) {
            this.buscarQuartos();
        }
        // this.buscarQuartos();
    }

    abrirFecharCadastro = () => {
        this.setState({ abrir: this.state.abrir });
        this.props.funcAbrirCadastro(this.state.abrir);
    }

    buscarEventos = async () => {
        this.setState({ carregando: true });
        let eventos = await ApiAlocacao.getEventos();
        this.setState({ eventos: eventos, carregando: false });
    }

    buscarBlocos = async (id) => {
        this.setState({ carregando: true });
        let blocos = await ApiAlocacao.getBlocos(this.state.eventoSelecionado);
        this.setState({ blocos: blocos, carregando: false });
    }

    buscarComunidades = async (id) => {
        this.setState({ carregando: true });
        let comunidades = await ApiAlocacao.getComunidades(id);
        this.setState({ comunidades: comunidades, carregando: false });
    }

    buscarPessoasComunidade = async (id) => {
        this.setState({ carregando: true });
        let pessoasComunidade = await ApiAlocacao.getPessoasComunide(this.state.eventoSelecionado, id);
        this.atualizaDadosPessoasListBox(pessoasComunidade);
        this.setState({ carregando: false });
    }

    buscarPessoasQuarto = async (id) => {
        this.setState({ carregando: true });
        let listaPessoasAlocadas = [];
        let retorno = await ApiAlocacao.getPessoasQuarto(id);
        retorno.forEach((pessoa) => {
            listaPessoasAlocadas.push(pessoa.pesCodigo);
        });
        this.setState({ pessoasQuarto: listaPessoasAlocadas, carregando: false });
    }

    buscarQuartos = async (codigoEvento, codigoBloco) => {
        this.setState({ carregando: true });
        let quartos = await ApiAlocacao.getQuartos(codigoEvento, codigoBloco);
        this.setState({ quartos: quartos, carregando: false });
    }

    alteraDadosListBox = async (value) => {
        let status;
        if (this.state.pessoasQuarto.length > 0 && value.length < this.state.pessoasQuarto.length) {
            status = await this.removerPessoasQuarto(this.state.quartoSelecionado);
            if (status === 200) {
                this.adicionarPessoasQuarto(value);
            }
        } else {
            this.adicionarPessoasQuarto(value);
        }
    }

    adicionarPessoasQuarto = async (pessoa) => {
        await this.preparaDadosPessoasListBox(pessoa);
    }

    preparaDadosPessoasListBox = (listaPessoas) => {
        let pessoas = [];
        listaPessoas.forEach((pessoa) => {
            this.state.modelPessoaQuarto.pesCodigo = pessoa;
            this.state.modelPessoaQuarto.quaCdoigo = parseInt(this.state.quartoSelecionado);
            this.state.modelPessoaQuarto.qupCodigo = 0;
            pessoas.push(this.state.modelPessoaQuarto);
        });
        this.addPessoasQuarto(pessoas);
    }

    addPessoasQuarto = async (pessoa) => {
        let retorno;
        let listaPessoasQuarto = [];
        for (let i = 0; i < pessoa.length; i++) {
            retorno = await ApiAlocacao.postPessoaQuarto(pessoa[i]);
            if (retorno === 200) {
                listaPessoasQuarto.push(pessoa[i]);
                this.setState({ modelPessoaQuarto: this.state.modelPessoaQuartoInitialState });
                this.buscarPessoasQuarto(this.state.quartoSelecionado);
            } else {
                alert("Erro ao adicionar pessoas!");
            }
        }
    }

    atualizaDadosPessoasListBox = (listaPessoas) => {
        let pessoas = [];
        listaPessoas.forEach((pessoa) => {
            pessoas.push({ value: pessoa.pesCodigo, label: pessoa.pesNome });
        });
        this.setState({ pessoasComunidade: pessoas });
    }

    removerPessoasQuarto = async (pessoa) => {
        let retorno;
        retorno = await ApiAlocacao.limparPessoasQuarto(this.state.quartoSelecionado);
        if (retorno === 200) {
            this.setState({ modelPessoaQuarto: this.state.modelPessoaQuartoInitialState });
        }
        return retorno;
        //     let retorno;
        //     let listaPessoasQuarto = [];
        //     for (let i = 0; i < pessoa.length; i++) {
        //         retorno = await ApiAlocacao.deletePessoaQuarto(pessoa[i]);
        //         if (retorno === 200) {
        //             listaPessoasQuarto.push(pessoa[i]);
        //             this.setState({ modelPessoaQuarto: this.state.modelPessoaQuartoInitialState });
        //             this.buscarPessoasQuarto(this.state.quartoSelecionado);
        //         } else {
        //             alert("Erro ao remover pessoas!");
        //         }
        //     }
        // }
    }
    render() {
        return (
            <Mestre icon="address-book" title="Distribuição de Quartos" subtitle="CCMZ">
                <div className={this.props.tipoContainer}>
                    <header><h3>Alocar Quartos</h3></header>
                    <hr />
                    <div className="row col-md-12 d-flex justify-content-around">
                        <div className="col-md-5 pb-3">
                            <label htmlFor="comunidade" className="form-label">Evento</label>
                            <select id="comunidade" className="form-select" name="eveCodigo" value={this.state.eventoSelecionado.eveCodigo} onChange={this.selecionarCampo}>
                                <option value="1">Selecione um Evento</option>
                                {this.state.eventos.map((evento) => {
                                    return (
                                        <option key={evento.eveCodigo} value={evento.eveCodigo}>{evento.eveNome}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="comunidade" className="form-label">Bloco</label>
                            <select id="comunidade" className="form-select" name="bloCodigo" value={this.state.blocoSelecionado.bloCodigo} onChange={this.selecionarCampo} disabled={this.state.comunidadeSelecionada < 1}>
                                <option value="1">Selecione um Bloco</option>
                                {this.state.blocos.map((bloco) => {
                                    return (
                                        <option key={bloco.bloCodigo} value={bloco.bloCodigo}>{bloco.bloNome}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="comunidade" className="form-label">Comunidade</label>
                            <select id="comunidade" className="form-select" name="comCodigo" value={this.state.comunidadeSelecionada.comCodigo} onChange={this.selecionarCampo} disabled={this.state.eventoSelecionado < 1}>
                                <option value="1">Selecione uma Comunidade</option>
                                {this.state.comunidades.map((comunidade) => {
                                    return (
                                        <option key={comunidade.comCodigo} value={comunidade.comCodigo}>{comunidade.comNome} - {comunidade.comCidade}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="comunidade" className="form-label">Quarto</label>
                            <select id="comunidade" className="form-select" name="quaCodigo" value={this.state.quartoSelecionado.quaCodigo} onChange={this.selecionarCampo} disabled={this.state.blocoSelecionado < 1}>
                                <option value="1">Selecione um Quarto</option>
                                {this.state.quartos.map((quarto) => {
                                    return (
                                        <option key={quarto.quaCodigo} value={quarto.quaCodigo}>{quarto.quaNome}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <hr />
                    <br />
                    <div className="row col-md-12 d-flex justify-content-around">
                        <div className="col-md-6">
                            <label htmlFor="status" className="form-label mb-0">Pessoas</label>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="status" className="form-label mb-0">Camas Disponíveis ( )</label>
                        </div>
                    </div>
                    {this.props.carregando ?
                        <div className="spinner-border loader" role="status" />
                        :
                        <div className="flex-column">
                            <DualListBox
                                options={this.state.pessoasComunidade}
                                selected={this.state.pessoasQuarto}
                                onChange={(value) => this.alteraDadosListBox(value)}
                            />
                        </div>
                    }
                    <hr />
                    <br />
                </div>
            </Mestre >
        )
    }
}

export default DistribuirQuartos;