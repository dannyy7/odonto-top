import styles from "./ModalCriarConsulta.module.css";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseCliente";

export default function ModalCriarConsulta({ aberto, fechar }) {

  const [pacientes, setPacientes] = useState([]);
  const [dentistas, setDentistas] = useState([]);
  const [procedimentos, setProcedimentos] = useState([]);

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
  if (!aberto) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <h2>Criar consulta</h2>

        <label>Paciente</label>
        <select>

          <option value="">
            Selecione
          </option>

          {pacientes.map((paciente) => (

            <option
              key={paciente.idPessoaPaciente}
              value={paciente.idPessoaPaciente}
            >
              {paciente.pessoa.nomePessoa}
            </option>

          ))}

        </select>

        <label>Dentista</label>
        <select>

  <option value="">
    Selecione
  </option>

  {dentistas.map((dentista) => (

    <option
      key={dentista.idPessoaFuncionario}
      value={dentista.idPessoaFuncionario}
    >
      {dentista.pessoa.nomePessoa}
    </option>

  ))}

</select>

        <label>Procedimento</label>
        <select>

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

        <div className={styles.linha}>

          <div className={styles.bloco}>
            <label>Data</label>

            <div className={styles.data}>
              <div>
                <span>Dia</span>
                <select>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div>
                <span>Mês</span>
                <select>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div>
                <span>Ano</span>
                <select>
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
                <select>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i}>{String(i).padStart(2, "0")}</option>
                  ))}
                </select>
              </div>

              <div>
                <span>Minutos</span>
                <select>
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

          <button className={styles.salvar}>
            Salvar
          </button>
        </div>

      </div>
    </div>
  );
}