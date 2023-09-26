import React, { Component } from "react";

import "./Estilos/ComponenteImagem.css"

import FormData from 'form-data';

const initialState = {
    tamanho: "",
    label: "",
    name: "",
    type: "",
    urlImagem: "",
    imagens: null,
    file: null,
    reader: new FileReader(),
    imagePreviewUrl: null
}

export default class ComponenteImagem extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.setState({
            tamanho: this.props.tamanho,
            label: this.props.label,
            name: this.props.name,
            type: this.props.type,
            urlImagem: this.props.urlImagem,
            imagens: '',
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.tamanho !== this.props.tamanho) {
            this.setState({
                tamanho: this.props.tamanho
            })
        }

        if (prevState.label !== this.props.label) {
            this.setState({
                label: this.props.label
            })
        }

        if (prevState.name !== this.props.name) {
            this.setState({
                name: this.props.name
            })
        }

        if (prevState.type !== this.props.type) {
            this.setState({
                type: this.props.type
            })
        }

        if (prevState.urlImagem !== this.props.urlImagem) {
            this.setState({
                urlImagem: this.props.urlImagem
            })
        }

        if (prevState.imagens !== this.state.imagens) {
            this.setState({
                imagens: this.state.imagens
            })
        }
    }

    _handleSubmit(e) {
        e.preventDefault();
    }

    _handleImageChange(e) {
        e.preventDefault();

        var response = null;

        this.state.file = e.target.files[0];
        const form = new FormData();
        form.append(this.props.name, this.state.file);
        this.state.reader.onloadend = async () => {
            this.setState({
                file: this.state.file,
                imagePreviewUrl: this.state.reader.result
            });
            this.props.selecionaImagem(form);
        };
        if (this.state.file) {
            if (response == null) {
                this.state.reader.readAsDataURL(this.state.file);
            } else {
                this.state.reader.readAsDataURL(response);
            }
        }
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl = this.state.urlImagem != '' && imagePreviewUrl == null ? this.state.urlImagem : imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl} alt="preview" />;
        } else {
            $imagePreview =
                <div className="custom-file-upload">
                    <label for="file-upload" className="col-12">
                        <h4>Selecionar Imagem</h4>
                    </label>
                </div>;
        }

        return (
            <div className="previewComponent col-md-4">
                <form onSubmit={e => this._handleSubmit(e)}>
                    {imagePreviewUrl == null ?
                        <input className="fileInput"
                            id="file-upload"
                            type="file"
                            onChange={e => this._handleImageChange(e)}
                        />
                        : null}
                </form>
                <div className="imgPreview">{$imagePreview}</div>
                {imagePreviewUrl !== '' ?
                    <React.Fragment>
                        <input className="fileInput"
                            id="file-upload"
                            type="file"
                            onChange={e => this._handleImageChange(e)}
                        />
                        <div className="custom-file-edit">
                            <label for="file-upload" className="col-12">
                                Editar
                            </label>
                        </div>
                    </React.Fragment>
                    : null}
            </div>
        )
    }
}