import { useState } from "react";
import { loginComCPF } from "../services/authService";
import { api } from "../services/api";
import LoginForm from "../components/LoginForm";
import styles from "./Login.module.css";
import Logo from "../components/Logo";


export default function Login() {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    async function handleLogin(e) {
        e.preventDefault()
        
        const res = await loginComCPF(usuario, senha)

        if (res) {
             window.location.href = '/home'
        } else {
            alert('CPF ou senha inválidos')
        }
    }

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
        onSubmit={handleLogin}
        styles={styles}
      />
    </div>
  );
}