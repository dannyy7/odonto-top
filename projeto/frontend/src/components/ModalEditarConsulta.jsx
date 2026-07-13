import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseCliente";
import styles from "./ModalCriarConsulta.module.css";

export default function ModalEditarConsulta({
    aberto,
    consulta,
    fechar,
    atualizarConsultas
}) {

    const [dia, setDia] = useState(1);
    const [mes, setMes] = useState(1);
    const [ano, setAno] = useState(2026);

    const [hora, setHora] = useState("00");
    const [minuto, setMinuto] = useState("00");

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

    const data = new Date(consulta.dataHora);

    setDia(data.getDate());
    setMes(data.getMonth() + 1);
    setAno(data.getFullYear());

    setHora(String(data.getHours()).padStart(2, "0"));
    setMinuto(String(data.getMinutes()).padStart(2, "0"));

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

    async function salvarEdicao() {

        const dataHora =
            `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")} ${hora}:${minuto}:00`;

        const { error } = await supabase
            .from("consulta")
            .update({
                dataHora: dataHora
            })
            .eq("idConsulta", consulta.idConsulta);

        if (error) {
            console.log(error);
            alert("Erro ao atualizar consulta.");
            return;
        }

        const { error: erroProcedimento } = await supabase
            .from("consultaProcedimento")
            .update({
                idProcConsul: procedimentoSelecionado
            })
            .eq("idConsulProc", consulta.idConsulta);

        if (erroProcedimento) {
            console.log(erroProcedimento);
            alert("Erro ao atualizar procedimento.");
            return;
        }

        alert("Consulta atualizada!");
        await atualizarConsultas();
        fechar();
    }

    console.log(consulta);


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

                                <select
                                    value={dia}
                                    onChange={(e) => setDia(e.target.value)}
                                >
                                    {Array.from({ length: 31 }, (_, i) => (
                                        <option key={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div>

                                <span>Mês</span>

                               <select
                                    value={mes}
                                    onChange={(e) => setMes(e.target.value)}
                                >
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div>

                                <span>Ano</span>

                              <select
                                value={ano}
                                onChange={(e) => setAno(e.target.value)}
                            >
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

                                <select
                                    value={hora}
                                    onChange={(e) => setHora(e.target.value)}
                                >
                                    {Array.from({ length: 24 }, (_, i) => (
                                        <option key={i}>
                                            {String(i).padStart(2, "0")}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div>

                                <span>Minutos</span>

                                <select
                                    value={minuto}
                                    onChange={(e) => setMinuto(e.target.value)}
                                >
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
                        onClick={salvarEdicao}
                    >
                        Salvar
                    </button>

                </div>

            </div>

        </div>

    );

}