import Logo from "./Logo";

export default function LoginForm({ usuario, senha, setUsuario, setSenha, onSubmit, styles }) {
  return (
    <div className="styles.container">
        <div className={styles.loginHeader}>
            <Logo variant="com-slogan" width="500px" />
        </div>

        <div className={styles.loginContainer}>
            <h1 className={styles.loginTitle}>LOGIN</h1>

            <div className={styles.inputGroup}>
            <span className={styles.inputIcon}>👤</span>

            <input
                className={styles.loginInput}
                type="text"
                placeholder="CPF ou Usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />
            </div>

            <div className={styles.inputGroup}>
            <span className={styles.inputIcon}>🔒</span>

            <input
                className={styles.loginInput}
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            </div>

            <button className={styles.loginButton} onClick={onSubmit}>
            Entrar
            </button>
        </div>
    </div>
  );
}
