const Utilitarios = require("../../src/utilitarios");

describe("utilitarios - regras de borda", () => {
  const util = new Utilitarios();

  test("ehNumero aceita apenas numeros reais", () => {
    expect(util.ehNumero(0)).toBe(true);
    expect(util.ehNumero(-3.5)).toBe(true);
    expect(util.ehNumero("5")).toBe(false);
    expect(util.ehNumero(null)).toBe(false);
    expect(util.ehNumero(undefined)).toBe(false);
    expect(util.ehNumero(NaN)).toBe(false);
  });

  test("ehPalindromo rejeita textos que nao sao palindromos", () => {
    expect(util.ehPalindromo("abc")).toBe(false);
    expect(util.ehPalindromo("abca")).toBe(false);
    expect(util.ehPalindromo("ab")).toBe(false);
  });

  test("ehPalindromo ignora pontuacao, underscore e caixa", () => {
    expect(util.ehPalindromo("ab_a")).toBe(true);
    expect(util.ehPalindromo("A man, a plan, a canal: Panama")).toBe(true);
    expect(util.ehPalindromo("")).toBe(true);
  });

  test("ehPalindromo considera digitos", () => {
    expect(util.ehPalindromo("12321")).toBe(true);
    expect(util.ehPalindromo("1231")).toBe(false);
  });

  test("ehPar identifica zero e negativos", () => {
    expect(util.ehPar(0)).toBe(true);
    expect(util.ehPar(-2)).toBe(true);
    expect(util.ehPar(-3)).toBe(false);
    expect(util.ehPar(7)).toBe(false);
  });

  test("dividir devolve resultado fracionario e rejeita apenas divisor zero", () => {
    expect(util.dividir(7, 2)).toBe(3.5);
    expect(util.dividir(0, 5)).toBe(0);
    expect(util.dividir(-9, 3)).toBe(-3);
    expect(() => util.dividir(0, 0)).toThrow("Divisão por zero");
  });

  test("operacoes aritmeticas com negativos e zero", () => {
    expect(util.somar(-2, 2)).toBe(0);
    expect(util.subtrair(3, 5)).toBe(-2);
    expect(util.multiplicar(-3, 4)).toBe(-12);
    expect(util.multiplicar(5, 0)).toBe(0);
  });

  test("gerarNumeroAleatorio usa o maximo informado e o padrao 100", () => {
    const random = jest.spyOn(Math, "random");

    random.mockReturnValue(0.5);
    expect(util.gerarNumeroAleatorio(10)).toBe(5);
    expect(util.gerarNumeroAleatorio()).toBe(50);

    random.mockReturnValue(0.999);
    expect(util.gerarNumeroAleatorio()).toBe(99);

    random.mockReturnValue(0);
    expect(util.gerarNumeroAleatorio(10)).toBe(0);

    random.mockRestore();
  });

  test("mediaArray calcula media de um e de varios elementos", () => {
    expect(util.mediaArray([5])).toBe(5);
    expect(util.mediaArray([1, 2])).toBe(1.5);
    expect(util.mediaArray([-2, 2])).toBe(0);
  });

  test("ordenar e inverter array nao alteram o array original", () => {
    const original = ["b", "c", "a"];

    expect(util.ordenarArray(original)).toEqual(["a", "b", "c"]);
    expect(util.inverterArray(original)).toEqual(["a", "c", "b"]);
    expect(original).toEqual(["b", "c", "a"]);
  });

  test("operacoes de string em casos de borda", () => {
    expect(util.primeiraLetraMaiuscula("")).toBe("");
    expect(util.primeiraLetraMaiuscula("aBC")).toBe("ABC");
    expect(util.repetirTexto("ha", 0)).toBe("");
    expect(util.removerEspacos("\t oi \n")).toBe("oi");
    expect(util.contarCaracteres("")).toBe(0);
    expect(util.inverterString("")).toBe("");
  });

  test("contarPalavras conta palavras separadas por qualquer espaco em branco", () => {
    expect(util.contarPalavras("um")).toBe(1);
    expect(util.contarPalavras("um\tdois\ntres")).toBe(3);
  });

  test("elementos de array vazio e removerDuplicados", () => {
    expect(util.primeiroElemento([])).toBeUndefined();
    expect(util.ultimoElemento([])).toBeUndefined();
    expect(util.ultimoElemento([1])).toBe(1);
    expect(util.tamanhoArray([])).toBe(0);
    expect(util.removerDuplicados([])).toEqual([]);
    expect(util.removerDuplicados(["a", "a", "b"])).toEqual(["a", "b"]);
  });

  test("juntarArray usa virgula por padrao e aceita array vazio", () => {
    expect(util.juntarArray([1, 2, 3])).toBe("1,2,3");
    expect(util.juntarArray([])).toBe("");
  });

  test("mesclarObjetos nao altera os objetos de entrada", () => {
    const a = { x: 1 };
    const b = { y: 2 };

    expect(util.mesclarObjetos(a, b)).toEqual({ x: 1, y: 2 });
    expect(a).toEqual({ x: 1 });
    expect(b).toEqual({ y: 2 });
  });
});
