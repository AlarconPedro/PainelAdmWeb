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

    static postComunidade = async (comunidade) => {
        let retorno;
        await AxiosConnection.post("comunidade/", comunidade).then((response) => {
            retorno = response.status;
        }).catch((error) => {
            console.log(error);
        });
        return retorno;
    }

    static putComunidade(comunidade) {
        AxiosConnection.put("comunidade/" + comunidade.id, comunidade);
    }

    static deleteComunidade = async (id) => {
        let retorno;
        retorno = await AxiosConnection.delete("comunidade/" + id);
        return retorno.status;
    }
}

export default ApiComunidade;