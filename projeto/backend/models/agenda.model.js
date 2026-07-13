import { supabaseAdmin } from "../supabaseAdmin.js";

class AgendaModel {

  static async listarConsultas() {

    const { data, error } = await supabaseAdmin
      .from("consulta")
      .select(`
        idConsulta,
        dataHora,
        tipo,
        status,

        paciente:idPacienteConsulta (
          idPaciente,
          pessoa:idPessoaPaciente (
            nomePessoa
          )
        ),

        funcionario:idFuncionarioConsulta (
          idFuncionario,
          pessoa:idPessoaFuncionario (
            nomePessoa
          )
        ),

        consultaProcedimento!consultaProcedimento_idConsulProc_fkey (
          idConsulProc,
          idProcConsul
        )
      `)
      .order("dataHora");

    if (error) {
      throw error;
    }

    return data;
  }

}

export default AgendaModel;