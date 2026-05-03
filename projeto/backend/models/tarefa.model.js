let listaTarefas = [
  { id: 1, titulo: "Tarefa inicial" }
];

let proximoId = 2;

class TarefaModel {
  static async listarTodas() {
    return listaTarefas;
  }

  static async criarTarefa(dadosTarefa) {
    const nova = {
      id: proximoId++,
      ...dadosTarefa
    };
    listaTarefas.push(nova);
    return nova;
  }

  static async excluirTarefa(id) {
    listaTarefas = listaTarefas.filter(t => t.id != id);
  }
}

export default TarefaModel;