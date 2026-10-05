import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseCliente";
import styles from "./TratamentosPacientes.module.css";

import casa from "../assets/icones/usuario/casa.png";
import logo from "../assets/logos/odonto-top-branco-fundo-transparente.png";

export default function TratamentosPacientes() {

  const [pacientes, setPacientes] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = async () => {

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
          ativo
        )
      `)
      .order("idPaciente");

    if (error) {
      console.error(error);
      setCarregando(false);
      return;
    }

    setPacientes(data || []);
    setCarregando(false);
  };

  const pacientesFiltrados = pacientes.filter(
    (paciente) =>
      paciente.pessoa?.nomePessoa
        ?.toLowerCase()
        .includes(busca.toLowerCase())
  );

 const abrirPaciente = (paciente) => {

  console.log("PACIENTE CLICADO:", paciente);

  window.location.href =
    `/tratamentos/${paciente.idPaciente}`;
};

  const voltar = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>

      <header className={styles.header}>

        <div className={styles.tituloHeader}>
          <span
            className={styles.homeIcon}
            onClick={voltar}
          >
            <img
              src={casa}
              alt="voltar"
              className={styles.casa}
            />

          </span>

          <span>TRATAMENTOS</span>
        </div>

        <img
          src={logo}
          alt="logo"
          className={styles.logo}
        />

      </header>

      <main className={styles.conteudo}>

        <div className={styles.pesquisa}>

          <span className={styles.lupa}>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Pesquisar paciente..."
            value={busca}
            onChange={(e) =>
              setBusca(e.target.value)
            }
          />

        </div>

        <div className={styles.lista}>

          <div className={styles.tituloLista}>
            Pacientes
          </div>

          {carregando ? (

            <p className={styles.mensagem}>
              Carregando...
            </p>

          ) : pacientesFiltrados.length === 0 ? (

            <p className={styles.mensagem}>
              Nenhum paciente encontrado.
            </p>

          ) : (

            pacientesFiltrados.map((paciente) => (

              <button
                key={paciente.idPaciente}
                className={styles.paciente}
                onClick={() =>
                  abrirPaciente(paciente)
                }
              >
                {paciente.pessoa?.nomePessoa}
              </button>

            ))

          )}

        </div>

      </main>

    </div>
  );
}

