const Carro = require("../src/carro");

describe("carro", () => {
  test("deve criar carro com kilometragem inicial 0", () => {
    const marca = "Ford";
    const modelo = "Ka";
    const ano = 2020;

    const carro = new Carro(marca, modelo, ano);

    expect(carro.kilometragem).toBe(0);
  });

  test("deve somar kilometragem ao dirigir distancia positiva", () => {
    const carro = new Carro("Ford", "Ka", 2020);

    carro.dirigir(50);

    expect(carro.kilometragem).toBe(50);
  });

  test("nao deve alterar kilometragem ao dirigir distancia zero ou negativa", () => {
    const carro = new Carro("Ford", "Ka", 2020);

    carro.dirigir(0);
    carro.dirigir(-10);

    expect(carro.kilometragem).toBe(0);
  });

  test("deve retornar informacoes formatadas do carro", () => {
    const carro = new Carro("Ford", "Ka", 2020);
    carro.dirigir(12);

    const info = carro.obterInfo();

    expect(info).toBe("Ford Ka, Ano: 2020, Quilometragem: 12 km");
  });
});
