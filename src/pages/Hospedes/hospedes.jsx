import React from 'react';

import FormModel from "../../forms/Modelo"
import FormInserir from "../../forms/FormInserir"
import FormEditar from "../../forms/FormEditar"
import FormExcluir from "../../forms/FormExcluir"

class Hospedes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hospedesData: [],
            carregando: false,
            abrirCadastro: false,
        };
    }

    getHospedes = async () => {

    }

    abrirFecharCadastro = () => {
        this.setState({ abrirCadastro: !this.state.abrirCadastro });
    }

    componentDidMount() {
        this.getHospedes();
    }

    render() {
        return (
            <React.Fragment>
                <FormModel
                    titulo="Listagem de Hóspedes"
                    subtitulo="CCMZ"
                    icone="calendar"
                    tipoContainer="form-container"
                    Cabecalho="Hóspedes"
                    BotaoAdd="Adicionar Hóspede"
                    getDados={this.getEventos}
                    getByNome={this.getVendedorNome}
                    funcAbrirCadastro={this.abrirFecharCadastro}
                    carregando={this.state.carregando}
                    colunas={[
                        { nome: "Nome" },
                        { nome: "Comunidade" },
                        { nome: "Pagante" },
                        { nome: "Cobrante" },
                    ]}
                >
                    <tbody>
                        {this.state.hospedesData.map((hospede) => (
                            <tr key={hospede.pesCodigo}>
                                <td className="pt-3">{hospede.pesNome}</td>
                                <td className="pt-3"></td>
                                <div className="col-md-6">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="pesCatequista" value="pesCatequista" name="pesCatequista" onChange={this.handleCheck} />
                                        <label className="form-check-label" for="pesCatequista">Catequista</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="checkbox" id="pesSalmista" value="pesSalmista" name="pesSalmista" onChange={this.handleCheck} />
                                        <label className="form-check-label" for="pesSalmista">Salmista</label>
                                    </div>
                                </div>
                                <td>
                                    <button className="btn btn-warning" onClick={() => this.selecionarEvento(hospede, "Editar")}>
                                        <i className="fa fa-pencil"></i>
                                    </button>{" "}
                                    <button className="btn btn-danger" onClick={() => this.selecionarEvento(hospede, "Excluir")}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </FormModel>
            </React.Fragment>
        );
    }
}

export default Hospedes;