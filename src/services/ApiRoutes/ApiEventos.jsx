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

    static postEvento = async (evento) => {
        let retorno;
        await AxiosConnection.post(this.url, evento).then((response) => {
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
        return AxiosConnection.delete(this.url + "/" + id);
    }
}

export default ApiEventos;