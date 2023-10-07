import axios from "axios";

const AxiosConnection = axios.create({
    baseURL: "https://localhost:7050/api/"
});

export default AxiosConnection;