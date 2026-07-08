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
      const response = await fetch(
        "http://localhost:3001/criar-usuario",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            senha: form.senha,
          }),
        }
      );

      const usuarioCriado = await response.json();

        if (!response.ok) {
          console.error(usuarioCriado);

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
            userId: usuarioCriado.id,
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
    //if (form.tipo === "Paciente") {
    //   await supabase.from("paciente").insert([
    //      { idPessoa }
    //    ]);
    //  }

    // PACIENTE
      if (form.tipo === "Paciente") {

        const { error } = await supabase
          .from("paciente")
          .insert([
            {
              idPessoaPaciente: idPessoa,
              dataCadastro: new Date(),
              planoDeSaude: null,
              observacoes: null
            }
          ]);

        if (error) {
          console.log(error);
        }
      }

      // FUNCIONÁRIOS
      else {

        // procura o cargo escolhido
        const { data: cargo, error: erroCargo } =
          await supabase
            .from("cargo")
            .select("idCargo")
            .eq("nomeCargo", form.tipo)
            .single();

        if (erroCargo) {
          console.log(erroCargo);
          alert("Cargo não encontrado.");
          return;
        }

        const { error } = await supabase
          .from("funcionario")
          .insert([
            {
              idPessoaFuncionario: idPessoa,
              idCargoFuncionario: cargo.idCargo
            }
          ]);

        if (error) {
          console.log(error);
          alert("Erro ao cadastrar funcionário.");
          return;
        }
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

      <div className={styles.header}>
        <h2 className={styles.titulo}>Adicionar Pessoa</h2>
      </div>

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
          <input name="email" onChange={handleChange} className={styles.option} />

          <label className={styles.subtitulo}>Senha</label>
          <input
            name="senha"
            type="password"
            onChange={handleChange}
            className={styles.option}
          />

          <label className={styles.subtitulo}>Tipo de Usuário</label>
          <select
            name="tipo"
            onChange={handleChange}
            defaultValue=""
            className={styles.option}
          >
            <option value="" disabled></option>
            <option value="Dentista">Dentista</option>
            <option value="Recepcionista">Recepcionista</option>
            <option value="Auxiliar">Auxiliar</option>
            <option value="Estagiário">Estagiário</option>
            <option value="Paciente">Paciente</option>
          </select>

          <div className={styles.actions}>

            <button onClick={salvar} className={`${styles.button} ${styles.save}`}>
              Salvar
            </button>

            <button onClick={onClose} className={`${styles.button} ${styles.close}`}>
              Cancelar
            </button>

          </div>
        </div>

      </div>

    </div>
  </div>
);
}