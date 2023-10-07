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

    static postPessoa(pessoa) {
        return AxiosConnection.post(this.url, pessoa);
    }

    static putPessoa(pessoa) {
        return AxiosConnection.put(this.url + "/" + pessoa.id, pessoa);
    }

    static deletePessoa(id) {
        return AxiosConnection.delete(this.url + "/" + id);
    } ""
}

export default ApiPessoas;