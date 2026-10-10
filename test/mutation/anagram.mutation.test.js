const { isAnagram } = require("../../src/anagram");

describe("anagram - regras de borda", () => {
  test("reconhece anagramas simples independentemente da ordem e da caixa", () => {
    expect(isAnagram("listen", "silent")).toBe(true);
    expect(isAnagram("ABC", "cab")).toBe(true);
  });

  test("ignora espacos e pontuacao e considera digitos", () => {
    expect(isAnagram("a b", "ab")).toBe(true);
    expect(isAnagram("123", "321")).toBe(true);
    expect(isAnagram("a1", "a2")).toBe(false);
  });

  test("rejeita textos com as mesmas letras em quantidades diferentes", () => {
    expect(isAnagram("aab", "abb")).toBe(false);
    expect(isAnagram("abc", "abcc")).toBe(false);
    expect(isAnagram("abc", "abd")).toBe(false);
  });

  test("underscore faz parte do texto comparado", () => {
    expect(isAnagram("a_b", "ab")).toBe(false);
    expect(isAnagram("a_b", "b_a")).toBe(true);
  });

  test("textos vazios ou so com pontuacao sao anagramas entre si", () => {
    expect(isAnagram("", "!!!")).toBe(true);
    expect(isAnagram("", "a")).toBe(false);
  });
});
