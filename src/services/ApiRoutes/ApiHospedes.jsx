import AxiosConnection from "../AxiosConnection";

class ApiHospedes {
    static getHospedes = async (codigoEvento) => {
        let hospedesData = [];
        await AxiosConnection.get("evento/hospedes/" + codigoEvento).then((response) => {
            hospedesData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return hospedesData;
    }
}

export default ApiHospedes;