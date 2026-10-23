
const {
  criarTarefa,
  alterarStatus,
  filtrarTarefas,
  excluirTarefa,
  buscarTarefas
} = require("../src/app");

describe("Gerenciador de tarefas", () => {
  test("deve criar uma tarefa corretamente", () => {
    const tarefa = criarTarefa(
      "Conferir pedidos",
      "Verificar pedidos recebidos",
      "Alta"
    );

    expect(tarefa.titulo).toBe("Conferir pedidos");
    expect(tarefa.descricao).toBe("Verificar pedidos recebidos");
    expect(tarefa.prioridade).toBe("Alta");
    expect(tarefa.status).toBe("A Fazer");
  });

  test("não deve criar tarefa sem título", () => {
    expect(() => criarTarefa("")).toThrow(
      "O título da tarefa é obrigatório."
    );
  });

  test("deve alterar o status da tarefa", () => {
    const tarefa = criarTarefa("Separar produtos");

    const atualizada = alterarStatus(
      tarefa,
      "Em Progresso"
    );

    expect(atualizada.status).toBe("Em Progresso");
  });

  test("deve rejeitar status inválido", () => {
    const tarefa = criarTarefa("Separar produtos");

    expect(() => alterarStatus(tarefa, "Cancelada"))
      .toThrow("Status inválido.");
  });

  test("deve filtrar tarefas pelo status", () => {
    const tarefas = [
      criarTarefa("Pedido 1"),
      criarTarefa("Pedido 2")
    ];

    tarefas[1] = alterarStatus(
      tarefas[1],
      "Concluído"
    );

    const resultado = filtrarTarefas(
      tarefas,
      "Concluído"
    );

    expect(resultado).toHaveLength(1);
    expect(resultado[0].titulo).toBe("Pedido 2");
  });

  test("deve excluir uma tarefa", () => {
    const tarefa1 = criarTarefa("Pedido 1");
    const tarefa2 = criarTarefa("Pedido 2");

    const resultado = excluirTarefa(
      [tarefa1, tarefa2],
      tarefa1.id
    );

    expect(resultado).toHaveLength(1);
    expect(resultado[0].titulo).toBe("Pedido 2");
  });

  test("deve buscar tarefas pelo título", () => {
    const tarefas = [
      criarTarefa("Conferir pedidos"),
      criarTarefa("Separar produtos"),
      criarTarefa("Entregar encomendas")
    ];

    const resultado = buscarTarefas(
      tarefas,
      "PEDIDOS"
    );

    expect(resultado).toHaveLength(1);
    expect(resultado[0].titulo).toBe("Conferir pedidos");
  });

  test("deve retornar todas as tarefas quando a busca estiver vazia", () => {
    const tarefas = [
      criarTarefa("Pedido 1"),
      criarTarefa("Pedido 2")
    ];

    const resultado = buscarTarefas(tarefas, "");

    expect(resultado).toHaveLength(2);
  });
});
