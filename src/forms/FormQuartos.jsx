import React from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class FormQuartos extends React.Component {
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
        if (prevProps.vazio !== this.props.vazio) {
            this.setState({ vazio: this.props.vazio });
        }
    }

    fecharModal() {
        this.setState({ abrir: !this.state.abrir });
        this.props.funcAbrir(this.state.abrir);
    }

    async salvar() {
        var retorno = await this.props.funcSalvar("P");
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
                    <button className="btn btn-success" type="submit" onClick={() => this.salvar()} disabled={this.props.vazio}>Salvar</button>{" "}
                    <button className="btn btn-danger" onClick={() => this.fecharModal()}>Cancelar</button>
                </ModalFooter>
            </Modal>
        );
    }

}

export default FormQuartos;