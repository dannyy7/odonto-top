import styles from "./Tratamentos.module.css";

function Tratamentos() {
  const paciente = {
    nome: "Nome completo do paciente",
    nascimento: "dd/mm/aaaa",
    contato: "(00)0000-0000",
  };

  const tratamentos = [
    {
      data: "",
      procedimento: "",
      valor: "",
    },
    {
      data: "",
      procedimento: "",
      valor: "",
    },
    {
      data: "",
      procedimento: "",
      valor: "",
    },
    {
      data: "",
      procedimento: "",
      valor: "",
    },
    {
      data: "",
      procedimento: "",
      valor: "",
    },
  ];

  const voltar = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>

      {/* CABEÇALHO */}
      <header className={styles.header}>

        <div className={styles.tituloHeader}>
          <span className={styles.homeIcon}>⌂</span>
          <span>TRATAMENTOS</span>
        </div>

        <div className={styles.logo}>
          <span className={styles.logoDente}>♢</span>
          <span>Odonto Top</span>
        </div>

      </header>

      <div className={styles.conteudo}>

        {/* LATERAL */}
        <aside className={styles.sidebar}>

          <div className={styles.botoesNavegacao}>

            <button
              className={styles.botaoVoltar}
              onClick={voltar}
            >
              ←
            </button>

            <button
              className={styles.botaoAvancar}
              onClick={() => window.history.forward()}
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
                {paciente.nome}
              </div>

              <div>
                <strong>Data de nascimento:</strong>{" "}
                {paciente.nascimento}
              </div>
            </div>

            <div className={styles.contato}>
              <strong>Contato:</strong>{" "}
              {paciente.contato}
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
                </tr>
              </thead>

              <tbody>

                {tratamentos.map((tratamento, index) => (
                  <tr key={index}>

                    <td>{tratamento.data}</td>

                    <td>{tratamento.procedimento}</td>

                    <td>{tratamento.valor}</td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </main>

      </div>

    </div>
  );
}

export default Tratamentos;
