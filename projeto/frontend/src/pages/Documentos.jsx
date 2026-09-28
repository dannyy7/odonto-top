import styles from "./Documentos.module.css";

import logobranca from "../assets/logos/odonto-top-branco-fundo-transparente.png";
import casa from "../assets/icones/usuario/casa.png";

export default function Documentos() {
  const modelos = [
    "Consentimento",
    "Receita",
    "Atestado",
    "Orçamento",
    "Contrato",
    "Encaminhamento",
    "Declaração",
    "Ficha de Anamnese",
  ];

  const maisUtilizados = [
    "Consentimento",
    "Receita",
    "Atestado",
    "Orçamento",
  ];

  return (
    <div className={styles.documentosPage}>

      {/* CABEÇALHO */}
      <header className={styles.header}>

        <div className="home">
            <button
            className={styles.homeIcon}
            onClick={() => (window.location.href = "/home")}
            >
            <img
                src={casa}
                alt="voltar"
                className={styles.casa}
            />
            </button>
        </div>




        <h1>MODELOS DE DOCUMENTOS</h1>

        <img
          src={logobranca}
          alt="Odonto Top"
          className={styles.logo}
        />

      </header>


      {/* ÁREA DE PESQUISA */}
      <div className={styles.searchArea}>

        <div className={styles.searchBox}>
          <span className={styles.searchIcon}></span>

          <input
            type="text"
            placeholder=""
          />
        </div>

        <button className={styles.filterButton} title="Filtrar">
          <span className={styles.filterIcon}>filtro</span>
        </button>

        <button className={styles.addButton} title="Adicionar modelo">
          <span>+</span>
        </button>

      </div>


      {/* MAIS UTILIZADOS */}
      <section className={styles.sectionMostUsed}>

        <div className={styles.sectionHeader}>

          <div className={styles.sectionTitle}>
            <span className={styles.star}>★</span>
            <span>Mais utilizados</span>
          </div>

          <span className={styles.arrow}>⌄</span>

        </div>


        <div className={styles.mostUsedGrid}>

          {maisUtilizados.map((modelo, index) => (
            <div
              className={styles.documentItem}
              key={index}
            >
              <span className={styles.documentIcon}>
                <span></span>
              </span>

              <span className={styles.documentName}>
                {modelo}
              </span>
            </div>
          ))}

        </div>

      </section>


      {/* TODOS OS MODELOS */}
      <section className={styles.allModels}>

        <div className={styles.allModelsHeader}>

          <div className={styles.documentsIcon}>
            <span></span>
            <span></span>
          </div>

          <span>Todos modelos</span>

        </div>


        <div className={styles.modelsList}>

          {modelos.map((modelo, index) => (
            <div
              className={styles.documentItem}
              key={index}
            >
              <span className={styles.documentIcon}>
                <span></span>
              </span>

              <span className={styles.documentName}>
                {modelo}
              </span>
            </div>
          ))}

        </div>

      </section>

    </div>
  );
}