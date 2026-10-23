let proximoId = 1;
function criarTarefa(titulo, descricao = "", prioridade = "Média") {
  if (!titulo || !titulo.trim()) {
    throw new Error("O título da tarefa é obrigatório.");
  }

  return {
    id: proximoId++,
    titulo: titulo.trim(),
    descricao: descricao.trim(),
    prioridade,
    status: "A Fazer"
  };
}

function alterarStatus(tarefa, novoStatus) {
  const statusValidos = [
    "A Fazer",
    "Em Progresso",
    "Concluído"
  ];

  if (!statusValidos.includes(novoStatus)) {
    throw new Error("Status inválido.");
  }

  return {
    ...tarefa,
    status: novoStatus
  };
}

function filtrarTarefas(tarefas, status) {
  return tarefas.filter(
    tarefa => tarefa.status === status
  );
}

function excluirTarefa(tarefas, id) {
  return tarefas.filter(
    tarefa => tarefa.id !== id
  );
}

module.exports = {
  criarTarefa,
  alterarStatus,
  filtrarTarefas,
  excluirTarefa
};

