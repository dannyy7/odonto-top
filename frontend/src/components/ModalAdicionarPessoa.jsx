import { useState } from "react";
import styles from "./ModalAdicionarPessoa.module.css";
import { api } from "../services/api";

export default function ModalAdicionarPessoa({ onClose }) {
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    cpf: "",
    tipo: "",
    senha: "",
    telefone: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const salvar = async () => {
    try {
      const res = await api.criarUsuario(form);

      if (res.ok) {
        alert("Pessoa cadastrada ✅");
        onClose();
      } else {
        alert("Erro ao cadastrar ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Erro no servidor ❌");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Adicionar Pessoa</h2>

        <div className={styles.grid}>
          <input name="nome" placeholder="Nome" onChange={handleChange} />
          <input name="endereco" placeholder="Endereço" onChange={handleChange} />
          <input name="cpf" placeholder="CPF" onChange={handleChange} />
          <select name="tipo" onChange={handleChange} defaultValue="">
            <option value="" disabled>Tipo de Usuário</option>
            <option value="Dentista">Dentista</option>
            <option value="Recepcionista">Recepcionista</option>
            <option value="Auxiliar">Auxiliar</option>
            <option value="Estagiário">Estagiário</option>
            <option value="Paciente">Paciente</option>
          </select>
          <input name="senha" placeholder="Senha" onChange={handleChange} />
          <input name="telefone" placeholder="Telefone" onChange={handleChange} />
        </div>

        <div className={styles.actions}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={salvar}>Salvar</button>
        </div>
      </div>
    </div>
  );
}