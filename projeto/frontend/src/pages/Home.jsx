import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Home() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    api.usuario()
      .then(res => res.json())
      .then(setUsuario);
  }, []);

  const sair = async () => {
    await api.logout();
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Bem-vindo, {usuario?.nome}</h1>
      <button onClick={sair}>Logout</button>
      <br /><br />
      <a href="/tarefas">Ir para tarefas</a>
    </div>
  );
}