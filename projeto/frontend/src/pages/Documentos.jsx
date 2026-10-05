import styles from "./Documentos.module.css";

import logobranca from "../assets/logos/odonto-top-branco-fundo-transparente.png";
import casa from "../assets/icones/usuario/casa.png";

export default function Documentos() {
  // Mapeamento dos modelos principais com os IDs exatos que estão no Supabase
  const maisUtilizados = [
    { nome: "Consentimento", id: 4 },
    { nome: "Receita", id: 2 },
    { nome: "Atestado", id: 1 },
    { nome: "Orçamento", id: 3 },
  ];

  const modelos = [
    { nome: "Consentimento", id: 4 },
    { nome: "Receita", id: 2 },
    { nome: "Atestado", id: 1 },
    { nome: "Orçamento", id: 3 },
    { nome: "Contrato", id: null },
    { nome: "Encaminhamento", id: null },
    { nome: "Declaração", id: null },
    { nome: "Ficha de Anamnese", id: null },
  ];

  // Função que abre o PDF do backend numa nova aba ao clicar
  const abrirDocumento = (id, nome) => {
    if (!id) {
      alert(`O modelo "${nome}" ainda não possui PDF cadastrado.`);
      return;
    }
    // Altere a porta/url se o seu backend estiver noutra porta (ex: http://localhost:3000)
    window.open(`http://localhost:3001/api/documentos/${id}`, "_blank");
  };

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
          {maisUtilizados.map((item, index) => (
            <div
              className={styles.documentItem}
              key={index}
              onClick={() => abrirDocumento(item.id, item.nome)}
              style={{ cursor: "pointer" }}
            >
              <span className={styles.documentIcon}>
                <span></span>
              </span>
              <span className={styles.documentName}>
                {item.nome}
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
          {modelos.map((item, index) => (
            <div
              className={styles.documentItem}
              key={index}
              onClick={() => abrirDocumento(item.id, item.nome)}
              style={{ cursor: "pointer" }}
            >
              <span className={styles.documentIcon}>
                <span></span>
              </span>
              <span className={styles.documentName}>
                {item.nome}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}