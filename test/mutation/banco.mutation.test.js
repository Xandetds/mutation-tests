const Banco = require("../../src/banco");

describe("banco - regras de borda", () => {
  test("conta nova comeca com saldo zero e historico vazio", () => {
    const conta = new Banco("Conta A");

    expect(conta.obterSaldo()).toBe(0);
    expect(conta.obterHistorico()).toEqual([]);
    expect(conta.nome).toBe("Conta A");
  });

  test("permite sacar exatamente o saldo e rejeita sem registrar transacao", () => {
    const conta = new Banco("Conta A", 100);

    expect(conta.sacar(100)).toBe(0);
    expect(() => conta.sacar(1)).toThrow("Saldo insuficiente");
    expect(conta.obterSaldo()).toBe(0);
    expect(conta.obterHistorico()).toEqual([{ tipo: "Saque", valor: 100 }]);
  });

  test("transferencia sem saldo falha sem movimentar nem registrar nada", () => {
    const origem = new Banco("Origem", 10);
    const destino = new Banco("Destino", 0);

    expect(() => origem.transferir(11, destino)).toThrow("Saldo insuficiente");
    expect(origem.obterSaldo()).toBe(10);
    expect(destino.obterSaldo()).toBe(0);
    expect(origem.obterHistorico()).toEqual([]);
    expect(destino.obterHistorico()).toEqual([]);
  });

  test("transferencia registra saque na origem, deposito no destino e a transferencia", () => {
    const origem = new Banco("Origem", 100);
    const destino = new Banco("Destino", 0);

    origem.transferir(40, destino);

    expect(origem.obterHistorico()).toEqual([
      { tipo: "Saque", valor: 40 },
      { tipo: "Transferência", valor: 40, destino: "Destino" },
    ]);
    expect(destino.obterHistorico()).toEqual([{ tipo: "Depósito", valor: 40 }]);
  });

  test("limite de saque ainda nao definido nao bloqueia o saque", () => {
    const conta = new Banco("Conta A", 100);

    expect(conta.verificarLimiteDeSaque(50)).toBe(true);
  });

  test("juros fracionados e taxa zero", () => {
    const conta = new Banco("Conta A", 200);

    expect(conta.aplicarJuros(2.5)).toBe(205);
    expect(conta.aplicarJuros(0)).toBe(205);
    expect(conta.obterHistorico()).toEqual([
      { tipo: "Juros", valor: 5 },
      { tipo: "Juros", valor: 0 },
    ]);
  });

  test("pagar conta sem saldo falha e nao registra pagamento", () => {
    const conta = new Banco("Conta A", 10);

    expect(() => conta.pagarConta(20, "Agua")).toThrow("Saldo insuficiente");
    expect(conta.obterSaldo()).toBe(10);
    expect(conta.obterHistorico()).toEqual([]);
  });

  test("pagar conta registra saque e pagamento", () => {
    const conta = new Banco("Conta A", 100);

    conta.pagarConta(30, "Energia");

    expect(conta.obterHistorico()).toEqual([
      { tipo: "Saque", valor: 30 },
      { tipo: "Pagamento", valor: 30, descricao: "Energia" },
    ]);
  });

  test("total depositado e zero sem depositos e ignora saques e transferencias", () => {
    const conta = new Banco("Conta A", 100);
    const destino = new Banco("Destino", 0);

    expect(conta.obterTotalDepositado()).toBe(0);
    conta.sacar(10);
    conta.transferir(10, destino);
    expect(conta.obterTotalDepositado()).toBe(0);
    expect(destino.obterTotalDepositado()).toBe(10);
  });
});
