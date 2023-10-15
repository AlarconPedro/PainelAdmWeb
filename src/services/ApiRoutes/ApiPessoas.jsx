import AxiosConnection from "../AxiosConnection";

class ApiPessoas {
    constructor(props) {
        this.url = "pessoa/";
    }

    static getPessoas = async () => {
        let pessoasData = [];
        await AxiosConnection.get("pessoa/").then((response) => {
            console.log(response.data);
            pessoasData = response.data;
        }).catch((error) => {
            console.log(error);
        });
        return pessoasData;
    }

    static getPessoa = async (id) => {
        let pessoa = {};
        await AxiosConnection.get(`pessoa/${id}`).then((response) => {
            pessoa = response.data;
        });
        return pessoa;
    }

    static async postPessoa(pessoa) {
        let retorno = await AxiosConnection.post("pessoa/", pessoa);
        return retorno.status;
    }

    static putPessoa(pessoa) {
        return AxiosConnection.put(this.url + pessoa.id, pessoa);
    }

    static deletePessoa = async (id) => {
        let retorno;
        retorno = await AxiosConnection.delete("pessoa/" + id);
        return retorno.status;
    }
}

export default ApiPessoas;