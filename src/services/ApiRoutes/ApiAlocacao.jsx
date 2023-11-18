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

    static getPessoasQuarto = async (evento, quarto) => {
        let pessoasQuartoData = [];
        await AxiosConnection.get(`alocacao/pessoas/${evento}/${quarto}`).then((response) => {
            pessoasQuartoData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return pessoasQuartoData;
    }
}

export default ApiAlocacao;