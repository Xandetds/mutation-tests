const ListaDeCompras = require("../src/lista");

describe("lista de compras", () => {
  test("deve adicionar item na lista", () => {
    const lista = new ListaDeCompras();

    lista.adicionarItem("arroz");

    expect(lista.obterItens()).toEqual(["arroz"]);
  });

  test("deve remover item existente da lista", () => {
    const lista = new ListaDeCompras();
    lista.adicionarItem("arroz");
    lista.adicionarItem("feijao");

    lista.removerItem("arroz");

    expect(lista.obterItens()).toEqual(["feijao"]);
  });

  test("deve lancar erro ao tentar remover item inexistente", () => {
    const lista = new ListaDeCompras();

    const acao = () => lista.removerItem("cafe");

    expect(acao).toThrow("Item não encontrado na lista");
  });
});
