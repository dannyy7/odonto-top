import TratamentoModel from "../models/tratamento.model.js";

export const listarTratamentos = async (req, res) => {

  try {

    const { idPaciente } = req.params;

    const tratamentos =
      await TratamentoModel.listarPorPaciente(idPaciente);

    res.json(tratamentos);

  } catch (error) {
  console.log(error);

  res.status(500).json({
    erro: error.message
  });
}

};

export const criarTratamento = async (req, res) => {

  try {

    console.log("BODY RECEBIDO:");
    console.log(req.body);

    const tratamento =
      await TratamentoModel.criar(req.body);

    res.status(201).json(tratamento);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      erro: error.message
    });

  }

};

export const editarTratamento = async (req, res) => {

  try {

    const { id } = req.params;

    const tratamento =
      await TratamentoModel.editar(
        id,
        req.body
      );

    res.json(tratamento);

  } catch (error) {
  console.log(error);

  res.status(500).json({
    erro: error.message
  });

  }

};

export const excluirTratamento = async (req, res) => {

  try {

    const { id } = req.params;

    await TratamentoModel.excluir(id);

    res.json({
      mensagem: "Excluído"
    });

  } catch (error) {
  console.log(error);

  res.status(500).json({
    erro: error.message
  });

  }

};