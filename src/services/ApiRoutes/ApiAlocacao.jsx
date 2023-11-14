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

    static getQuartos = async (id) => {
        let quartosData = [];
        await AxiosConnection.get("alocacao/quartos/" + id).then((response) => {
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

    static getPessoasComunides = async (id) => {
        let pessoasComunidadeData = [];
        await AxiosConnection.get("alocacao/pessoasComunidade/" + id).then((response) => {
            pessoasComunidadeData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return pessoasComunidadeData;
    }
}

export default ApiAlocacao;