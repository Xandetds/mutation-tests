const DataUtils = require('../src/dataUtils');
beforeEach(() => { dataUtils = new DataUtils()});


test("Verifica se o ano é bissexto", () => {
    expect(dataUtils.ehBissexto(2026)).toStrictEqual(false);
});


test("Testa quantidade de dias no mes", () => {
    expect(dataUtils.diasNoMes(4, 2026)).toStrictEqual(30)
    expect(() => dataUtils.diasNoMes(13, 2026)).toThrow("Mês inválido")
})

test("testa formatação de data para estilo BR", () => {
    const data = new Date(2006, 5, 1)
    expect(dataUtils.formatarDataBR(data)).toStrictEqual("01/06/2006")
})


test("testa formatação de data para estilo ISO", () => {
    const data = new Date(2006, 5, 1)
    expect(dataUtils.formatarDataISO(data)).toStrictEqual("2006-06-01")
})


test("Testa soma de dias a uma data", () => {
    const data = new Date(2006, 5, 1)
    const dataResultado = new Date (2006, 5, 6)
    expect(dataUtils.adicionarDias(data, 5)).toEqual(dataResultado)
})


test("Testa subtração de dias a uma data", () => {
    const data = new Date(2006, 5, 1)
    const dataResultado = new Date (2006, 4, 27)
    expect(dataUtils.subtrairDias(data, 5)).toEqual(dataResultado)
})


test("testa diferenca em dias entre datas", () => {
    const dataInicio = new Date (2006, 5, 1)
    const dataFim = new Date (2006, 5, 10)
    expect(dataUtils.diferencaEmDias(dataInicio, dataFim)).toStrictEqual(9)

})


test("Testa se um dia foi final de semana", () => {
    const fimDeSemana = new Date(2026, 7, 30)
    expect(dataUtils.ehFimDeSemana(fimDeSemana)).toStrictEqual(true)
})


test("testa funcao de proximo dia util", () => {
    const dataSabado = new Date(2026, 7, 29)
    const dataSegunda = new Date(2026, 7, 31)
    expect(dataUtils.proximoDiaUtil(dataSabado)).toEqual(dataSegunda)
})

test("Testa calculo de idade por data", () => {
    const dataNascimento = new Date(2006, 5, 1)
    const dataAtual = new Date(2026, 7, 31)
    expect(dataUtils.calcularIdade(dataNascimento, dataAtual)).toStrictEqual(20)
    expect(() => dataUtils.calcularIdade(dataAtual, dataNascimento)).toThrow("data de nascimento não pode ser no futuro")

})


test("Converter data para timestamp", () => {
    const data = new Date(2006, 5, 1)
    expect(dataUtils.dataParaTimestamp(data)).toEqual(data.getTime())
})

test("Converter timestamp para data", () => {
    const data = new Date(2006, 5, 1)
    const timeStamp = data.getTime()
    expect(dataUtils.timestampParaData(timeStamp)).toEqual(data)
})


test("testa comparador de datas", () => {
    const data1 = new Date(2026, 7, 31)
    const data2 = new Date(2026, 7, 30)
    expect(dataUtils.compararDatas(data2, data1)).toStrictEqual(-1)
    expect(dataUtils.compararDatas(data1, data2)).toStrictEqual(1)
    expect(dataUtils.compararDatas(data1, data1)).toStrictEqual(0)

})



test("testa se e uma data valida", () => {
    const dataInvalida = "nao e um numero"
    const dataValida = new Date(2026, 7, 31)
    expect(dataUtils.ehDataValida(dataInvalida)).toStrictEqual(false)
    expect(dataUtils.ehDataValida(dataValida)).toStrictEqual(true)

})


test("Testa retorno de dia da semana", () => {
    const data = new Date(2026, 7, 30)
    expect(dataUtils.obterDiaDaSemana(data)).toStrictEqual("Domingo")

})

test("testa retorno de nome do mes da data", () => {
    expect(dataUtils.obterNomeDoMes(6)).toStrictEqual("Junho")
    expect(() => dataUtils.obterNomeDoMes(14)).toThrow("Mês inválido")

})

test("testa retorno do primeiro dia do mes da data informada", () => {
    const data = new Date(2026, 7, 31)
    const dataInicioDoMes = new Date(2026, 7, 1)
    expect(dataUtils.inicioDoMes(data)).toEqual(dataInicioDoMes)
})


test("testa retorno do ulitmo dia do mes da data informada", () => {
    const data = new Date(2026, 7, 1)
    const dataFinalDoMes = new Date(2026, 7, 31)
    expect(dataUtils.fimDoMes(data)).toEqual(dataFinalDoMes)
})

test("testa se a data esta entre as datas", () => {
    const dataInicio = new Date(2026, 2, 4)
    const dataFim = new Date(2026, 7, 12)
    const dataMeio = new Date(2026, 5, 1)
    const dataFora = new Date(2025, 1, 1)
    expect(dataUtils.estaEntreDatas(dataMeio, dataInicio, dataFim)).toStrictEqual(true)
    expect(dataUtils.estaEntreDatas(dataFora, dataInicio, dataFim)).toStrictEqual(false)
})


test("Testa retorno do trimestre da data", () => {
    const dataPrimeiroTrimestre = new Date(2026, 1, 22)
    expect(dataUtils.trimestreDoAno(dataPrimeiroTrimestre)).toStrictEqual(1)
})