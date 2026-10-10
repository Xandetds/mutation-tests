const DataUtils = require('../../src/dataUtils');

let dataUtils;
beforeEach(() => { dataUtils = new DataUtils() });

test("Testa anos bissextos e nao bissextos", () => {
    expect(dataUtils.ehBissexto(2024)).toStrictEqual(true)
    expect(dataUtils.ehBissexto(2000)).toStrictEqual(true)
    expect(dataUtils.ehBissexto(1900)).toStrictEqual(false)
    expect(dataUtils.ehBissexto(2100)).toStrictEqual(false)
    expect(dataUtils.ehBissexto(2023)).toStrictEqual(false)
})

test("Testa dias no mes em anos bissextos e limites de mes", () => {
    expect(dataUtils.diasNoMes(2, 2024)).toStrictEqual(29)
    expect(dataUtils.diasNoMes(2, 2026)).toStrictEqual(28)
    expect(dataUtils.diasNoMes(1, 2026)).toStrictEqual(31)
    expect(dataUtils.diasNoMes(12, 2026)).toStrictEqual(31)
    expect(() => dataUtils.diasNoMes(0, 2026)).toThrow("Mês inválido")
    expect(() => dataUtils.diasNoMes(13, 2026)).toThrow("Mês inválido")
})

test("Formata datas com dia e mes de dois digitos", () => {
    const data = new Date(2026, 11, 25)
    expect(dataUtils.formatarDataBR(data)).toStrictEqual("25/12/2026")
    expect(dataUtils.formatarDataISO(data)).toStrictEqual("2026-12-25")
})

test("Adicionar e subtrair dias nao altera a data original", () => {
    const data = new Date(2026, 0, 31)
    dataUtils.adicionarDias(data, 1)
    dataUtils.subtrairDias(data, 1)
    expect(data).toEqual(new Date(2026, 0, 31))
})

test("Adicionar dias atravessa virada de mes e ano", () => {
    expect(dataUtils.adicionarDias(new Date(2026, 11, 31), 1)).toEqual(new Date(2027, 0, 1))
    expect(dataUtils.adicionarDias(new Date(2026, 5, 10), 0)).toEqual(new Date(2026, 5, 10))
    expect(dataUtils.subtrairDias(new Date(2027, 0, 1), 1)).toEqual(new Date(2026, 11, 31))
})

test("Diferenca em dias e simetrica e zero para datas iguais", () => {
    const a = new Date(2026, 5, 1)
    const b = new Date(2026, 5, 10)
    expect(dataUtils.diferencaEmDias(b, a)).toStrictEqual(9)
    expect(dataUtils.diferencaEmDias(a, a)).toStrictEqual(0)
})

test("Diferenca em dias arredonda para o dia mais proximo", () => {
    const a = new Date(2026, 5, 1, 0, 0, 0)
    const b = new Date(2026, 5, 1, 13, 0, 0)
    const c = new Date(2026, 5, 1, 11, 0, 0)
    expect(dataUtils.diferencaEmDias(a, b)).toStrictEqual(1)
    expect(dataUtils.diferencaEmDias(a, c)).toStrictEqual(0)
})

test("Fim de semana: sabado e domingo sim, dias uteis nao", () => {
    expect(dataUtils.ehFimDeSemana(new Date(2026, 7, 29))).toStrictEqual(true)
    expect(dataUtils.ehFimDeSemana(new Date(2026, 7, 30))).toStrictEqual(true)
    expect(dataUtils.ehFimDeSemana(new Date(2026, 7, 28))).toStrictEqual(false)
    expect(dataUtils.ehFimDeSemana(new Date(2026, 7, 31))).toStrictEqual(false)
})

test("Proximo dia util de dia de semana, sexta e domingo", () => {
    expect(dataUtils.proximoDiaUtil(new Date(2026, 7, 26))).toEqual(new Date(2026, 7, 27))
    expect(dataUtils.proximoDiaUtil(new Date(2026, 7, 28))).toEqual(new Date(2026, 7, 31))
    expect(dataUtils.proximoDiaUtil(new Date(2026, 7, 30))).toEqual(new Date(2026, 7, 31))
})

test("Proximo dia util nao altera a data original", () => {
    const data = new Date(2026, 7, 28)
    dataUtils.proximoDiaUtil(data)
    expect(data).toEqual(new Date(2026, 7, 28))
})

test("Idade antes e no dia do aniversario", () => {
    const nascimento = new Date(2006, 5, 15)
    expect(dataUtils.calcularIdade(nascimento, new Date(2026, 5, 14))).toStrictEqual(19)
    expect(dataUtils.calcularIdade(nascimento, new Date(2026, 5, 15))).toStrictEqual(20)
    expect(dataUtils.calcularIdade(nascimento, new Date(2026, 5, 16))).toStrictEqual(20)
})

test("Idade considera o mes do aniversario", () => {
    const nascimento = new Date(2006, 5, 15)
    expect(dataUtils.calcularIdade(nascimento, new Date(2026, 4, 20))).toStrictEqual(19)
    expect(dataUtils.calcularIdade(nascimento, new Date(2026, 6, 1))).toStrictEqual(20)
})

test("Idade aceita nascimento igual a referencia", () => {
    const data = new Date(2026, 5, 15)
    expect(dataUtils.calcularIdade(data, data)).toStrictEqual(0)
})

test("Idade usa a data atual como referencia padrao", () => {
    const hoje = new Date()
    const nascimento = new Date(hoje.getFullYear() - 10, hoje.getMonth(), hoje.getDate())
    expect(dataUtils.calcularIdade(nascimento)).toStrictEqual(10)
})

test("Compara datas com milissegundos de diferenca", () => {
    const base = new Date(2026, 5, 1, 0, 0, 0, 0)
    const depois = new Date(2026, 5, 1, 0, 0, 0, 1)
    expect(dataUtils.compararDatas(base, depois)).toStrictEqual(-1)
    expect(dataUtils.compararDatas(depois, base)).toStrictEqual(1)
    expect(dataUtils.compararDatas(base, new Date(base))).toStrictEqual(0)
})

test("Valida datas em formatos diferentes", () => {
    expect(dataUtils.ehDataValida("2026-08-31")).toStrictEqual(true)
    expect(dataUtils.ehDataValida(0)).toStrictEqual(true)
    expect(dataUtils.ehDataValida(new Date("invalida"))).toStrictEqual(false)
    expect(dataUtils.ehDataValida(undefined)).toStrictEqual(false)
})

test("Retorna o nome de todos os dias da semana", () => {
    const esperado = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
    esperado.forEach((nome, i) => {
        expect(dataUtils.obterDiaDaSemana(new Date(2026, 7, 30 + i))).toStrictEqual(nome)
    })
})

test("Retorna o nome de todos os meses e valida limites", () => {
    const esperado = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    esperado.forEach((nome, i) => {
        expect(dataUtils.obterNomeDoMes(i + 1)).toStrictEqual(nome)
    })
    expect(() => dataUtils.obterNomeDoMes(0)).toThrow("Mês inválido")
    expect(() => dataUtils.obterNomeDoMes(13)).toThrow("Mês inválido")
})

test("Inicio e fim do mes em fevereiro bissexto e em dezembro", () => {
    expect(dataUtils.inicioDoMes(new Date(2026, 11, 15))).toEqual(new Date(2026, 11, 1))
    expect(dataUtils.fimDoMes(new Date(2024, 1, 10))).toEqual(new Date(2024, 1, 29))
    expect(dataUtils.fimDoMes(new Date(2026, 11, 1))).toEqual(new Date(2026, 11, 31))
})

test("Entre datas e inclusivo nos limites", () => {
    const inicio = new Date(2026, 2, 4)
    const fim = new Date(2026, 7, 12)
    expect(dataUtils.estaEntreDatas(new Date(inicio), inicio, fim)).toStrictEqual(true)
    expect(dataUtils.estaEntreDatas(new Date(fim), inicio, fim)).toStrictEqual(true)
    expect(dataUtils.estaEntreDatas(new Date(2026, 2, 3), inicio, fim)).toStrictEqual(false)
    expect(dataUtils.estaEntreDatas(new Date(2026, 7, 13), inicio, fim)).toStrictEqual(false)
})

test("Trimestre do ano para todos os meses", () => {
    const esperado = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4]
    esperado.forEach((trimestre, mes) => {
        expect(dataUtils.trimestreDoAno(new Date(2026, mes, 15))).toStrictEqual(trimestre)
    })
})
