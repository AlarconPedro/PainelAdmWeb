import React, { useState, useEffect } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import DatePicker from "react-datepicker";
import InputMask from 'react-input-mask';

import "../estilos/FormularioInserir.css";

class FormInserir extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            valido: true,
            textoValido: "Preencha todos os campos",
            variaveis: [this.props.variaveis],
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.abrir !== this.props.abrir) {
            this.setState({ abrir: this.props.abrir });
        }
        if (prevProps.variaveis !== this.props.variaveis) {
            this.setState({ variaveis: this.props.variaveis });
        }
        if (prevProps.valido !== this.props.valido) {
            this.setState({ valido: this.props.valido });
        }
        if (prevProps.textoValido !== this.props.textoValido) {
            this.setState({ textoValido: this.props.textoValido });
        }
    }

    fecharModal() {
        this.setState({ abrir: !this.state.abrir });
        this.props.funcAbrir(this.state.abrir);
    }

    async inserir() {
        var retorno = await this.props.funcPost("P");
        if (retorno) {
            this.fecharModal();
        }
    }

    render() {
        return (
            <Modal isOpen={this.state.abrir} className="modal-incluir">
                <ModalHeader>Incluir {this.props.nome}</ModalHeader>
                <ModalBody>
                    {this.props.children}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" type="submit" onClick={() => this.inserir()}>Salvar</button>{" "}
                    <button className="btn btn-danger" onClick={() => this.fecharModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default FormInserir;