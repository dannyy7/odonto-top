import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");

  const carregar = () => {
    api.tarefas()
      .then(res => res.json())
      .then(setTarefas);
  };

  useEffect(() => {
    carregar();
  }, []);

  const adicionar = async () => {
    await api.criar({ titulo });
    setTitulo("");
    carregar();
  };

  const remover = async (id) => {
    await api.excluir(id);
    carregar();
  };

  return (
    <div>
      <h2>Tarefas</h2>

      <input value={titulo} onChange={e => setTitulo(e.target.value)} />
      <button onClick={adicionar}>Adicionar</button>

      <ul>
        {tarefas.map(t => (
          <li key={t.id}>
            {t.titulo}
            <button onClick={() => remover(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}