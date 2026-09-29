import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseCliente";
import styles from "./Tratamentos.module.css";

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

  // BUSCAR PACIENTE
  useEffect(() => {
    carregarPaciente();
  }, [idPaciente]);

  const carregarPaciente = async () => {

    if (!idPaciente) {
      setCarregando(false);
      return;
    }

    const { data, error } = await supabase
      .from("pessoa")
      .select("*")
      .eq("idPessoa", idPaciente)
      .single();

    if (error) {
      console.error("Erro ao buscar paciente:", error);
      setCarregando(false);
      return;
    }

    console.log("Paciente carregado:", data);

    setPaciente(data);
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
  const salvarTratamento = (e) => {

    e.preventDefault();

    if (
      !formulario.data ||
      !formulario.procedimento ||
      !formulario.valor
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    // EDITAR
    if (editando !== null) {

      setTratamentos(
        tratamentos.map((tratamento) =>
          tratamento.id === editando
            ? {
                ...tratamento,
                ...formulario,
              }
            : tratamento
        )
      );

    }

    // ADICIONAR
    else {

      const novoTratamento = {
        id: Date.now(),
        data: formulario.data,
        procedimento: formulario.procedimento,
        valor: formulario.valor,
      };

      setTratamentos([
        ...tratamentos,
        novoTratamento,
      ]);
    }

    setModalAberto(false);
    setEditando(null);

    setFormulario({
      data: "",
      procedimento: "",
      valor: "",
    });
  };

  // EDITAR PROCEDIMENTO
  const editarTratamento = (tratamento) => {

    setEditando(tratamento.id);

    setFormulario({
      data: tratamento.data,
      procedimento: tratamento.procedimento,
      valor: tratamento.valor,
    });

    setModalAberto(true);
  };

  // EXCLUIR PROCEDIMENTO
  const excluirTratamento = (id) => {

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este procedimento?"
    );

    if (!confirmar) return;

    setTratamentos(
      tratamentos.filter(
        (tratamento) => tratamento.id !== id
      )
    );
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

            {/* SETA PARA TRÁS — DESATIVADA */}
            <button
              className={styles.botaoVoltar}
              disabled
            >
              ←
            </button>

            {/* SETA PARA FRENTE — DESATIVADA */}
            <button
              className={styles.botaoAvancar}
              disabled
            >
              →
            </button>

          </div>

          {/* DESENHO DA BOCA */}
          <div className={styles.dente}>

            <div className={styles.bocaFundo}></div>

            <div className={styles.labioSuperior}></div>

            <div className={styles.dentesSuperior}>

              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

            </div>

            <div className={styles.dentesInferior}>

              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

            </div>

            <div className={styles.labioInferior}></div>

            <div className={styles.linhaDente}>

              <span></span>
              <div></div>
              <span></span>

            </div>

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

                    <tr key={tratamento.id}>

                      <td>
                        {new Date(
                          tratamento.data + "T00:00:00"
                        ).toLocaleDateString("pt-BR")}
                      </td>

                      <td>
                        {tratamento.procedimento}
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
                              tratamento.id
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

              <input
                type="text"
                placeholder="Ex.: Limpeza"
                value={formulario.procedimento}
                onChange={(e) =>
                  setFormulario({
                    ...formulario,
                    procedimento: e.target.value,
                  })
                }
              />

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