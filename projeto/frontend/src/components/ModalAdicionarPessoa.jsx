import { useState } from "react";
import styles from "./ModalAdicionarPessoa.module.css";
//import { api } from "../services/api";

import { supabase } from "../services/supabaseCliente";

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
      <div className={styles.box}>
        <h2 className={styles.titulo}>Adicionar Pessoa</h2>
        <div className={styles.modal}>

          <div className={styles.grid}>
            <label className={styles.subtitulo}>Nome</label>
            <input name="nome" onChange={handleChange} className={styles.option} />
            <label className={styles.subtitulo}>Endereço</label>
            <input name="endereco" onChange={handleChange} className={styles.option} />
            <label className={styles.subtitulo}>CPF</label>
            <input name="cpf" onChange={handleChange} className={styles.option} />
            <label className={styles.subtitulo}>Telefone</label>
            <input name="telefone" onChange={handleChange} className={styles.option} />
          </div>
          <div className={styles.grid}>
            <label className={styles.subtitulo}>Email</label>
            <input name="email" onChange={handleChange} className={styles.option} /> {/* 🔥 ESSENCIAL */}
            <label className={styles.subtitulo}>Senha</label>
            <input name="senha" type="password" onChange={handleChange} className={styles.option} />
            <label className={styles.subtitulo}>Tipo de Usuário</label>
            <select name="tipo" onChange={handleChange} defaultValue="" className={styles.option}>
              <option value="" disabled></option>
              <option value="Dentista">Dentista</option>
              <option value="Recepcionista">Recepcionista</option>
              <option value="Auxiliar">Auxiliar</option>
              <option value="Estagiário">Estagiário</option>
              <option value="Paciente">Paciente</option>
              <option value="Funcionario">Funcionario</option>
            </select>
          </div>
        </div>
        
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.button}>Cancelar</button>
          <button onClick={salvar} className={`${styles.button} ${styles.self}`}>Salvar</button>
        </div>
      </div>
    </div>
  );
}