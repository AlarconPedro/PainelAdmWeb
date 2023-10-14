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

    static getComunidadeId = async (id) => {
        let comunidade = {};
        await AxiosConnection.get(`comunidade/${id}`).then((response) => {
            comunidade = response.data;
        });
        return comunidade;
    }

    static postComunidade(comunidade) {
        let retorno;
        AxiosConnection.post("comunidade/", comunidade).then((response) => {
            retorno = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return retorno;
    }

    static putComunidade(comunidade) {
        return AxiosConnection.put("comunidade/" + comunidade.id, comunidade);
    }

    static deleteComunidade(id) {
        return AxiosConnection.delete("comunidade/" + id);
    }
}

export default ApiComunidade;