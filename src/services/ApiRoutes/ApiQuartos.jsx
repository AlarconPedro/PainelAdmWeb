import AxiosConnection from "../AxiosConnection";

class ApiQuartos {
    static getQuartos = async () => {
        let quartos = [];
        await AxiosConnection.get("quarto/").then((response) => {
            quartos = response.data;
        }).catch((error) => {
            console.log(error);
        })
        return quartos;
    }

    static getQuartoId = async (id) => {
        let quarto = {};
        await AxiosConnection.get("quarto/" + id).then((response) => {
            quarto = response.data;
        }).catch((error) => {
            console.log(error);
        })
        return quarto;
    }

    static postQuartos = async (quarto) => {
        let retorno = await AxiosConnection.post("quarto/", quarto);
        return retorno.status;
    }

    static putQuartos = async (quarto) => {
        let retorno = await AxiosConnection.put("quarto/", quarto);
        return retorno.status;
    }

    static deleteQuarto = async (id) => {
        let retorno = await AxiosConnection.delete("quarto/" + id);
        return retorno.status;
    }
}

export default ApiQuartos;