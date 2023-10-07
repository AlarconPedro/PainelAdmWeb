import AxiosConnection from "../AxiosConnection";

class ApiComunidade {
    constructor(props) {
        this.url = "comunidade/";
    }

    static getComunidade = async () => {
        let comunidadeData = [];
        await AxiosConnection.get("comunidade/").then((response) => {
            console.log(response.data);
            comunidadeData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return comunidadeData;
    }

    static getComunidade = async (id) => {
        let comunidade = {};
        await AxiosConnection.get(`comunidade/${id}`).then((response) => {
            comunidade = response.data;
        });
        return comunidade;
    }

    static postComunidade(comunidade) {
        return AxiosConnection.post(this.url, comunidade);
    }

    static putComunidade(comunidade) {
        return AxiosConnection.put(this.url + "/" + comunidade.id, comunidade);
    }

    static deleteComunidade(id) {
        return AxiosConnection.delete(this.url + "/" + id);
    }
}

export default ApiComunidade;