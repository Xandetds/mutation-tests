const ContaBancaria = require("../../src/contaBancaria");

const criarContaBase = () => ({
  id: "1",
  titular: "Maria",
  saldo: 100,
  limite: 50,
  status: "ativa",
  atualizadaEm: new Date("2024-01-01T00:00:00.000Z"),
});

describe("conta bancaria - regras de borda", () => {
  test("deposito rejeita valor negativo sem alterar saldo e aceita o menor valor positivo", () => {
    const dados = criarContaBase();
    const conta = new ContaBancaria(dados);

    expect(conta.depositar(-1)).toBe(false);
    expect(conta.obterSaldo()).toBe(100);
    expect(conta.depositar(1)).toBe(true);
    expect(conta.obterSaldo()).toBe(101);
  });

  test("deposito atualiza a data da conta apenas quando efetivado", () => {
    const dados = criarContaBase();
    const original = dados.atualizadaEm;
    const conta = new ContaBancaria(dados);

    conta.depositar(0);
    expect(dados.atualizadaEm).toBe(original);

    conta.depositar(10);
    expect(dados.atualizadaEm.getTime()).toBeGreaterThan(original.getTime());
  });

  test("saque aceita exatamente o saldo disponivel e rejeita um centavo acima", () => {
    const conta = new ContaBancaria(criarContaBase());

    expect(conta.sacar(150.01)).toBe(false);
    expect(conta.obterSaldo()).toBe(100);
    expect(conta.sacar(150)).toBe(true);
    expect(conta.obterSaldo()).toBe(-50);
  });

  test("saque rejeita valor negativo sem alterar saldo nem data", () => {
    const dados = criarContaBase();
    const original = dados.atualizadaEm;
    const conta = new ContaBancaria(dados);

    expect(conta.sacar(-5)).toBe(false);
    expect(conta.sacar(0)).toBe(false);
    expect(dados.saldo).toBe(100);
    expect(dados.atualizadaEm).toBe(original);
  });

  test("saque efetivado atualiza a data da conta", () => {
    const dados = criarContaBase();
    const original = dados.atualizadaEm;
    const conta = new ContaBancaria(dados);

    conta.sacar(10);

    expect(dados.atualizadaEm.getTime()).toBeGreaterThan(original.getTime());
  });

  test("alterar titular rejeita valores vazios e preserva o titular atual", () => {
    const conta = new ContaBancaria(criarContaBase());

    expect(conta.alterarTitular(undefined)).toBe(false);
    expect(conta.alterarTitular(null)).toBe(false);
    expect(conta.alterarTitular("")).toBe(false);
    expect(conta.obterTitular()).toBe("Maria");
  });

  test("bloquear e ativar conta alteram o status e o estaAtiva", () => {
    const conta = new ContaBancaria(criarContaBase());

    conta.bloquearConta();
    expect(conta.obterStatus()).toBe("bloqueada");
    expect(conta.estaAtiva()).toBe(false);

    conta.ativarConta();
    expect(conta.obterStatus()).toBe("ativa");
    expect(conta.estaAtiva()).toBe(true);
  });

  test("encerrar conta e rejeitado com saldo negativo ou positivo e mantem o status", () => {
    const negativa = new ContaBancaria({ ...criarContaBase(), saldo: -10 });
    const positiva = new ContaBancaria(criarContaBase());

    expect(negativa.encerrarConta()).toBe(false);
    expect(positiva.encerrarConta()).toBe(false);
    expect(negativa.obterStatus()).toBe("ativa");
    expect(positiva.obterStatus()).toBe("ativa");
  });

  test("podeSacar respeita limites inferior e superior", () => {
    const conta = new ContaBancaria(criarContaBase());

    expect(conta.podeSacar(0)).toBe(false);
    expect(conta.podeSacar(-10)).toBe(false);
    expect(conta.podeSacar(1)).toBe(true);
    expect(conta.podeSacar(150)).toBe(true);
    expect(conta.podeSacar(151)).toBe(false);
  });

  test("tarifa rejeita valor negativo e desconta o valor do saldo", () => {
    const conta = new ContaBancaria(criarContaBase());

    expect(conta.aplicarTarifa(-3)).toBe(false);
    expect(conta.obterSaldo()).toBe(100);
    expect(conta.aplicarTarifa(30)).toBe(true);
    expect(conta.obterSaldo()).toBe(70);
  });

  test("ajustar limite aceita zero, rejeita negativo e preserva o limite anterior", () => {
    const conta = new ContaBancaria(criarContaBase());

    expect(conta.ajustarLimite(-1)).toBe(false);
    expect(conta.obterLimite()).toBe(50);
    expect(conta.ajustarLimite(0)).toBe(true);
    expect(conta.obterLimite()).toBe(0);
  });

  test("saldoNegativo so e verdadeiro para saldo abaixo de zero", () => {
    expect(new ContaBancaria({ ...criarContaBase(), saldo: -1 }).saldoNegativo()).toBe(true);
    expect(new ContaBancaria({ ...criarContaBase(), saldo: 0 }).saldoNegativo()).toBe(false);
    expect(new ContaBancaria({ ...criarContaBase(), saldo: 1 }).saldoNegativo()).toBe(false);
  });

  test("transferir movimenta o dinheiro entre duas contas reais", () => {
    const origem = new ContaBancaria(criarContaBase());
    const destino = new ContaBancaria({ ...criarContaBase(), id: "2", titular: "Joao", saldo: 10 });

    expect(origem.transferir(150, destino)).toBe(true);
    expect(origem.obterSaldo()).toBe(-50);
    expect(destino.obterSaldo()).toBe(160);
  });

  test("transferir rejeita valor invalido e nao movimenta nenhuma conta", () => {
    const origem = new ContaBancaria(criarContaBase());
    const destino = new ContaBancaria({ ...criarContaBase(), id: "2", saldo: 10 });

    expect(origem.transferir(0, destino)).toBe(false);
    expect(origem.transferir(-5, destino)).toBe(false);
    expect(origem.transferir(151, destino)).toBe(false);
    expect(origem.obterSaldo()).toBe(100);
    expect(destino.obterSaldo()).toBe(10);
  });

  test("saldo disponivel soma saldo e limite, inclusive com saldo negativo", () => {
    const conta = new ContaBancaria({ ...criarContaBase(), saldo: -20 });

    expect(conta.calcularSaldoDisponivel()).toBe(30);
  });

  test("validarConta rejeita cada dado obrigatorio ausente ou invalido", () => {
    const validar = (alteracoes) => new ContaBancaria({ ...criarContaBase(), ...alteracoes }).validarConta();

    expect(validar({ id: undefined })).toBe(false);
    expect(validar({ titular: "" })).toBe(false);
    expect(validar({ titular: undefined })).toBe(false);
    expect(validar({ saldo: "100" })).toBe(false);
    expect(validar({ saldo: undefined })).toBe(false);
    expect(validar({ limite: -1 })).toBe(false);
  });

  test("validarConta aceita limite zero, saldo zero e todos os status validos", () => {
    const validar = (alteracoes) => new ContaBancaria({ ...criarContaBase(), ...alteracoes }).validarConta();

    expect(validar({ limite: 0 })).toBe(true);
    expect(validar({ saldo: 0 })).toBe(true);
    expect(validar({ status: "ativa" })).toBe(true);
    expect(validar({ status: "bloqueada" })).toBe(true);
    expect(validar({ status: "encerrada" })).toBe(true);
    expect(validar({ status: "" })).toBe(false);
  });

  test("resetar conta zera saldo e limite e atualiza a data", () => {
    const dados = { ...criarContaBase(), saldo: -40, limite: 200, status: "encerrada" };
    const original = dados.atualizadaEm;
    const conta = new ContaBancaria(dados);

    conta.resetarConta();

    expect(dados.saldo).toBe(0);
    expect(dados.limite).toBe(0);
    expect(dados.status).toBe("ativa");
    expect(dados.atualizadaEm.getTime()).toBeGreaterThan(original.getTime());
  });
});
