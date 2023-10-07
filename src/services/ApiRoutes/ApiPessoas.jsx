import React from "react";

import AxiosConnection from "../AxiosConnection";

class ApiPessoas {
    constructor(props) {
        super(props);
        this.url = "pessoa/";
    }

    static getPessoas = async () => {
        let pessoasData = [];
        await AxiosConnection.get(this.url).then((response) => {
            pessoasData = response.data;
        });
        return pessoasData;
    }

    static getPessoa = async (id) => {
        let pessoa = {};
        await AxiosConnection.get(this.url + id).then((response) => {
            pessoa = response.data;
        });
        return pessoa;
    }

    static postPessoa(pessoa) {
        return AxiosConnection.post(this.url, pessoa);
    }

    static putPessoa(pessoa) {
        return AxiosConnection.put(this.url + "/" + pessoa.id, pessoa);
    }

    static deletePessoa(id) {
        return AxiosConnection.delete(this.url + "/" + id);
    }
}

export default ApiPessoas;