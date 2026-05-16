import { useState } from "react";
import ModalAdicionarPessoa from "../components/ModalAdicionarPessoa";
import styles from "./Usuarios.module.css";
import casa from '../assets/icones/usuario/casa.png'
import logo from '../assets/logos/odonto-top-branco-fundo-transparente.png'

export default function Usuarios() {
  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <div className={styles.page}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.left}>
          <button
            className={styles.homeIcon}
            onClick={() => window.location.href = "/home"}
          >
            <img src={casa} alt="voltar" className={styles.casa} />
          </button>
          <h2 className={styles.titulo}>USUÁRIOS</h2>
        </div>

        <div>
          <img src={logo} alt="logo" className={styles.right}/>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className={styles.content}>
        
        {/* MENU LATERAL */}
        <div className={styles.sidebar}>

            <p className={styles.subtitulo}>Pacientes</p>
            <p className={styles.subtitulo}>Funcionários</p>


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