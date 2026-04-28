
export default function LoginForm({ usuario, senha, setUsuario, setSenha, onSubmit, styles }) {
  return (
        <div className={styles.loginContainer}>
            <div className={styles.logincolumn}>
                <h1 className={styles.loginTitle}>LOGIN</h1>

                <div className={styles.inputgroup}>
                    <span className={styles.inputIcon}>👤</span>

                    <input
                        className={styles.loginInput}
                        type="text"
                        placeholder="CPF ou Usuário"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>

                <div className={styles.inputgroup}>
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
