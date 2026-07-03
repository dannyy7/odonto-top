import { useState } from "react";
import styles from "./Agenda.module.css";

import casa from "../assets/icones/usuario/casa.png";
import logobranca from "../assets/logos/odonto-top-branco-fundo-transparente.png";

export default function Agenda() {

  const [dataAtual, setDataAtual] = useState(new Date());

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  const dias = Array.from({ length: totalDias }, (_, i) => i + 1);

  function proximoMes() {
    setDataAtual(new Date(ano, mes + 1, 1));
  }

  function mesAnterior() {
    setDataAtual(new Date(ano, mes - 1, 1));
  }

  return (
    <div className={styles.page}>

      <header className={styles.header}>

        <div className={styles.left}>
          <button
            className={styles.homeIcon}
            onClick={() => (window.location.href = "/home")}
          >
            <img src={casa} alt="Home" className={styles.casa} />
          </button>

          <h1 className={styles.titulo}>AGENDA</h1>
        </div>

        <img
          src={logobranca}
          alt="Odonto Top"
          className={styles.logo}
        />

      </header>

      <main className={styles.main}>

        <div className={styles.card}>

          <div className={styles.topoCalendario}>
            <h2>
              {dataAtual.toLocaleString("pt-BR", {
                month: "long",
                year: "numeric"
              })}
            </h2>

            <div className={styles.setas}>
              <button onClick={mesAnterior}>{"<"}</button>
              <button onClick={proximoMes}>{">"}</button>
            </div>
          </div>

          <div className={styles.calendario}>

            <div className={styles.diasSemana}>
              <span>DOM</span>
              <span>SEG</span>
              <span>TER</span>
              <span>QUA</span>
              <span>QUI</span>
              <span>SEX</span>
              <span>SÁB</span>
            </div>

            <div className={styles.gridDias}>

              {Array.from({ length: primeiroDia }).map((_, i) => (
                <div key={"e" + i}></div>
              ))}

              {dias.map((dia) => (
                <div key={dia} className={styles.dia}>
                  {dia}

                  {dia % 4 === 0 && (
                    <div className={styles.bolinha}></div>
                  )}
                </div>
              ))}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}