import { useState } from "react";
import styles from "./ModalAdicionarPessoa.module.css";

export default function ModalAdicionarPessoa({ onClose }) {
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    cpf: "",
    tipo: "",
    senha: "",
    telefone: "",
    email: "" 
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const salvar = async () => {
    try {
      //const res = await api.criarUsuario(form);
      console.log(form); //DEBUG

      // 🚨 validação básica
      if (!form.email || !form.senha) {
        alert("Email e senha são obrigatórios ❌");
        return;
      }

      // 1. criar usuário (AUTH)
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.senha,
      });

      if (error) {
        console.error(error);
        alert("Erro no cadastro ❌");
        return;
      }

      // 2. salvar na tabela pessoa
      const { data: pessoaData, error: errorPessoa } = await supabase
        .from("pessoa")
        .insert([
          {
            nomePessoa: form.nome,
            cpfPessoa: form.cpf,
            telefone: form.telefone,
            email: form.email,
            endereco: form.endereco,
            tipo: form.tipo,
            userId: data.user.id,
          },
        ])
        .select();

      if (errorPessoa) {
        console.error(errorPessoa);
        alert("Erro ao salvar pessoa ❌");
        return;
      }

      const idPessoa = pessoaData[0].idPessoa;

//      if (res.ok) {
//        alert("Pessoa cadastrada ✅");
//        onClose();
//      } else {
//        alert("Erro ao cadastrar ❌");

      // 3. salvar na tabela específica
      if (form.tipo === "Paciente") {
        await supabase.from("paciente").insert([
          { idPessoa }
        ]);
      }

      if (form.tipo === "Funcionario") {
        await supabase.from("funcionario").insert([
          { idPessoa }
        ]);
      }

      alert("Cadastro realizado com sucesso ✅");
      onClose();

    } catch (err) {
      console.error(err);
      alert("Erro geral ❌");
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
          <input name="telefone" placeholder="Telefone" onChange={handleChange} />

          <input name="email" placeholder="Email" onChange={handleChange} /> {/* 🔥 ESSENCIAL */}

          <input name="senha" type="password" placeholder="Senha" onChange={handleChange} />

          <select name="tipo" onChange={handleChange} defaultValue="">
            <option value="" disabled>Tipo de Usuário</option>
            <option value="Dentista">Dentista</option>
            <option value="Recepcionista">Recepcionista</option>
            <option value="Auxiliar">Auxiliar</option>
            <option value="Estagiário">Estagiário</option>
            <option value="Paciente">Paciente</option>
            <option value="Funcionario">Funcionario</option>
          </select>
        </div>

        <div className={styles.actions}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={salvar}>Salvar</button>
        </div>
      </div>
    </div>
  );
}