import styles from "./ModalCriarConsulta.module.css";

export default function ModalCriarConsulta({ aberto, fechar }) {
  if (!aberto) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <h2>Criar consulta</h2>

        <label>Paciente</label>
        <input type="text" />

        <label>Dentista</label>
        <input type="text" />

        <label>Procedimento</label>
        <select>
          <option></option>
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