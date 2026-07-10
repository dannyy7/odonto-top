import styles from "./ModalCriarConsulta.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseCliente";

export default function ModalCriarConsulta({ aberto, fechar }) {

  const [pacientes, setPacientes] = useState([]);
  const [dentistas, setDentistas] = useState([]);
  const [procedimentos, setProcedimentos] = useState([]);

  const [pacienteSelecionado, setPacienteSelecionado] = useState("");
  const [dentistaSelecionado, setDentistaSelecionado] = useState("");
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState("");

  const [dia, setDia] = useState(1);
  const [mes, setMes] = useState(1);
  const [ano, setAno] = useState(2026);

  const [hora, setHora] = useState("00");
  const [minuto, setMinuto] = useState("00");

  const [novoProcedimento, setNovoProcedimento] = useState("");

  useEffect(() => {
  buscarPacientes();
  buscarDentistas();
  buscarProcedimentos();
  }, []);

  async function buscarPacientes() {

  const { data, error } = await supabase
    .from("paciente")
    .select(`
      idPaciente,
      idPessoaPaciente,
      pessoa!paciente_idPessoaPaciente_fkey(
        nomePessoa
      )
    `);

  console.log(data);
  console.log(error);

  if (error) return;

  setPacientes(data);
}

async function buscarDentistas() {

  const { data, error } = await supabase
    .from("funcionario")
    .select(`
      idFuncionario,
      idPessoaFuncionario,
      pessoa!funcionario_idPessoaFuncionario_fkey(
        nomePessoa,
        tipo
      )
    `);

  console.log(data);
  console.log(error);

  if (error) return;

  const somenteDentistas = data.filter(
    funcionario => funcionario.pessoa?.tipo === "Dentista"
  );

  setDentistas(somenteDentistas);
}

async function buscarProcedimentos() {

  const { data, error } = await supabase
    .from("procedimento")
    .select("*");

  console.log(data);
  console.log(error);

  if (error) return;

  setProcedimentos(data);
}

async function salvarConsulta() {

  const dataHora =
    `${ano}-${String(mes).padStart(2,"0")}-${String(dia).padStart(2,"0")} ${hora}:${minuto}:00`;

  // Salva a consulta
  const { data: consulta, error } = await supabase
    .from("consulta")
    .insert({
      dataHora: dataHora,
      tipo: "Primeira Consulta",
      status: "Agendada",
      idPacienteConsulta: pacienteSelecionado,
      idFuncionarioConsulta: dentistaSelecionado
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    alert("Erro ao criar consulta");
    return;
  }

  // Salva o procedimento da consulta
  const { error: erroProcedimento } = await supabase
  .from("consultaProcedimento")
  .insert({
    idConsulProc: consulta.idConsulta,
    idProcConsul: procedimentoSelecionado
  });

  if (erroProcedimento) {
    console.log(erroProcedimento);
    console.log(erroProcedimento.message);
    console.log(erroProcedimento.details);
    console.log(erroProcedimento.hint);
    console.log(erroProcedimento.code);
    alert("Erro ao salvar procedimento");
    return;
  }

  alert("Consulta criada!");

  fechar();
}

function adicionarProcedimento(e) {

  if (e.key !== "Enter") return;

  e.preventDefault();

  const nome = novoProcedimento.trim();

  if (!nome) return;

  const procedimento = {
    idProcedimento: `novo-${Date.now()}`,
    nomeProcedimento: nome
  };

  setProcedimentos((lista) => [...lista, procedimento]);

  setProcedimentoSelecionado(procedimento.idProcedimento);

  setNovoProcedimento("");
}

  if (!aberto) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <h2>Criar consulta</h2>

        <label>Paciente</label>
        <select
          value={pacienteSelecionado}
          onChange={(e) => setPacienteSelecionado(e.target.value)}
        >

          <option value="">
            Selecione
          </option>

          {pacientes.map((paciente) => (

            <option
              key={paciente.idPaciente}
              value={paciente.idPaciente}
            >
              {paciente.pessoa.nomePessoa}
            </option>

          ))}

        </select>

        <label>Dentista</label>
        <select
          value={dentistaSelecionado}
          onChange={(e) => setDentistaSelecionado(e.target.value)}
        >

  <option value="">
    Selecione
  </option>

  {dentistas.map((dentista) => (

    <option
      key={dentista.idFuncionario}
      value={dentista.idFuncionario}
    >
      {dentista.pessoa.nomePessoa}
    </option>

  ))}

</select>

<label>Procedimento</label>

<select
    value={procedimentoSelecionado}
    onChange={(e) => setProcedimentoSelecionado(e.target.value)}
>

    <option value="">
        Selecione
    </option>

    {procedimentos.map((procedimento) => (

        <option
            key={procedimento.idProcedimento}
            value={procedimento.idProcedimento}
        >
            {procedimento.nomeProcedimento}
        </option>

    ))}

</select>

<input
    type="text"
    placeholder="Adicionar procedimento..."
    value={novoProcedimento}
    onChange={(e) => setNovoProcedimento(e.target.value)}
    onKeyDown={adicionarProcedimento}
    className={styles.inputProcedimento}
/>

        <div className={styles.linha}>

          <div className={styles.bloco}>
            <label>Data</label>

            <div className={styles.data}>
              <div>
                <span>Dia</span>
                <select
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div>
                <span>Mês</span>
                <select
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div>
                <span>Ano</span>
                <select
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                >
                  <option>2026</option>
                  <option>2027</option>
                </select>
              </div>

            </div>
          </div>

          <div className={styles.bloco}>

            <label>Horário</label>

            <div className={styles.hora}>

              <div>
                <span>Horas</span>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i}>{String(i).padStart(2, "0")}</option>
                  ))}
                </select>
              </div>

              <div>
                <span>Minutos</span>
                <select
                  value={minuto}
                  onChange={(e) => setMinuto(e.target.value)}
                >
                  <option>00</option>
                  <option>15</option>
                  <option>30</option>
                  <option>45</option>
                </select>
              </div>

            </div>

          </div>

        </div>

        <div className={styles.botoes}>
          <button onClick={fechar} className={styles.cancelar}>
            Cancelar
          </button>

         <button
          className={styles.salvar}
          onClick={salvarConsulta}
        >Salvar</button>
        </div>

      </div>
    </div>
  );
}