import { useState } from "react";
import styles from "./Agenda.module.css";

import casa from "../assets/icones/usuario/casa.png";
import logobranca from "../assets/logos/odonto-top-branco-fundo-transparente.png";

// 🚀 NOVO: Dados simulados de consultas para os dias com bolinha (múltiplos de 4)
const consultasFicticias = {
  4: [
    { id: 1, profissional: "Dr. Macedo Odonto", paciente: "Marjory Almeida", hora: "09:00" },
    { id: 2, profissional: "Dr. José Cavalão", paciente: "Dani Gargamel", hora: "14:30" }
  ],
  8: [
    { id: 3, profissional: "Dra. Ana Dentes", paciente: "Carlos Souza", hora: "10:00" }
  ],
  12: [
    { id: 4, profesional: "Dr. Macedo Odonto", paciente: "Lucas Lima", hora: "11:15" },
    { id: 5, profissional: "Dra. Amanda Ortodontia", paciente: "Julia Costa", hora: "16:00" }
  ],
  16: [
    { id: 6, profissional: "Dr. José Cavalão", paciente: "Bruno Silva", hora: "08:30" }
  ],
  20: [
    { id: 7, profissional: "Dra. Ana Dentes", paciente: "Fernanda Ribeiro", hora: "15:00" }
  ],
  24: [
    { id: 8, profissional: "Dra. Amanda Ortodontia", paciente: "Pedro Santos", hora: "13:00" }
  ],
  28: [
    { id: 9, profissional: "Dr. Macedo Odonto", paciente: "Beatriz Oliveira", hora: "17:30" }
  ]
};

export default function Agenda() {
  const [dataAtual, setDataAtual] = useState(new Date());
  const [diaSelecionado, setDiaSelecionado] = useState(new Date().getDate());

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  const dias = Array.from({ length: totalDias }, (_, i) => i + 1);

  function proximoMes() {
    setDataAtual(new Date(ano, mes + 1, 1));
    setDiaSelecionado(1);
  }

  function mesAnterior() {
    setDataAtual(new Date(ano, mes - 1, 1));
    setDiaSelecionado(1);
  }

  const nomeMes = dataAtual.toLocaleString("pt-BR", { month: "long" });
  const nomeMesFormatado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

  // 🚀 NOVO: Pega as consultas do dia selecionado (se houver)
  const consultasDoDia = consultasFicticias[diaSelecionado] || [];

  return (
    <div className={styles.page}>
      
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.left}>
          <button className={styles.homeIcon} onClick={() => (window.location.href = "/home")}>
            <img src={casa} alt="Home" className={styles.casa} />
          </button>
          <h1 className={styles.titulo}>AGENDA</h1>
        </div>
        <img src={logobranca} alt="Odonto Top" className={styles.logo} />
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className={styles.main}>
        <div className={styles.card}>
          
          {/* TOPO: MÊS E SETAS */}
          <div className={styles.topoCalendario}>
            <h2>{nomeMesFormatado} de {ano}</h2>
            <div className={styles.setas}>
              <button onClick={mesAnterior}>{"<"}</button>
              <button onClick={proximoMes}>{">"}</button>
            </div>
          </div>

          {/* O CALENDÁRIO BRANCO */}
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
                <div key={"e" + i} className={styles.diaVazio}></div>
              ))}

              {dias.map((dia) => (
                <div 
                  key={dia} 
                  className={`${styles.dia} ${dia === diaSelecionado ? styles.diaAtivo : ""}`}
                  onClick={() => setDiaSelecionado(dia)}
                >
                  {dia}
                  {dia % 4 === 0 && <div className={styles.bolinha}></div>}
                </div>
              ))}
            </div>
          </div>

          {/* SEÇÃO INFERIOR: PESQUISA E CONSULTAS REAIS */}
          <div className={styles.secaoInferior}>
            <div className={styles.containerPesquisa}>
              <h3>Dia {diaSelecionado} de {nomeMesFormatado} de {ano}</h3>
              <div className={styles.barraPesquisa}>
                <input type="text" placeholder="" />
                <button className={styles.btnPesquisa}>🔍</button>
              </div>
            </div>

            {/* 🚀 NOVO: Lista de consultas dinâmica */}
            <div className={styles.containerLista}>
              {consultasDoDia.length > 0 ? (
                <ul className={styles.listaConsultas}>
                  {consultasDoDia.map((consulta) => (
                    <li key={consulta.id}>
                      <span className={styles.pontoConsulta}></span>
                      <strong>{consulta.hora}</strong> - {consulta.profissional} ({consulta.paciente})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.semConsulta}>Nenhuma consulta agendada para este dia.</p>
              )}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}