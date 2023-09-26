import React from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class FormAcesso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            abrir: false,
            nome: this.props.nome,
            variaveis: { ...this.props.variaveis },
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.abrir !== this.props.abrir) {
            this.setState({ abrir: this.props.abrir });
        }
        if (prevProps.nome !== this.props.nome) {
            this.setState({ nome: this.props.nome });
        }
        if (prevProps.variaveis !== this.props.variaveis) {
            this.setState({ variaveis: this.props.variaveis });
        }
    }

    abrirModal = () => {
        this.setState({ abrir: !this.state.abrir });
        this.props.funcAbrir(this.state.abrir);
    }

    editarAcesso = async () => {
        var retorno = await this.props.funcPut();
        if (retorno) {
            this.abrirModal();
        }
    }

    render() {
        return (
            <Modal isOpen={this.state.abrir} className="modal-editar">
                {/* <ModalHeader>Acesso do Vendedor {this.state.nome}</ModalHeader> */}
                {/* <ModalHeader>Dados de Login {this.state.nome}</ModalHeader> */}
                <ModalHeader>{this.state.nome}</ModalHeader>
                <ModalBody>
                    {this.props.children}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" onClick={() => this.editarAcesso()}>Salvar</button>{" "}
                    <button className="btn btn-danger" onClick={() => this.abrirModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default FormAcesso;