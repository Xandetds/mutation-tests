const { obterCnh } = require("../src/cnh");

describe("cnh", () => {
  test("deve retornar true para idade igual ou maior que 18", () => {
    const idade = 18;

    const resultado = obterCnh(idade);

    expect(resultado).toBe(true);
  });

  test("deve retornar false para idade menor que 18", () => {
    const idade = 17;

    const resultado = obterCnh(idade);

    expect(resultado).toBe(false);
  });
});
