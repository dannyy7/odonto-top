import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseCliente";
import ModalAdicionarPessoa from "../components/ModalAdicionarPessoa";
import styles from "./Usuarios.module.css";

import casa from "../assets/icones/usuario/casa.png";
import logo from "../assets/logos/odonto-top-branco-fundo-transparente.png";

export default function Usuarios() {

  const [abrirModal, setAbrirModal] = useState(false);

  const [pacientes, setPacientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  const [mostrarPacientes, setMostrarPacientes] = useState(false);
  const [mostrarFuncionarios, setMostrarFuncionarios] = useState(false);

  const [pesquisaPaciente, setPesquisaPaciente] = useState("");
  const [pesquisaFuncionario, setPesquisaFuncionario] = useState("");

  // =========================
  // BUSCAR PACIENTES
  // =========================
  async function buscarPacientes() {

    setMostrarPacientes(!mostrarPacientes);

    const { data, error } = await supabase
      .from("pessoa")
      .select("*")
      .eq("tipo", "Paciente");

    if (error) {
      console.log(error);
      return;
    }

    setPacientes(data || []);
  }

  // =========================
  // BUSCAR FUNCIONÁRIOS
  // =========================
  async function buscarFuncionarios() {

    setMostrarFuncionarios(!mostrarFuncionarios);

    const { data, error } = await supabase
      .from("pessoa")
      .select("*")
      .neq("tipo", "Paciente");

    if (error) {
      console.log(error);
      return;
    }

    setFuncionarios(data || []);
  }

  // =========================
  // FILTROS
  // =========================
  const pacientesFiltrados = pacientes.filter((pessoa) =>
    pessoa.nomePessoa
      ?.toLowerCase()
      .includes(pesquisaPaciente.toLowerCase())
  );

  const funcionariosFiltrados = funcionarios.filter((pessoa) =>
    pessoa.nomePessoa
      ?.toLowerCase()
      .includes(pesquisaFuncionario.toLowerCase())
  );

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <div className={styles.header}>

        <div className={styles.left}>

          <button
            className={styles.homeIcon}
            onClick={() => window.location.href = "/home"}
          >
            <img src={casa} alt="voltar" className={styles.casa} />
          </button>

          <h2 className={styles.titulo}>USUÁRIOS</h2>

        </div>

        <img src={logo} alt="logo" className={styles.right} />

      </div>

      {/* CONTEÚDO */}
      <div className={styles.content}>

        {/* SIDEBAR */}
        <div className={styles.sidebar}>


          {/* PACIENTES */}
        <div className={styles.secaoUsuarios}>

          <p
            className={styles.subtitulo}
            onClick={buscarPacientes}
          >
            Pacientes
          </p>

          {mostrarPacientes && (
            <>
              <input
                type="text"
                placeholder="Pesquisar paciente..."
                className={styles.search}
                value={pesquisaPaciente}
                onChange={(e) => setPesquisaPaciente(e.target.value)}
              />

              <div className={styles.listaUsuarios}>

                {pacientesFiltrados.slice(0, 5).map((usuario) => (
                  <p
                    key={usuario.userId}
                    className={styles.nomeUsuario}
                  >
                    {usuario.nomePessoa}
                  </p>
                ))}

              </div>
            </>
          )}

        </div>

        {/* FUNCIONÁRIOS */}
        <div className={styles.secaoUsuarios}>

          <p
            className={styles.subtitulo}
            onClick={buscarFuncionarios}
          >
            Funcionários
          </p>

          {mostrarFuncionarios && (
            <>
              <input
                type="text"
                placeholder="Pesquisar funcionário..."
                className={styles.search}
                value={pesquisaFuncionario}
                onChange={(e) => setPesquisaFuncionario(e.target.value)}
              />

              <div className={styles.listaUsuarios}>

                {funcionariosFiltrados.slice(0, 5).map((usuario) => (
                  <p
                    key={usuario.userId}
                    className={styles.nomeUsuario}
                  >
                    {usuario.nomePessoa}
                  </p>
                ))}

              </div>
            </>
          )}

        </div>

                  

          {/* BOTÃO ADICIONAR */}
          <button
            className={styles.addButton}
            onClick={() => setAbrirModal(true)}
          >
            +
          </button>

        </div>

        {/* ÁREA PRINCIPAL */}
        <div className={styles.main}></div>

      </div>

      {/* MODAL */}
      {abrirModal && (
        <ModalAdicionarPessoa
          onClose={() => setAbrirModal(false)}
        />
      )}

    </div>
  );
}