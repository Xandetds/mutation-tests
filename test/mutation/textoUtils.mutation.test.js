const TextoUtils = require('../../src/textoUtils');

let textoUtils;
beforeEach(() => { textoUtils = new TextoUtils() });

test("Inverte uma string", () => {
    expect(textoUtils.inverter("abc")).toStrictEqual("cba")
    expect(textoUtils.inverter("")).toStrictEqual("")
})

test("Identifica palavras que nao sao palindromos", () => {
    expect(textoUtils.ehPalindromo("abc")).toStrictEqual(false)
    expect(textoUtils.ehPalindromo("abca")).toStrictEqual(false)
})

test("Palindromo ignora caixa, espacos e pontuacao", () => {
    expect(textoUtils.ehPalindromo("Socorram-me, subi no onibus em Marrocos")).toStrictEqual(true)
    expect(textoUtils.ehPalindromo("A man, a plan, a canal: Panama")).toStrictEqual(true)
})

test("Palindromo considera digitos", () => {
    expect(textoUtils.ehPalindromo("12321")).toStrictEqual(true)
    expect(textoUtils.ehPalindromo("a1b")).toStrictEqual(false)
    expect(textoUtils.ehPalindromo("1a2")).toStrictEqual(false)
})

test("Capitaliza cada palavra do texto", () => {
    expect(textoUtils.capitalizar("joao DA silva")).toStrictEqual("Joao Da Silva")
})

test("Capitalizar preserva espacos duplicados e texto vazio", () => {
    expect(textoUtils.capitalizar("ola  mundo")).toStrictEqual("Ola  Mundo")
    expect(textoUtils.capitalizar("")).toStrictEqual("")
    expect(textoUtils.capitalizar("a")).toStrictEqual("A")
})

test("Conta ocorrencias de substring com mais de um caractere", () => {
    expect(textoUtils.contarOcorrencias("banana", "an")).toStrictEqual(2)
    expect(textoUtils.contarOcorrencias("banana", "x")).toStrictEqual(0)
})

test("Contar ocorrencias com substring vazia retorna zero", () => {
    expect(textoUtils.contarOcorrencias("banana", "")).toStrictEqual(0)
    expect(textoUtils.contarOcorrencias("banana", undefined)).toStrictEqual(0)
})

test("Remove espacos do inicio e do fim", () => {
    expect(textoUtils.removerEspacosExtras("   ola   mundo   ")).toStrictEqual("ola mundo")
})

test("Remove tabs e quebras de linha como espacos extras", () => {
    expect(textoUtils.removerEspacosExtras("a\t\n b")).toStrictEqual("a b")
})

test("Slug remove acentos e pontuacao", () => {
    expect(textoUtils.paraSlug("Olá Mundo!")).toStrictEqual("ola-mundo")
    expect(textoUtils.paraSlug("Ação Única")).toStrictEqual("acao-unica")
})

test("Slug converte para minusculas e mantem hifens e numeros", () => {
    expect(textoUtils.paraSlug("Top 10 - Melhores")).toStrictEqual("top-10---melhores")
})

test("Slug remove espacos nas pontas", () => {
    expect(textoUtils.paraSlug("  teste  ")).toStrictEqual("teste")
})

test("Trunca apenas quando o texto excede o tamanho", () => {
    expect(textoUtils.truncar("abcdef", 3)).toStrictEqual("abc...")
    expect(textoUtils.truncar("abc", 3)).toStrictEqual("abc")
    expect(textoUtils.truncar("ab", 3)).toStrictEqual("ab")
})

test("Truncar aceita tamanho zero mas rejeita negativo", () => {
    expect(textoUtils.truncar("abc", 0)).toStrictEqual("...")
    expect(textoUtils.truncar("", 0)).toStrictEqual("")
    expect(() => textoUtils.truncar("abc", -1)).toThrow("O tamanho não pode ser negativo")
})

test("Contar palavras ignora espacos extras e texto vazio", () => {
    expect(textoUtils.contarPalavras("  uma   frase  ")).toStrictEqual(2)
    expect(textoUtils.contarPalavras("")).toStrictEqual(0)
    expect(textoUtils.contarPalavras("   ")).toStrictEqual(0)
    expect(textoUtils.contarPalavras("sozinha")).toStrictEqual(1)
})

test("Somente letras aceita letras maiusculas, minusculas e acentuadas", () => {
    expect(textoUtils.somenteLetras("abc")).toStrictEqual(true)
    expect(textoUtils.somenteLetras("ABC")).toStrictEqual(true)
    expect(textoUtils.somenteLetras("ÀÉãçÿ")).toStrictEqual(true)
})

test("Somente letras rejeita numeros, espacos e texto vazio", () => {
    expect(textoUtils.somenteLetras("a1")).toStrictEqual(false)
    expect(textoUtils.somenteLetras("1a")).toStrictEqual(false)
    expect(textoUtils.somenteLetras("ab cd")).toStrictEqual(false)
    expect(textoUtils.somenteLetras("")).toStrictEqual(false)
})

test("Substitui apenas o alvo informado", () => {
    expect(textoUtils.substituirTudo("a-b-c", "-", "+")).toStrictEqual("a+b+c")
    expect(textoUtils.substituirTudo("abc", "x", "y")).toStrictEqual("abc")
})

test("Substituir tudo rejeita alvo indefinido", () => {
    expect(() => textoUtils.substituirTudo("abc", undefined, "x")).toThrow("O alvo não pode ser vazio")
})

test("Slug junta varios espacos seguidos em um unico hifen", () => {
    expect(textoUtils.paraSlug("a   b")).toStrictEqual("a-b")
})
