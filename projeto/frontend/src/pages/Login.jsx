import { useState } from "react";
import { api } from "../services/api";
import Logo from "../components/Logo";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const entrar = async () => {
    const res = await api.login({ usuario, senha });
    const data = await res.json();

    if (res.ok) window.location.href = "/home";
    else alert(data.erro);
  };

  return (
    <div>
      <Logo variant="com-slogan" width="280px" />
      <h2>LOGIN</h2>
      <input placeholder="Usuário" onChange={e => setUsuario(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={e => setSenha(e.target.value)} />
      <button onClick={entrar}>Entrar</button>
      <p>Paragrafo teste</p>
    </div>
  );
}