import AxiosConnection from "../AxiosConnection";

class ApiBlocos {
    static getBlocos = async () => {
        let blocosData = [];
        await AxiosConnection.get("bloco/").then((response) => {
            console.log(response.data);
            blocosData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return blocosData;
    }

    static getBloco = async (id) => {
        let bloco = {};
        await AxiosConnection.get(`bloco/${id}`).then((response) => {
            bloco = response.data;
        });
        return bloco;
    }

    static async postBloco(bloco) {
        let retorno = await AxiosConnection.post("bloco/", bloco);
        return retorno.status;
    }

    static putBloco(bloco) {
        return AxiosConnection.put("bloco/" + bloco.id, bloco);
    }

    static deleteBloco = async (id) => {
        let retorno;
        retorno = await AxiosConnection.delete("bloco/" + id);
        return retorno.status;
    }
}

export default ApiBlocos;