import AxiosConnection from "../AxiosConnection";

class ApiAlocacao {
    static getEventos = async () => {
        let eventosData = [];
        await AxiosConnection.get("alocacao/eventos").then((response) => {
            eventosData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return eventosData;
    }

    static getQuartos = async (codigoEvento, codigoBloco) => {
        let quartosData = [];
        await AxiosConnection.get(`alocacao/quartos/${codigoEvento}/${codigoBloco}`).then((response) => {
            quartosData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return quartosData;
    }

    static getBlocos = async (id) => {
        let blocosData = [];
        await AxiosConnection.get("alocacao/blocos/" + id).then((response) => {
            blocosData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return blocosData;
    }

    static getComunidades = async (id) => {
        let comunidadesData = [];
        await AxiosConnection.get("alocacao/comunidades/" + id).then((response) => {
            comunidadesData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return comunidadesData;
    }

    static getPessoasComunide = async (evento, comunidade) => {
        let pessoasComunidadeData = [];
        await AxiosConnection.get(`alocacao/pessoas/comunidade/${evento}/${comunidade}`).then((response) => {
            pessoasComunidadeData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return pessoasComunidadeData;
    }

    static getPessoasTotal = async (evento, comunidade) => {
        let pessoasTotalData = [];
        await AxiosConnection.get(`alocacao/pessoas/total/${evento}/${comunidade}`).then((response) => {
            pessoasTotalData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return pessoasTotalData;
    }

    static getPessoasQuarto = async (quarto) => {
        let pessoasQuartoData = [];
        await AxiosConnection.get(`alocacao/pessoas/quarto/${quarto}`).then((response) => {
            pessoasQuartoData = response.data;
        }).catch((error) => {
            console.log(error);
        });

        return pessoasQuartoData;
    }

    static postPessoaQuarto = async (pessoaQuarto) => {
        let retorno;
        await AxiosConnection.post("alocacao/pessoa/quarto", pessoaQuarto).then((response) => {
            retorno = response.status;
        }).catch((error) => {
            return error.response.status;
        });
        return retorno;
    }

    static deletePessoaQuarto = async (pessoaQuarto) => {
        let retorno;
        await AxiosConnection.delete("alocacao/pessoa/quarto", { data: pessoaQuarto }).then((response) => {
            retorno = response.status;
        }).catch((error) => {
            return error.response.status;
        });
        return retorno;
    }

    static limparPessoasQuarto = async (quarto) => {
        let retorno;
        await AxiosConnection.delete(`alocacao/pessoas/quarto/${parseInt(quarto)}`).then((response) => {
            retorno = response.status;
        }).catch((error) => {
            return error.response.status;
        });
        return retorno;
    }
}

export default ApiAlocacao;