import styles from './Logo.module.css';
import logoSimples from '../assets/logos/logo-simples.png';
import logoComSlogan from '../assets/logos/logo-com-slogan.png';
import logoSimplesBranco from '../assets/logos/logo-simples-branco.png';
import logoComSloganBranco from '../assets/logos/logo-com-slogan-branco.png';

export default function Logo({ variant = 'simples', width = '300px', background = true }) {
  const logos = {
    simples: logoSimples,
    'com-slogan': logoComSlogan,
    'simples-branco': logoSimplesBranco,
    'com-slogan-branco': logoComSloganBranco,
  };

  const logoSrc = logos[variant] || logoSimples;

  return (
    <div
      className={styles.logo}
      style={{ backgroundColor: background ? "#fff" : "transparent" }}
    >
      <img src={logoSrc} alt="Odonto Top" style={{ width }} />
    </div>
  );
}