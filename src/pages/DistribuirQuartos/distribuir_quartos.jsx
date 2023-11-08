import React from "react";

import Mestre from "../../estrutura/Mestre";

import DualListBox from 'react-dual-listbox';

class DistribuirQuartos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            carregando: false,
            pessoasComunidade: [],
            pessoasQuarto: [],
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.abrir !== this.props.abrir) {
            this.setState({ abrir: this.props.abrir });
        }
    }

    abrirFecharCadastro = () => {
        this.setState({ abrir: this.state.abrir });
        this.props.funcAbrirCadastro(this.state.abrir);
    }

    buscarEventos = () => { }

    buscarBlocos = () => { }

    buscarComunidades = () => { }

    buscarQuartos = () => { }

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
                            <select id="comunidade" className="form-select" name="comCodigo" value="1" onChange={this.handleChange}>

                            </select>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="comunidade" className="form-label">Bloco</label>
                            <select id="comunidade" className="form-select" name="comCodigo" value="1" onChange={this.handleChange}>

                            </select>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="comunidade" className="form-label">Comunidade</label>
                            <select id="comunidade" className="form-select" name="comCodigo" value="1" onChange={this.handleChange}>

                            </select>
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="comunidade" className="form-label">Quarto</label>
                            <select id="comunidade" className="form-select" name="comCodigo" value="1" onChange={this.handleChange}>

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