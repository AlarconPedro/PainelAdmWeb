import AxiosConnection from "../AxiosConnection";

class ApiEventos {
    constructor(props) {
        this.url = "evento/";
    }

    static getEventos = async () => {
        let eventosData = [];
        await AxiosConnection.get("evento/").then((response) => {
            eventosData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return eventosData;
    }

    static getEvento = async (id) => {
        let evento = {};
        await AxiosConnection.get(`evento/${id}`).then((response) => {
            evento = response.data;
        });
        return evento;
    }

    static getPavilhoes = async () => {
        let pavilhoes = [];
        await AxiosConnection.get("evento/pavilhoes").then((response) => {
            pavilhoes = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return pavilhoes;
    }

    static getQuartosPavilhao = async (id) => {
        let quartos = [];
        await AxiosConnection.get(`evento/quartos/${id}`).then((response) => {
            quartos = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return quartos;
    }

    static getQuartosAlocados = async (codigoPavilhao, codigoEvento) => {
        let quartos = [];
        await AxiosConnection.get(`evento/quartos/alocados/${codigoPavilhao}/${codigoEvento}`).then((response) => {
            quartos = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return quartos;
    }

    static getComunidades = async () => {
        let comunidades = [];
        await AxiosConnection.get("comunidade/").then((response) => {
            comunidades = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return comunidades;
    }

    static postEvento = async (evento) => {
        let retorno;
        await AxiosConnection.post("evento", evento).then((response) => {
            retorno = response.status;
        }).catch((error) => {
            console.log(error)
        });
        return retorno
    }

    static postQuartos = async (quartos, codigoBloco) => {
        let retorno;
        await AxiosConnection.post(`evento/quartos/${codigoBloco}`, quartos).then((response) => {
            retorno = response.status;
        }).catch((error) => {
            console.log(error)
        });
        return retorno
    }

    static putEvento(evento) {
        return AxiosConnection.put(this.url + "/" + evento.id, evento);
    }

    static deleteEvento(id) {
        let retorno;
        return AxiosConnection.delete(`evento/${id}`).then((response) => {
            retorno = response.status;
            return retorno;
        }).catch((error) => {
            console.log(error);
        });
    }
}

export default ApiEventos;