import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseCliente";
import styles from "./Tratamentos.module.css";
import { api } from "../services/api";

function Tratamentos({ idPaciente }) {

  const [paciente, setPaciente] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Procedimentos temporários
  const [tratamentos, setTratamentos] = useState([]);

  // Controle do formulário
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    data: "",
    procedimento: "",
    valor: "",
  });

  const carregarTratamentos = async () => {

  try {

    const data =
      await api.listarTratamentos(idPaciente);

    setTratamentos(data);

  } catch (error) {

    console.log(error);

  }

};

  const [procedimentos, setProcedimentos] =
useState([]);

const carregarProcedimentos = async () => {

  const { data, error } = await supabase
    .from("procedimento")
    .select("*")
    .order("nomeProcedimento");

  if (error) {
    console.log(error);
    return;
  }

  setProcedimentos(data);
};

  useEffect(() => {

  carregarPaciente();
  carregarProcedimentos();
  carregarTratamentos();

}, [idPaciente]);

  const carregarPaciente = async () => {

    if (!idPaciente) {
      setCarregando(false);
      return;
    }

    const { data, error } = await supabase
      .from("paciente")
      .select(`
        idPaciente,

        pessoa:idPessoaPaciente (
          idPessoa,
          nomePessoa,
          cpfPessoa,
          telefone,
          email,
          endereco
        )
      `)
      .eq("idPaciente", idPaciente)
      .single();

    if (error) {
      console.error("Erro ao buscar paciente:", error);
      setCarregando(false);
      return;
    }

    console.log("Paciente carregado:", data);

    console.log(data);

    setPaciente(data.pessoa);
    setCarregando(false);
  };

  // ABRIR FORMULÁRIO PARA ADICIONAR
  const abrirAdicionar = () => {

    setEditando(null);

    setFormulario({
      data: "",
      procedimento: "",
      valor: "",
    });

    setModalAberto(true);
  };

  // SALVAR PROCEDIMENTO
const salvarTratamento = async (e) => {

  e.preventDefault();

  try {

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (editando) {

      await api.editarTratamento(
        editando,
        {
          data: formulario.data,
          valor: formulario.valor,
          idProcedimentoTratamento:
            formulario.idProcedimento
        }
      );

    } else {

      await api.criarTratamento({
        idPacienteTratamento: Number(idPaciente),

        userId: user.id,

        idProcedimentoTratamento:
          formulario.idProcedimento,

        data: formulario.data,

        valor: formulario.valor
      });

    }

    await carregarTratamentos();

    setModalAberto(false);

  } catch (error) {

    console.log(error);

    alert("Erro ao salvar");

  }

};

  // EDITAR PROCEDIMENTO
  const editarTratamento = (tratamento) => {

    setEditando(tratamento.idTratamento);

    setFormulario({
      data: tratamento.data,
      valor: tratamento.valor,
      idProcedimento:
        tratamento.procedimento.idProcedimento
    });

    setModalAberto(true);
  };

  // EXCLUIR PROCEDIMENTO
  const excluirTratamento = async (id) => {

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este procedimento?"
    );

    if (!confirmar) return;

    try {

      await api.excluirTratamento(id);

      await carregarTratamentos();

    } catch (error) {

      console.log(error);

      alert("Erro ao excluir");

    }
  };

  // CASINHA → VOLTAR PARA A TELA INICIAL
  const irParaHome = () => {
    window.location.href = "/home";
  };

  // CARREGANDO
  if (carregando) {
    return (
      <div className={styles.container}>
        <p>Carregando informações do paciente...</p>
      </div>
    );
  }

  // PACIENTE NÃO ENCONTRADO
  if (!paciente) {
    return (
      <div className={styles.container}>
        <p>Paciente não encontrado.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>

      {/* CABEÇALHO */}
      <header className={styles.header}>

        <div className={styles.tituloHeader}>

          {/* CASINHA → VOLTA PARA HOME */}
          <span
            className={styles.homeIcon}
            onClick={irParaHome}
          >
            ⌂
          </span>

          <span>TRATAMENTOS</span>

        </div>

        <div className={styles.logo}>

          <span className={styles.logoDente}>
            ♢
          </span>

          <span>Odonto Top</span>

        </div>

      </header>

      <div className={styles.conteudo}>

        {/* LATERAL */}
        <aside className={styles.sidebar}>

          <div className={styles.botoesNavegacao}>

            {/* VOLTA PARA TELA ANTERIOR */}
            <button
              className={styles.botaoVoltar}
              onClick={() => window.history.back()}
            >
              ←
            </button>

          </div>

        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className={styles.main}>

          {/* INFORMAÇÕES DO PACIENTE */}
          <div className={styles.informacoesPaciente}>

            <div>

              <div>
                <strong>Paciente:</strong>{" "}
                {paciente.nomePessoa}
              </div>

              <div>
                <strong>Data de nascimento:</strong>{" "}
                {paciente.dataNascimento ||
                  paciente.nascimento ||
                  "--"}
              </div>

              <div>
                <strong>CPF:</strong>{" "}
                {paciente.cpfPessoa || "--"}
              </div>

              <div>
                <strong>Endereço:</strong>{" "}
                {paciente.endereco || "--"}
              </div>

            </div>

            <div className={styles.contato}>

              <strong>Contato:</strong>{" "}
              {paciente.telefone || "--"}

            </div>

          </div>

          {/* TABELA */}
          <div className={styles.tabelaContainer}>

            <table className={styles.tabela}>

              <thead>

                <tr>

                  <th>Data</th>

                  <th>Procedimento</th>

                  <th>Valor</th>

                  <th></th>

                </tr>

              </thead>

              <tbody>

                {tratamentos.length === 0 ? (

                  <tr>

                    <td colSpan="4">
                      Nenhum procedimento cadastrado.
                    </td>

                  </tr>

                ) : (

                  tratamentos.map((tratamento) => (

                    <tr key={tratamento.idTratamento}>

                      <td>
                        {new Date(
                          tratamento.data + "T00:00:00"
                        ).toLocaleDateString("pt-BR")}
                      </td>

                      <td>
                        {tratamento.procedimento?.nomeProcedimento}
                      </td>

                      <td>
                        R${" "}
                        {Number(
                          tratamento.valor
                        ).toFixed(2)}
                      </td>

                      <td>

                        {/* EDITAR */}
                        <button
                          className={styles.botaoEditar}
                          onClick={() =>
                            editarTratamento(tratamento)
                          }
                        >
                          ✏️
                        </button>

                        {/* EXCLUIR */}
                        <button
                          className={styles.botaoExcluir}
                          onClick={() =>
                          excluirTratamento(
                            tratamento.idTratamento
                          )
                        }
                        >
                          🗑️
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* BOTÃO ADICIONAR */}
          <button
            className={styles.botaoAdicionar}
            onClick={abrirAdicionar}
          >
            + Adicionar procedimento
          </button>

        </main>

      </div>

      {/* MODAL */}
      {modalAberto && (

        <div className={styles.fundoModal}>

          <div className={styles.modal}>

            <h2>
              {editando !== null
                ? "Editar procedimento"
                : "Adicionar procedimento"}
            </h2>

            <form onSubmit={salvarTratamento}>

              <label>
                Data
              </label>

              <input
                type="date"
                value={formulario.data}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    data: e.target.value,
                  })
                }
              />

              <label>
                Procedimento
              </label>

              <select
              value={formulario.idProcedimento || ""}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  idProcedimento: Number(e.target.value)
                })
              }
            >

              <option value="">
                Selecione
              </option>

              {procedimentos.map((proc) => (

                <option
                  key={proc.idProcedimento}
                  value={proc.idProcedimento}
                >
                  {proc.nomeProcedimento}
                </option>

              ))}

            </select>

              <label>
                Valor
              </label>

              <input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formulario.valor}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    valor: e.target.value,
                  })
                }
              />

              <div className={styles.botoesModal}>

                <button
                  type="button"
                  onClick={() => {
                    setModalAberto(false);
                    setEditando(null);
                  }}
                >
                  Cancelar
                </button>

                <button type="submit">
                  Salvar
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Tratamentos;