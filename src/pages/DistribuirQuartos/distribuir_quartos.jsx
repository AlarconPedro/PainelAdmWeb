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
            quartoSelecionado: {},
            comunidadeInitialState: {
                comCodigo: 0,
                comNome: "",
                comCidade: "",
                comUF: "",
            },
            comunidadeSelecionada: {
                comCodigo: 0,
                comNome: "",
                comCidade: "",
                comUF: "",
            },
            eventoInitialState: {
                eveCodigo: 0,
                eveNome: "",
                eveDataInicio: "",
                eveDataFim: "",
            },
            eventoSelecionado: {
                eveCodigo: 0,
                eveNome: "",
                eveDataInicio: "",
                eveDataFim: "",
            },
            blocoInitialState: {
                bloCodigo: 0,
                bloNome: "",
            },
            blocoSelecionado: {
                bloCodigo: 0,
                bloNome: "",
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

    selecionarQuarto = (quarto) => {
        this.setState({ quartoSelecionado: quarto });
    }

    selecionarEvento = (evento) => {
        this.setState({ eventoSelecionado: evento });
    }

    selecionarComunidade = (comunidade) => {
        this.setState({ comunidadeSelecionada: comunidade });
    }

    recarregaDados = () => {
        this.buscarBlocos();
        this.buscarComunidades();
        this.buscarQuartos();
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

    buscarBlocos = async () => {
        this.setState({ carregando: true });
        let blocos = await ApiAlocacao.getBlocos();
        this.setState({ blocos: blocos, carregando: false });
    }

    buscarComunidades = async () => {
        this.setState({ carregando: true });
        let comunidades = await ApiAlocacao.getComunidades();
        this.setState({ comunidades: comunidades, carregando: false });
    }

    buscarQuartos = async () => {
        this.setState({ carregando: true });
        let quartos = await ApiAlocacao.getQuartos();
        this.setState({ quartos: quartos, carregando: false });
    }

    render() {
        return (
            <Mestre icon="address-book" title="Distribuição de Quartos" subtitle="CCMZ">
                <div className={this.props.tipoContainer}>
                    <header>
                        <h3>Alocar Quartos</h3>
                    </header>
                    <hr />
                    <div className="row col-md-12 d-flex justify-content-around">
                        <div className="col-md-5 pb-3">
                            <label htmlFor="comunidade" className="form-label">Evento</label>
                            <select id="comunidade" className="form-select" name="comCodigo" value={this.state.eventoSelecionado.eveCodigo} onChange={this.selecionarQuarto}>
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
                            <select id="comunidade" className="form-select" name="comCodigo" value={this.state.blocoSelecionado.bloCodigo} onChange={this.handleChange} disabled={this.state.comunidadeSelecionada.comCodigo < 1}>
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
                            <select id="comunidade" className="form-select" name="comCodigo" value={this.state.comunidadeSelecionada.comCodigo} onChange={this.handleChange} disabled={this.state.eventoSelecionado.eveCodigo < 1}>
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
                            <select id="comunidade" className="form-select" name="comCodigo" value={this.state.quartoSelecionado.quaCodigo} onChange={this.handleChange} disabled={this.state.blocoSelecionado.bloCodigo < 1}>
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

                    {this.props.carregando ?
                        <div className="spinner-border loader" role="status" />
                        :
                        <div className="flex-column">
                            <DualListBox
                                options={this.state.pessoasComunidade}
                                selected={this.state.pessoasQuarto}
                                onChange={(value) => this.setState({ selectedQuartos: value })}
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