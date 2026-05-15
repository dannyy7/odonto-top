import simplesStyles from './LogoSimples.module.css';
import homeStyles from './LogoHome.module.css';

import logoSimples from '../assets/logos/logo-simples.png';
import logoComSlogan from '../assets/logos/logo-com-slogan.png';
import logoSimplesBranco from '../assets/logos/logo-simples-branco.png';
import logoComSloganBranco from '../assets/logos/logo-com-slogan-branco.png';
import logobranca from '../assets/logos/odonto-top-branco-fundo-transparente.png';

export default function Logo({
  variant = 'simples',
  width = '300px',
  background = true
}) {

  const logos = {
    simples: {
      src: logoSimples,
      styles: {
        logo: simplesStyles.logoSimples
      }
    },

    home: {
      src: logobranca,
      styles: {
        logo: homeStyles.logoHome
      }
    },

    'com-slogan': {
      src: logoComSlogan,
      styles: {
        logo: homeStyles.logoHome
      }
    },

    'simples-branco': {
      src: logoSimplesBranco,
      styles: {
        logo: simplesStyles.logoSimples
      }
    },

    'com-slogan-branco': {
      src: logoComSloganBranco,
      styles: {
        logo: homeStyles.logoHome
      }
    },
  };

  const selectedLogo = logos[variant] || logos.simples;

  return (
    <div
      className={selectedLogo.styles.logo}
      style={{
        backgroundColor: background ? '#fff' : 'transparent'
      }}
    >
      <img
        src={selectedLogo.src}
        alt="Odonto Top"
        style={{ width }}
      />
    </div>
  );
}