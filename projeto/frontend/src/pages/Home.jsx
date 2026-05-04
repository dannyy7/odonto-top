import { useEffect, useState } from "react";
import { api } from "../services/api";
import styles from "./Home.module.css";
import Logo from "../components/Logo";
import perfilImg from '../assets/icones/login/perfil.png';
import ModalPerfil from "../components/ModalPerfil";


export default function Home() {
  const [abrirPerfil, setAbrirPerfil] = useState(false);
  const [usuario, setUsuario] = useState({
    nome: "Manu Metaforando",
    cpf: "086.155.449-30",
    email: "debrito.emanu@gmail.com",
    telefone: "(44) 9 9804-3457"
  });

  //useEffect(() => {
    //api.usuario()
      //.then(res => res.json())
      //.then(setUsuario);
  //}, []);

  const sair = async () => {
    await api.logout();
    window.location.href = "/";
  };

  return (
    <div className={styles.homePage}>
      
      {/* HEADER */}
      <div className={styles.header}>
        <Logo variant="simples-branco" width="160px" background={false} />

        <div 
          className={styles.userIcon} 
          onClick={() => setAbrirPerfil(true)}
        >
          <img src={perfilImg} alt="Usuário" />
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className={styles.grid}>
        
        <div className={styles.card} onClick={() => window.location.href = "/usuarios"}>
          <div className={styles.cardTop}>
            <img src={perfilImg} alt="Usuários" />
          </div>

          <div className={styles.cardBottom}>
            <h3>Usuários</h3>
            <p>Pacientes</p>
            <p>Funcionários</p>
          </div>
        </div>

      </div>

      {/* MODAL PERFIL */}
      {abrirPerfil && (
        <ModalPerfil 
          usuario={usuario}
          onClose={() => setAbrirPerfil(false)}
          onLogout={sair}
        />
      )}
    </div>
  );
}