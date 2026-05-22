import { useEffect, useState } from "react";
import { buscarPerfilLogado } from "../services/authService"; // ✅ importa a nova função
import styles from "./Home.module.css";
import Logo from "../components/Logo";
import perfilImg from '../assets/icones/login/perfil.png';
import usuarioazul from '../assets/icones/home/usuario-azul.png';
import clips from '../assets/icones/home/clips.png';
import cardiaco from '../assets/icones/home/cardiaco.png';
import calendario from '../assets/icones/home/calendario.png';
import ModalPerfil from "../components/ModalPerfil";
import logobranca from '../assets/logos/odonto-top-branco-fundo-transparente.png';
import { supabase } from "../services/supabaseCliente";

export default function Home() {
  const [abrirPerfil, setAbrirPerfil] = useState(false);
  const [usuario, setUsuario] = useState(null); // ✅ começa vazio, sem dados fixos

  // ✅ Busca os dados reais do usuário logado ao carregar a página
  useEffect(() => {
    buscarPerfilLogado().then(perfil => {
      if (perfil) setUsuario(perfil);
    });
  }, []);

  const sair = async () => {
    await supabase.auth.signOut();
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
              <img src={calendario} alt="Agenda" />
            </div>
            <div className={styles.cardBottom}>
              <h3>Agenda</h3>
              <p>Estado</p>
            </div>
          </div>

          <div className={styles.card} onClick={() => window.location.href = "/usuarios"}>
            <div className={styles.cardTop}>
              <img src={cardiaco} alt="Tratamentos" />
            </div>
            <div className={styles.cardBottom}>
              <h3>Tratamentos</h3>
              <p>Fichas de atendimentos</p>
            </div>
          </div>
        </div>

        <div className={styles.secao}>
          <div className={styles.card} onClick={() => window.location.href = "/usuarios"}>
            <div className={styles.cardTop}>
              <img src={clips} alt="Documentos" />
            </div>
            <div className={styles.cardBottom}>
              <h3>Modelos de Documentos</h3>
              <p>Modelos de Doc</p>
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