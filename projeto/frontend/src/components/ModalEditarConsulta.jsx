import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseCliente";
import styles from "./ModalCriarConsulta.module.css";

export default function ModalEditarConsulta({
    aberto,
    consulta,
    fechar
}) {

    const [procedimentos, setProcedimentos] = useState([]);
    const [procedimentoSelecionado, setProcedimentoSelecionado] = useState("");

    useEffect(() => {
        buscarProcedimentos();
    }, []);

    useEffect(() => {

        if (!consulta) return;

        setProcedimentoSelecionado(
            consulta.consultaProcedimento?.[0]?.idProcConsul ?? ""
        );

    }, [consulta]);

    async function buscarProcedimentos() {

        const { data, error } = await supabase
            .from("procedimento")
            .select("*");

        if (error) {
            console.log(error);
            return;
        }

        setProcedimentos(data);
    }

    if (!aberto || !consulta) return null;

    const data = new Date(consulta.dataHora);

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    const hora = String(data.getHours()).padStart(2, "0");
    const minuto = String(data.getMinutes()).padStart(2, "0");

    return (

        <div className={styles.overlay}>

            <div className={styles.modal}>

                <h2>Editar consulta</h2>

                <label>Paciente</label>

                <input
                    value={consulta.paciente.pessoa.nomePessoa}
                    readOnly
                />

                <label>Dentista</label>

                <input
                    value={consulta.funcionario.pessoa.nomePessoa}
                    readOnly
                />

                <label>Procedimento</label>

                <select
                    value={procedimentoSelecionado}
                    onChange={(e) => setProcedimentoSelecionado(e.target.value)}
                >

                    <option value="">
                        Selecione
                    </option>

                    {procedimentos.map((procedimento) => (

                        <option
                            key={procedimento.idProcedimento}
                            value={procedimento.idProcedimento}
                        >
                            {procedimento.nomeProcedimento}
                        </option>

                    ))}

                </select>

                <div className={styles.linha}>

                    <div className={styles.bloco}>

                        <label>Data</label>

                        <div className={styles.data}>

                            <div>

                                <span>Dia</span>

                                <select defaultValue={dia}>
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <option key={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div>

                                <span>Mês</span>

                                <select defaultValue={mes}>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div>

                                <span>Ano</span>

                                <select defaultValue={ano}>
                                    <option>2026</option>
                                    <option>2027</option>
                                </select>

                            </div>

                        </div>

                    </div>

                    <div className={styles.bloco}>

                        <label>Horário</label>

                        <div className={styles.hora}>

                            <div>

                                <span>Horas</span>

                                <select defaultValue={hora}>
                                    {Array.from({ length: 24 }, (_, i) => (
                                        <option key={i}>
                                            {String(i).padStart(2, "0")}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div>

                                <span>Minutos</span>

                                <select defaultValue={minuto}>
                                    <option>00</option>
                                    <option>15</option>
                                    <option>30</option>
                                    <option>45</option>
                                </select>

                            </div>

                        </div>

                    </div>

                </div>

                <div className={styles.botoes}>

                    <button
                        className={styles.cancelar}
                        onClick={fechar}
                    >
                        Cancelar
                    </button>

                    <button
                        className={styles.salvar}
                    >
                        Salvar
                    </button>

                </div>

            </div>

        </div>

    );

}