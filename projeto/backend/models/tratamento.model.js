import { supabaseAdmin } from "../supabaseAdmin.js";

class TratamentoModel {

  static async listarPorPaciente(idPaciente) {

  console.log("ID PACIENTE:", idPaciente);

  const { data, error } = await supabaseAdmin
    .from("tratamento")
    .select(`
      *
    `)
    .eq("idPacienteTratamento", idPaciente);

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) throw error;

  return data;
}

 static async criar(tratamento) {

  console.log("DADOS RECEBIDOS:");
  console.log(tratamento);

  const {
  idPacienteTratamento,
  userId,
  idProcedimentoTratamento,
  data,
  valor
} = tratamento;

  console.log("ID PESSOA:", idPessoa);
  console.log("USER ID:", userId);



  console.log("PACIENTE:");
  console.log(paciente);
  console.log("ERRO PACIENTE:");
  console.log(erroPaciente);

  if (erroPaciente) throw erroPaciente;

  const {
    data: funcionario,
    error: erroFuncionario
  } = await supabaseAdmin
    .from("funcionario")
    .select("*");

  console.log("FUNCIONARIOS:");
  console.log(funcionario);
  console.log("ERRO FUNCIONARIO:");
  console.log(erroFuncionario);

  if (erroFuncionario) throw erroFuncionario;

  return [];
}

  static async excluir(id) {

    const { error } = await supabaseAdmin
      .from("tratamento")
      .delete()
      .eq("idTratamento", id);

    if (error) throw error;
  }
}

export default TratamentoModel;