import { useState } from "react";
import ModalAdicionarPessoa from "../components/ModalAdicionarPessoa";
import styles from "./Usuarios.module.css";

export default function Usuarios() {
  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <div className={styles.page}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.left}>
          <span 
            className={styles.homeIcon}
            onClick={() => window.location.href = "/home"}
            style={{ cursor: "pointer" }}
            >
            🏠
            </span>
          <h2>USUÁRIOS</h2>
        </div>

        <div className={styles.right}>
          <span>🤍 Odonto Top</span>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className={styles.content}>
        
        {/* MENU LATERAL */}
        <div className={styles.sidebar}>
          <div>
            <p>Pacientes</p>
            <p>Funcionários</p>
          </div>

          <button 
            className={styles.addButton}
            onClick={() => setAbrirModal(true)}
          >
            +
          </button>
        </div>

        {/* ÁREA PRINCIPAL */}
        <div className={styles.main}>
        </div>

      </div>

      {/* MODAL */}
      {abrirModal && (
        <ModalAdicionarPessoa 
          onClose={() => setAbrirModal(false)} 
        />
      )}
    </div>
  );
}