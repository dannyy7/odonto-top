import { useEffect, useState } from "react";
import { api } from "../services/api";
import styles from "./Home.module.css";
import Logo from "../components/Logo";
import perfilImg from '../assets/icones/login/perfil.png';
import usuarioazul from '../assets/icones/home/usuario-azul.png';
import clips from '../assets/icones/home/clips.png';
import cardiaco from '../assets/icones/home/cardiaco.png';
import calendario from '../assets/icones/home/calendario.png';
import ModalPerfil from "../components/ModalPerfil";
import logobranca from '../assets/logos/odonto-top-branco-fundo-transparente.png';


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
        <img src={logobranca} alt="OdontoTop" className={styles.logo} />
        <div 
          className={styles.userIcon} 
          onClick={() => setAbrirPerfil(true)}
        >
          <img src={perfilImg} alt="Usuário" />
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className={styles.grid}>
        
        <div className={styles.secao}>
          <div className={styles.card} onClick={() => window.location.href = "/usuarios"}>
            <div className={styles.cardTop}>
              <img src={usuarioazul} alt="Usuários" />
            </div>

            <div className={styles.cardBottom}>
              <h3>Usuários</h3>
              <p>Pacientes</p>
              <p>Funcionários</p>
            </div>
          </div>

          <div className={styles.card} onClick={() => window.location.href = "/usuarios"}>
            <div className={styles.cardTop}>
              <img src={calendario} alt="Usuários" />
            </div>

            <div className={styles.cardBottom}>
              <h3>Usuários</h3>
              <p>Pacientes</p>
              <p>Funcionários</p>
            </div>
          </div>

          <div className={styles.card} onClick={() => window.location.href = "/usuarios"}>
            <div className={styles.cardTop}>
              <img src={cardiaco} alt="Usuários" />
            </div>

            <div className={styles.cardBottom}>
              <h3>Usuários</h3>
              <p>Pacientes</p>
              <p>Funcionários</p>
            </div>
          </div>
        </div>
        <div className={styles.secao}>
          <div className={styles.card} onClick={() => window.location.href = "/usuarios"}>
            <div className={styles.cardTop}>
              <img src={clips} alt="Usuários" />
            </div>

            <div className={styles.cardBottom}>
              <h3>Usuários</h3>
              <p>Pacientes</p>
              <p>Funcionários</p>
            </div>
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