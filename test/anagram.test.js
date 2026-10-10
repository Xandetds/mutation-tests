const { isAnagram } = require("../src/anagram");

describe("anagram", () => {
  test("deve retornar true para palavras anagramas ignorando maiusculas e pontuacao", () => {
    const primeira = "Dormitory";
    const segunda = "Dirty room!!";

    const resultado = isAnagram(primeira, segunda);

    expect(resultado).toBe(true);
  });

  test("deve retornar false para palavras que nao sao anagramas", () => {
    const primeira = "teste";
    const segunda = "toast";

    const resultado = isAnagram(primeira, segunda);

    expect(resultado).toBe(false);
  });
});
