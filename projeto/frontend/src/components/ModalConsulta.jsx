import styles from "./ModalConsulta.module.css";
import { useState } from "react";
import ModalEditarConsulta from "./ModalEditarConsulta";
import { supabase } from "../services/supabaseCliente";

export default function ModalConsulta({
    aberto,
    consulta,
    fechar
}) {

    const [modalEditar, setModalEditar] = useState(false);

    if (!aberto || !consulta) return null;

    async function cancelarConsulta() {

        const { data, error } = await supabase
            .from("consulta")
            .update({
                status: "Cancelada"
            })
            .eq("idConsulta", consulta.idConsulta)
            .select();

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
            alert(error.message);
            return;
        }

        alert("Consulta cancelada!");
        fechar();
    }

    async function concluirConsulta() {

        const { data, error } = await supabase
            .from("consulta")
            .update({
                status: "Concluída"
            })
            .eq("idConsulta", consulta.idConsulta)
            .select();

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
            alert(error.message);
            return;
        }

        alert("Consulta concluída!");
        fechar();
    }

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

                       <button
                            className={styles.cancelar}
                            onClick={cancelarConsulta}
                        >
                            Cancelar consulta
                        </button>

                        <button
                            className={styles.concluir}
                            onClick={concluirConsulta}
                        >
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