const Banco = require("../src/banco");

describe("banco", () => {
  test("deve depositar e registrar transacao", () => {
    const conta = new Banco("Conta A", 100);

    const saldo = conta.depositar(50);

    expect(saldo).toBe(150);
    expect(conta.obterHistorico()).toContainEqual({ tipo: "Depósito", valor: 50 });
  });

  test("deve sacar com saldo suficiente", () => {
    const conta = new Banco("Conta A", 100);

    const saldo = conta.sacar(40);

    expect(saldo).toBe(60);
    expect(conta.obterHistorico()).toContainEqual({ tipo: "Saque", valor: 40 });
  });

  test("deve lancar erro ao sacar com saldo insuficiente", () => {
    const conta = new Banco("Conta A", 20);

    const acao = () => conta.sacar(21);

    expect(acao).toThrow("Saldo insuficiente");
  });

  test("deve transferir valor para conta de destino", () => {
    const origem = new Banco("Origem", 200);
    const destino = new Banco("Destino", 20);

    origem.transferir(50, destino);

    expect(origem.obterSaldo()).toBe(150);
    expect(destino.obterSaldo()).toBe(70);
    expect(origem.obterHistorico()).toContainEqual({
      tipo: "Transferência",
      valor: 50,
      destino: "Destino",
    });
  });

  test("deve definir e validar limite de saque", () => {
    const conta = new Banco("Conta A", 1000);
    conta.definirLimiteDeSaque(300);

    const dentroDoLimite = conta.verificarLimiteDeSaque(300);
    const acimaDoLimite = () => conta.verificarLimiteDeSaque(301);

    expect(dentroDoLimite).toBe(true);
    expect(acimaDoLimite).toThrow("Saque acima do limite permitido");
  });

  test("deve aplicar juros e registrar no historico", () => {
    const conta = new Banco("Conta A", 100);

    const saldoComJuros = conta.aplicarJuros(10);

    expect(saldoComJuros).toBe(110);
    expect(conta.obterHistorico()).toContainEqual({ tipo: "Juros", valor: 10 });
  });

  test("deve pagar conta e registrar pagamento", () => {
    const conta = new Banco("Conta A", 100);

    const saldo = conta.pagarConta(30, "Energia");

    expect(saldo).toBe(70);
    expect(conta.obterHistorico()).toContainEqual({ tipo: "Pagamento", valor: 30, descricao: "Energia" });
  });

  test("deve retornar total depositado somando apenas depositos", () => {
    const conta = new Banco("Conta A", 0);
    conta.depositar(10);
    conta.depositar(20);
    conta.aplicarJuros(10);

    const totalDepositado = conta.obterTotalDepositado();

    expect(totalDepositado).toBe(30);
  });
});
