import TarefaModel from "../models/tarefa.model.js";

export const listarTarefas = async (req, res) => {
  const tarefas = await TarefaModel.listarTodas();
  res.json(tarefas);
};

export const criarTarefa = async (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ erro: "Título obrigatório" });
  }

  const nova = await TarefaModel.criarTarefa({ titulo });
  res.json(nova);
};

export const excluirTarefa = async (req, res) => {
  await TarefaModel.excluirTarefa(req.params.id);
  res.json({ mensagem: "Excluído" });
};