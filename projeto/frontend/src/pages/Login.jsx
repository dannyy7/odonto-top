import { useState } from "react";
import { api } from "../services/api";
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
    <div className="login-page">
      <div className="login-header">
        <Logo variant="com-slogan" width="500px" />
      </div>

      <div className="login-container">
        <h1 className="login-title">LOGIN</h1>

        <div className="input-group">
          <span className="input-icon">👤</span>

          <input
            className="login-input"
            type="text"
            placeholder="CPF ou Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        <div className="input-group">
          <span className="input-icon">🔒</span>

          <input
            className="login-input"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button className="login-button" onClick={entrar}>
          Entrar
        </button>
      </div>
    </div>
  );
}