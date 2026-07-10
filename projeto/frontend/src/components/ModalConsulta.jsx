import styles from "./ModalConsulta.module.css";
import { useState } from "react";
import ModalEditarConsulta from "./ModalEditarConsulta";

export default function ModalConsulta({
    aberto,
    consulta,
    fechar
}) {

    const [modalEditar, setModalEditar] = useState(false);

    if (!aberto || !consulta) return null;

    return (
        <>
            <div className={styles.overlay}>

                <div className={styles.modal}>

                    <button
                        className={styles.botaoFechar}
                        onClick={fechar}
                    >
                        ×
                    </button>

                    <h2>
                        {new Date(consulta.dataHora).toLocaleDateString("pt-BR")}
                        {" - "}
                        {consulta.funcionario.pessoa.nomePessoa}
                        {" ("}
                        {consulta.paciente.pessoa.nomePessoa}
                        {")"}
                    </h2>

                    <label>Forma de pagamento</label>

                    <select>
                        <option></option>
                        <option>Dinheiro</option>
                        <option>Pix</option>
                        <option>Cartão</option>
                    </select>

                    <button
                        className={styles.editar}
                        onClick={() => setModalEditar(true)}
                    >
                        Editar consulta
                    </button>

                    <div className={styles.botoes}>

                        <button className={styles.cancelar}>
                            Cancelar consulta
                        </button>

                        <button className={styles.concluir}>
                            Marcar consulta como concluída
                        </button>

                    </div>

                </div>

            </div>

            <ModalEditarConsulta
                aberto={modalEditar}
                consulta={consulta}
                fechar={() => setModalEditar(false)}
            />
        </>
    );
}