import { supabaseAdmin } from "../supabaseAdmin.js";

class TratamentoModel {

  static async listarPorPaciente(idPaciente) {

  console.log("ID PACIENTE:", idPaciente);
const { data, error } = await supabaseAdmin
  .from("tratamento")
  .select(`
    *,
    procedimento:idProcedimentoTratamento (
      idProcedimento,
      nomeProcedimento
    )
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


  // 1. Buscar a pessoa pelo userId
  const { data: pessoa, error: erroPessoa } = await supabaseAdmin
    .from("pessoa")
    .select("idPessoa")
    .eq("userId", userId)
    .single();

  console.log("PESSOA ENCONTRADA:");
  console.log(pessoa);

  console.log("ERRO PESSOA:");
  console.log(erroPessoa);

  if (erroPessoa) {
    throw erroPessoa;
  }


  // 2. Buscar o funcionário relacionado à pessoa
  const { data: funcionario, error: erroFuncionario } =
    await supabaseAdmin
      .from("funcionario")
      .select("idFuncionario")
      .eq("idPessoaFuncionario", pessoa.idPessoa)
      .single();

  console.log("FUNCIONARIO ENCONTRADO:");
  console.log(funcionario);

  console.log("ERRO FUNCIONARIO:");
  console.log(erroFuncionario);

  if (erroFuncionario) {
    throw erroFuncionario;
  }


  // 3. Criar o tratamento
  const { data: novoTratamento, error } = await supabaseAdmin
    .from("tratamento")
    .insert([
      {
        idPacienteTratamento,
        idProcedimentoTratamento,
        idFuncionarioTratamento: funcionario.idFuncionario,
        data,
        valor
      }
    ])
    .select()
    .single();

  console.log("NOVO TRATAMENTO:");
  console.log(novoTratamento);

  console.log("ERRO AO CRIAR:");
  console.log(error);

  if (error) {
    throw error;
  }

  return novoTratamento;
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