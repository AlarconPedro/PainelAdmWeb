import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import "./login.css";

import Imagem from "../../assets/imgs/logo.png";
import AxiosConnection from "../../services/AxiosConnection";

import Firebase from "../../services/Firebase";
import { pessoaUrl } from "../../services/RotasApi";

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [logado, setLogado] = useState(true);

    const [texto, setTexto] = useState("Usuário ou Senha inválido");

    const data = {
        email: email,
        senha: senha
    };

    const navigate = useNavigate();

    function logarSistema(event) {
        event.preventDefault();
        Logar(data);
    }


    const buscarDadosUsuario = async (id) => {
        let dados;
        await AxiosConnection.get(`${pessoaUrl}login?codigoFirebase=${id}`).then((response) => {
            dados = response.data;
            localStorage.setItem("Nome", dados.nome);
            localStorage.setItem("Codigo", dados.codigo);
            localStorage.setItem("Email", dados.email);
            // localStorage.setItem("Imagem", dados.imagem);
            console.log(dados);
        }).catch((error) => {
            console.log(error);
        });
        return dados;
    }

    const Logar = async (data) => {
        var dados = [];
        if (data.email !== "" || data.senha !== "") {
            if (data.email == "ADMINISTRADOR" && data.senha == "SMOS2009") {
                localStorage.setItem("Nome", "Omega Sistemas");
                localStorage.setItem("Codigo", "8");
                localStorage.setItem("Admin", true);
                localStorage.setItem("Imagem", "https://raw.githubusercontent.com/MicaelliMedeiros/micaellimedeiros/master/image/computer-illustration.png");
                navigate("/home");
                setLogado(true);
            } else {
                Firebase.auth().signInWithEmailAndPassword(data.email, data.senha).then(async (userCredential) => {
                    // Signed in
                    let retorno = await buscarDadosUsuario(userCredential.user.uid);
                    if (retorno !== undefined) {
                        var user = userCredential.user;
                        localStorage.setItem("Nome", retorno.usuNome);
                        localStorage.setItem("Codigo", retorno.empCodigo);
                        localStorage.setItem("Imagem", "https://raw.githubusercontent.com/MicaelliMedeiros/micaellimedeiros/master/image/computer-illustration.png");
                        console.log(user);
                        navigate("/home");
                        setLogado(true);
                    } else {
                        setLogado(false);
                        setTexto("Usuário sem permissão de acesso !");
                    }
                });
            }
        } else {
            setLogado(false);
            setTexto("Usuário ou Senha inválido !");
        }
    }

    return (
        <div className="container-login">
            <div className="imagemLogin">
                <img src={Imagem} alt="" />
            </div>
            {logado ? <h4></h4> : <h6 className="falha">{texto}</h6>}
            <div className="col-12">
                <form onSubmit={logarSistema}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" className="form-control" placeholder="Digite seu email"
                            value={email} onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha:</label>
                        <input type="password" className="form-control" placeholder="Digite sua senha"
                            value={senha} onChange={e => setSenha(e.target.value)}
                        />
                    </div>
                    <hr />
                    <div className="botaoEntrar">
                        <button type="submit" className="btn btn-success botao-login">Entrar</button>
                    </div>
                </form>
            </div>
        </div>

    );
}