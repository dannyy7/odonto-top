import styles from "./ModalPerfil.module.css";
import x from '../assets/icones/home/x.png';

export default function ModalPerfil({ usuario, onClose, onLogout }) {
  if (!usuario) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        
        <button className={styles.close} onClick={onClose}>
          <img src={x}/>
        </button>

        <h3  className={styles.nome}>{usuario.nome}</h3>

        <p>{usuario.cpf}</p>
        <p>{usuario.email}</p>
        <p>{usuario.telefone}</p>

        <button className={styles.logout} onClick={onLogout}>
          Sair
        </button>

      </div>
    </div>
  );
}