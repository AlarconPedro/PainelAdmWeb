import Firebase from "../services/Firebase";

export default function Session({
    isLogged,
    isIdle,
}) {
    const logout = () => {
        Firebase.auth().signOut();
        localStorage.clear();
        window.location.replace("/login");
    }

    const login = () => {
        localStorage.setItem("logado", true);
        window.location.replace("/home");
    }

    const logado = isLogged;
    const ocioso = isIdle;

    if (logado && !ocioso) {
        login();
    } else if (!logado && !ocioso) {
        logout();
    } else if (logado && ocioso) {
        logout();
    }
}