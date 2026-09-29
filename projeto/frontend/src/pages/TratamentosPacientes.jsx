import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseCliente";
import styles from "./TratamentosPacientes.module.css";

function TratamentosPacientes() {
  const [pessoas, setPessoas] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  const [tipoSelecionado, setTipoSelecionado] = useState("Paciente");
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    carregarPessoas();
  }, []);

  const carregarPessoas = async () => {
    const { data, error } = await supabase
      .from("pessoa")
      .select("*")
      .eq("ativo", true)
      .order("nomePessoa");

    if (error) {
      console.error("Erro ao buscar pessoas:", error);
      setCarregando(false);
      return;
    }

    setPessoas(data || []);
    setCarregando(false);
  };

  const pacientes = pessoas.filter(
    (pessoa) => pessoa.tipo === "Paciente"
  );

  const funcionarios = pessoas.filter(
    (pessoa) => pessoa.tipo !== "Paciente"
  );

  const filtrarBusca = (lista) => {
    return lista.filter((pessoa) =>
      pessoa.nomePessoa
        ?.toLowerCase()
        .includes(busca.toLowerCase())
    );
  };

  const abrirPaciente = (paciente) => {
    window.location.href = `/tratamentos/${paciente.idPessoa}`;
  };

  const voltar = () => {
    window.history.back();
  };

  // Divide os funcionários pelo cargo
  const gruposFuncionarios = {};

  funcionarios.forEach((funcionario) => {
    const cargo = funcionario.tipo || "Outros";

    if (!gruposFuncionarios[cargo]) {
      gruposFuncionarios[cargo] = [];
    }

    gruposFuncionarios[cargo].push(funcionario);
  });

  return (
    <div className={styles.container}>

      {/* CABEÇALHO */}
      <header className={styles.header}>

        <div className={styles.tituloHeader}>
          <span
            className={styles.homeIcon}
            onClick={voltar}
          >
            🏠
          </span>

          <span>TRATAMENTOS</span>
        </div>

        <div className={styles.logo}>
          <span>♢</span>
          <span>Odonto Top</span>
        </div>

      </header>

      <main className={styles.conteudo}>

        {/* PESQUISA */}
        <div className={styles.pesquisa}>

          <span className={styles.lupa}>⌕</span>

          <input
            type="text"
            placeholder="Pesquisar paciente..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

        </div>

        {/* LISTA */}
        <div className={styles.lista}>

          {/* TÍTULO COM FLECHA */}
          <div
            className={styles.tituloLista}
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <span>
              {tipoSelecionado === "Paciente"
                ? "Pacientes"
                : "Funcionários"}
            </span>

            <span className={styles.seta}>
              {menuAberto ? "▲" : "▼"}
            </span>
          </div>

          {/* MENU PACIENTES / FUNCIONÁRIOS */}
          {menuAberto && (
            <div className={styles.menuTipos}>

              <button
                onClick={() => {
                  setTipoSelecionado("Paciente");
                  setMenuAberto(false);
                  setBusca("");
                }}
              >
                Pacientes
              </button>

              <button
                onClick={() => {
                  setTipoSelecionado("Funcionário");
                  setMenuAberto(false);
                  setBusca("");
                }}
              >
                Funcionários
              </button>

            </div>
          )}

          {carregando ? (
            <p className={styles.mensagem}>
              Carregando...
            </p>
          ) : tipoSelecionado === "Paciente" ? (

            /* PACIENTES */
            filtrarBusca(pacientes).map((paciente) => (
              <button
                key={paciente.idPessoa}
                className={styles.paciente}
                onClick={() => abrirPaciente(paciente)}
              >
                {paciente.nomePessoa}
              </button>
            ))

          ) : (

            /* FUNCIONÁRIOS */
            Object.entries(gruposFuncionarios).map(
              ([cargo, funcionariosDoCargo]) => {

                const funcionariosFiltrados =
                  filtrarBusca(funcionariosDoCargo);

                if (funcionariosFiltrados.length === 0) {
                  return null;
                }

                return (
                  <div
                    key={cargo}
                    className={styles.grupoFuncionario}
                  >

                    <div className={styles.cargo}>
                      {cargo}
                    </div>

                    {funcionariosFiltrados.map((funcionario) => (
                      <button
                        key={funcionario.idPessoa}
                        className={styles.paciente}
                        onClick={() => abrirPaciente(funcionario)}
                      >
                        {funcionario.nomePessoa}
                      </button>
                    ))}

                  </div>
                );
              }
            )
          )}

        </div>

      </main>

    </div>
  );
}

export default TratamentosPacientes;