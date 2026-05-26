import { useState } from "react";
import { supabase } from "../services/supabaseCliente";
import ModalAdicionarPessoa from "../components/ModalAdicionarPessoa";
import styles from "./Usuarios.module.css";

import casa from "../assets/icones/usuario/casa.png";
import logo from "../assets/logos/odonto-top-branco-fundo-transparente.png";

export default function Usuarios() {
  const [abrirModal, setAbrirModal] = useState(false);

  const [pacientes, setPacientes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);

  const [mostrarPacientes, setMostrarPacientes] =
    useState(true);

  const [mostrarFuncionarios, setMostrarFuncionarios] =
    useState(true);

  const [pesquisaPaciente, setPesquisaPaciente] =
    useState("");

  const [pesquisaFuncionario, setPesquisaFuncionario] =
    useState("");

    const [usuarioSelecionado, setUsuarioSelecionado] =
  useState(null);

const [dadosEdicao, setDadosEdicao] =
  useState({
    nomePessoa: "",
    endereco: "",
    email: "",
    telefone: "",
    tipo: "",
  });

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
    setMostrarFuncionarios(
      !mostrarFuncionarios
    );

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
  const pacientesFiltrados =
    pacientes.filter((pessoa) =>
      pessoa.nomePessoa
        ?.toLowerCase()
        .includes(
          pesquisaPaciente.toLowerCase()
        )
    );

  const funcionariosFiltrados =
    funcionarios.filter((pessoa) =>
      pessoa.nomePessoa
        ?.toLowerCase()
        .includes(
          pesquisaFuncionario.toLowerCase()
        )
    );

  function selecionarUsuario(usuario) {
    setUsuarioSelecionado(usuario);

    setDadosEdicao({
      nomePessoa: usuario.nomePessoa || "",
      endereco: usuario.endereco || "",
      email: usuario.email || "",
      telefone: usuario.telefone || "",
      //senha: usuario.senha || "",
      tipo: usuario.tipo || "",
    });
  }

  async function editarUsuario() {
    if (!usuarioSelecionado) return;

    const { error } = await supabase
      .from("pessoa")
      .update(dadosEdicao)
      .eq("userId", usuarioSelecionado.userId);

    if (error) {
      console.log(error);
      console.log(error.message)
      console.log(error.details)
      console.log(error.hint)
      alert("Erro ao editar usuário");
      return;
    }

    alert("Usuário atualizado!");
    setUsuarioSelecionado(null);
  }

  // =========================
  // EXCLUIR USUÁRIO
  // =========================
  async function excluirUsuario() {

  if (!usuarioSelecionado)
    return;

  const confirmar =
    window.confirm(
      "Deseja excluir este usuário?"
    );

  if (!confirmar) return;

  // REMOVE DO AUTH
  await fetch(
    `http://localhost:3001/excluir-usuario/${usuarioSelecionado.userId}`,
    {
      method: "DELETE",
    }
  );

  // REMOVE DA TABELA PESSOA
  const { error } =
    await supabase
      .from("pessoa")
      .delete()
      .eq(
        "userId",
        usuarioSelecionado.userId
      );

  if (error) {
    console.log(error);

    alert(
      "Erro ao excluir"
    );

    return;
  }

  alert("Usuário excluído");

  setUsuarioSelecionado(null);

  buscarPacientes();
  buscarFuncionarios();
}

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.left}>
          <button
            className={styles.homeIcon}
            onClick={() =>
              (window.location.href = "/home")
            }
          >
            <img
              src={casa}
              alt="voltar"
              className={styles.casa}
            />
          </button>

          <h2 className={styles.titulo}>
            USUÁRIOS
          </h2>
        </div>

        <img
          src={logo}
          alt="logo"
          className={styles.right}
        />
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
              <div className={styles.listaUsuarios}>
                {pacientesFiltrados.map((usuario) => (
                  <p
                    key={usuario.userId}
                    className={styles.nomeUsuario}
                    onClick={() =>
                      selecionarUsuario(usuario)
                    }
                  >
                    {usuario.nomePessoa}
                  </p>
                ))}
              </div>
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
              <div className={styles.listaUsuarios}>

                {/* ESTAGIÁRIOS */}
                <div className={styles.categoriaGrupo}>
                  <p className={styles.categoriaTitulo}>
                    Estagiários
                  </p>

                  {funcionariosFiltrados.map((usuario) =>
                    usuario.tipo === "Estagiário" ? (
                      <p
                        key={usuario.userId}
                        className={styles.nomeUsuario}
                        onClick={() =>
                          selecionarUsuario(usuario)
                        }
                      >
                        {usuario.nomePessoa}
                      </p>
                    ) : null
                  )}
                </div>

                {/* AUXILIARES */}
                <div className={styles.categoriaGrupo}>
                  <p className={styles.categoriaTitulo}>
                    Auxiliares
                  </p>

                  {funcionariosFiltrados.map((usuario) =>
                    usuario.tipo === "Auxiliar" ? (
                      <p
                        key={usuario.userId}
                        className={styles.nomeUsuario}
                        onClick={() =>
                          selecionarUsuario(usuario)
                        }
                      >
                        {usuario.nomePessoa}
                      </p>
                    ) : null
                  )}
                </div>

                {/* RECEPCIONISTAS */}
                <div className={styles.categoriaGrupo}>
                  <p className={styles.categoriaTitulo}>
                    Recepcionistas
                  </p>

                  {funcionariosFiltrados.map((usuario) =>
                    usuario.tipo === "Recepcionista" ? (
                      <p
                        key={usuario.userId}
                        className={styles.nomeUsuario}
                        onClick={() =>
                          selecionarUsuario(usuario)
                        }
                      >
                        {usuario.nomePessoa}
                      </p>
                    ) : null
                  )}
                </div>

                {/* DENTISTAS */}
                <div className={styles.categoriaGrupo}>
                  <p className={styles.categoriaTitulo}>
                    Dentistas
                  </p>

                  {funcionariosFiltrados.map((usuario) =>
                    usuario.tipo === "Dentista" ? (
                      <p
                        key={usuario.userId}
                        className={styles.nomeUsuario}
                        onClick={() =>
                          selecionarUsuario(usuario)
                        }
                      >
                        {usuario.nomePessoa}
                      </p>
                    ) : null
                  )}
                </div>

              </div>
            )}
          </div>

          {/* BOTÃO ADICIONAR */}
          <button
            className={styles.addButton}
            onClick={() =>
              setAbrirModal(true)
            }
          >
            +
          </button>
        </div>

        {/* ÁREA PRINCIPAL */}
        <div className={styles.main}>

          {usuarioSelecionado && (
            <div className={styles.editCard}>

              <h2 className={styles.editTitulo}>
                Editar usuário
              </h2>

              <div className={styles.formGrid}>
                
                <div>
                  <label>Nome</label>

                  <input
                    value={dadosEdicao.nomePessoa}
                    onChange={(e) =>
                      setDadosEdicao({
                        ...dadosEdicao,
                        nomePessoa:
                          e.target.value,
                      })
                    }
                  />
                </div>

                {/*<div>
                  <label>Senha</label>

                  <input
                    value={dadosEdicao.senha}
                    onChange={(e) =>
                      setDadosEdicao({
                        ...dadosEdicao,
                        senha:
                          e.target.value,
                      })
                    }
                  />
                </div>*/}

                <div>
                  <label>Endereço</label>

                  <input
                    value={dadosEdicao.endereco}
                    onChange={(e) =>
                      setDadosEdicao({
                        ...dadosEdicao,
                        endereco:
                          e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label>Tipo Usuário</label>

                  <select
                    value={dadosEdicao.tipo}
                    onChange={(e) =>
                      setDadosEdicao({
                        ...dadosEdicao,
                        tipo:
                          e.target.value,
                      })
                    }
                  >
                    <option>Dentista</option>
                    <option>Auxiliar</option>
                    <option>Recepcionista</option>
                    <option>Estagiário</option>
                    <option>Paciente</option>
                  </select>
                </div>

                <div>
                  <label>E-mail</label>

                  <input
                    value={dadosEdicao.email}
                    onChange={(e) =>
                      setDadosEdicao({
                        ...dadosEdicao,
                        email:
                          e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label>Telefone</label>

                  <input
                    value={dadosEdicao.telefone}
                    onChange={(e) =>
                      setDadosEdicao({
                        ...dadosEdicao,
                        telefone:
                          e.target.value,
                      })
                    }
                  />
                </div>

              </div>

              <div className={styles.buttons}>
                <button
                  className={styles.salvar}
                  onClick={editarUsuario}
                >
                  Confirmar edição
                </button>

                <button
                  className={styles.excluir}
                  onClick={excluirUsuario}
                >
                  Excluir usuário
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* MODAL */}
      {abrirModal && (
        <ModalAdicionarPessoa
          onClose={() =>
            setAbrirModal(false)
          }
        />
      )}
    </div>
  );
}