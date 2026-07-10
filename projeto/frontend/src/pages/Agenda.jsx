import { useState, useEffect } from "react";
import styles from "./Agenda.module.css";
import ModalCriarConsulta from "../components/ModalCriarConsulta";

import casa from "../assets/icones/usuario/casa.png";
import logobranca from "../assets/logos/odonto-top-branco-fundo-transparente.png";
import ModalConsulta from "../components/ModalConsulta";

export default function Agenda() {
  const [dataAtual, setDataAtual] = useState(new Date());
  const [diaSelecionado, setDiaSelecionado] = useState(new Date().getDate());
  const [consultas, setConsultas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [modalCriarConsulta, setModalCriarConsulta] = useState(false);
  const [modalConsulta, setModalConsulta] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  useEffect(() => {
  buscarConsultas();
}, []);

async function buscarConsultas() {

  try {

    const resposta = await fetch(
      "http://localhost:3001/consultas"
    );

    const dados = await resposta.json();

    setConsultas(dados);

  } catch (erro) {

    console.log(erro);

  }

}

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

  function abrirConsulta(consulta) {
  setConsultaSelecionada(consulta);
  setModalConsulta(true);
  }

  const nomeMes = dataAtual.toLocaleString("pt-BR", { month: "long" });
  const nomeMesFormatado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

 const consultasDoDia = consultas.filter((consulta) => {

  // Se estiver pesquisando, ignora o dia
  if (pesquisa.trim() !== "") {

    const texto = pesquisa.toLowerCase();

    return (
      consulta.paciente.pessoa.nomePessoa
        .toLowerCase()
        .includes(texto) ||

      consulta.funcionario.pessoa.nomePessoa
        .toLowerCase()
        .includes(texto)
    );
  }

  // Se não estiver pesquisando, filtra pelo dia normalmente
  const data = new Date(consulta.dataHora);

  return (
    data.getDate() === diaSelecionado &&
    data.getMonth() === mes &&
    data.getFullYear() === ano
  );

});

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
                  {consultas.some((consulta) => {
                        const data = new Date(consulta.dataHora);
                        return (
                          data.getDate() === dia &&
                          data.getMonth() === mes &&
                          data.getFullYear() === ano
                        );

                    })
                    &&
                    <div className={styles.bolinha}></div>
                    }
                </div>
              ))}
            </div>
          </div>

          {/* SEÇÃO INFERIOR: PESQUISA E CONSULTAS REAIS */}
          <div className={styles.secaoInferior}>
            <div className={styles.containerPesquisa}>
              <h3>Dia {diaSelecionado} de {nomeMesFormatado} de {ano}</h3>
              <div className={styles.barraPesquisa}>
               <input 
                  type="text"
                  placeholder="Pesquisar paciente ou funcionário"
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                />
                <button className={styles.btnPesquisa}>🔍</button>
              </div>
            </div>

            {/* 🚀 NOVO: Lista de consultas dinâmica */}
            <div className={styles.containerLista}>
              {consultasDoDia.length > 0 ? (
                <ul className={styles.listaConsultas}>
                  {consultasDoDia.map((consulta) => (
                    <li
                      key={consulta.idConsulta}
                      className={styles.itemConsulta}
                      onClick={() => abrirConsulta(consulta)}
                    >

                      <span className={styles.pontoConsulta}></span>

                      {pesquisa.trim() !== "" && (
                        <>
                          <strong>
                            {new Date(consulta.dataHora).toLocaleDateString("pt-BR")}
                          </strong>
                          {" • "}
                        </>
                      )}

                      <strong>
                        {new Date(consulta.dataHora).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </strong>

                      {" - "}

                      {consulta.funcionario.pessoa.nomePessoa}

                      {" ("}
                      {consulta.paciente.pessoa.nomePessoa}
                      {")"}

                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.semConsulta}>Nenhuma consulta agendada para este dia.</p>
              )}
            </div>
            <div className={styles.containerBotao}>
              <button
                className={styles.botaoCriarConsulta}
                onClick={() => setModalCriarConsulta(true)}
            >
                Criar consulta
            </button>
            </div>
          </div>
          <ModalCriarConsulta
              aberto={modalCriarConsulta}
              fechar={() => setModalCriarConsulta(false)}
          />
          <ModalConsulta
              aberto={modalConsulta}
              consulta={consultaSelecionada}
              fechar={() => setModalConsulta(false)}
          />
        </div>
      </main>

    </div>
  );
}