import AxiosConnection from "../AxiosConnection";

class ApiAlocacao {
    static getEventos = async () => {
        let eventosData = [];
        await AxiosConnection.get("eventos").then((response) => {
            eventosData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return eventosData;
    }

    static getQuartos = async (id) => {
        let quartosData = [];
        await AxiosConnection.get("quartos/" + id).then((response) => {
            quartosData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return quartosData;
    }

    static getBlocos = async (id) => {
        let blocosData = [];
        await AxiosConnection.get("blocos/" + id).then((response) => {
            blocosData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return blocosData;
    }

    static getComunidades = async (id) => {
        let comunidadesData = [];
        await AxiosConnection.get("comunidades/" + id).then((response) => {
            comunidadesData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return comunidadesData;
    }
}

export default ApiAlocacao;