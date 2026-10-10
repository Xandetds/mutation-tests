class DataUtils {
  ehBissexto(ano) {
    return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
  }

  diasNoMes(mes, ano) {
    if (mes < 1 || mes > 12) {
      throw new Error("Mês inválido");
    }
    return new Date(ano, mes, 0).getDate();
  }

  formatarDataBR(data) {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  formatarDataISO(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  }

  adicionarDias(data, dias) {
    const resultado = new Date(data);
    resultado.setDate(resultado.getDate() + dias);
    return resultado;
  }

  subtrairDias(data, dias) {
    return this.adicionarDias(data, -dias);
  }

  diferencaEmDias(dataInicio, dataFim) {
    const umDia = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs(dataFim - dataInicio) / umDia);
  }

  ehFimDeSemana(data) {
    const diaDaSemana = data.getDay();
    return diaDaSemana === 0 || diaDaSemana === 6;
  }

  proximoDiaUtil(data) {
    const resultado = new Date(data);
    resultado.setDate(resultado.getDate() + 1);
    while (this.ehFimDeSemana(resultado)) {
      resultado.setDate(resultado.getDate() + 1);
    }
    return resultado;
  }

  calcularIdade(dataNascimento, dataReferencia = new Date()) {
    if (dataNascimento > dataReferencia) {
      throw new Error("A data de nascimento não pode ser no futuro");
    }
    let idade = dataReferencia.getFullYear() - dataNascimento.getFullYear();
    const mes = dataReferencia.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && dataReferencia.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  dataParaTimestamp(data) {
    return data.getTime();
  }

  timestampParaData(timestamp) {
    return new Date(timestamp);
  }

  compararDatas(data1, data2) {
    const tempo1 = data1.getTime();
    const tempo2 = data2.getTime();
    if (tempo1 < tempo2) return -1;
    if (tempo1 > tempo2) return 1;
    return 0;
  }

  ehDataValida(valor) {
    const data = new Date(valor);
    return !isNaN(data.getTime());
  }

  obterDiaDaSemana(data) {
    const dias = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    return dias[data.getDay()];
  }

  obterNomeDoMes(mes) {
    if (mes < 1 || mes > 12) {
      throw new Error("Mês inválido");
    }
    const nomes = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return nomes[mes - 1];
  }

  inicioDoMes(data) {
    return new Date(data.getFullYear(), data.getMonth(), 1);
  }

  fimDoMes(data) {
    return new Date(data.getFullYear(), data.getMonth() + 1, 0);
  }

  estaEntreDatas(data, inicio, fim) {
    return data.getTime() >= inicio.getTime() && data.getTime() <= fim.getTime();
  }

  trimestreDoAno(data) {
    return Math.floor(data.getMonth() / 3) + 1;
  }
}

module.exports = DataUtils;
