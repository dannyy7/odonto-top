import { useState } from "react";
import { api } from "../services/api";
import LoginForm from "../components/LoginForm";
import styles from "./Login.module.css";
import Logo from "../components/Logo";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const entrar = async () => {
    const res = await api.login({ usuario, senha });
    const data = await res.json();

    if (res.ok) {
      window.location.href = "/home";
    } else {
      alert(data.erro);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginHeader}>
        <Logo variant="com-slogan" width="420px" />
      </div>
      <LoginForm
        usuario={usuario}
        senha={senha}
        setUsuario={setUsuario}
        setSenha={setSenha}
        onSubmit={entrar}
        styles={styles}
      />
    </div>
  );
}