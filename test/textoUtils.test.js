const TextoUtils = require('../src/textoUtils');
beforeEach(() => { textoUtils = new TextoUtils()});

test("Verifica se a palavra é um palindromo", () => {
    expect(textoUtils.ehPalindromo("arara")).toStrictEqual(true);
});

test("Verifica se inicia com maiuscula e o restante é minuscula", () => {
    expect(textoUtils.capitalizar("aLEXANDRE")).toStrictEqual("Alexandre")
})

test("Conta quantas vezes a letra aparece na palavra", () => {
    expect(textoUtils.contarOcorrencias("paralelepipedo", "p")).toStrictEqual(3)
})

test("Verifica se o texto está sem espaços", () => {
    expect(textoUtils.removerEspacosExtras("Senhoras     e      senhores")).toStrictEqual("Senhoras e senhores")
})


test("Verifica se a string é um slug", () => {
    expect(textoUtils.paraSlug("Boa tarde pessoal")).toStrictEqual("boa-tarde-pessoal")
})

test("Verifica se o tamanho do texto e negativo", () => {
    expect(() => textoUtils.truncar("", -2)).toThrow("O tamanho não pode ser negativo")
})

test("Conta as palavras do texto", () => {
    expect(textoUtils.contarPalavras("Alexandre Tibes da Silva")).toStrictEqual(4)
})

test("Testa se existem somente letras", () => {
    expect(textoUtils.somenteLetras("123a456b")).toStrictEqual(false)
})

test("Substitui todas as ocorrências de uma substring", () => {
    expect(textoUtils.substituirTudo("gato gato gato", "gato", "cachorro")).toStrictEqual("cachorro cachorro cachorro")
})

test("Verifica se lança erro quando o alvo é vazio", () => {
    expect(() => textoUtils.substituirTudo("gato gato gato", "", "cachorro")).toThrow("O alvo não pode ser vazio")
})



