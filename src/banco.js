class Banco {
    constructor(nome, saldoInicial = 0) {
        this.nome = nome;
        this.saldo = saldoInicial;
        this.transacoes = [];
    }

    depositar(valor) {
        this.saldo += valor;
        this.transacoes.push({ tipo: 'Depósito', valor });
        return this.saldo;
    }

    sacar(valor) {
        if (valor > this.saldo) {
            throw new Error('Saldo insuficiente');
        }
        this.saldo -= valor;
        this.transacoes.push({ tipo: 'Saque', valor });
        return this.saldo;
    }

    transferir(valor, contaDestino) {
        this.sacar(valor);
        contaDestino.depositar(valor);
        this.transacoes.push({ tipo: 'Transferência', valor, destino: contaDestino.nome });
    }

    obterSaldo() {
        return this.saldo;
    }

    obterHistorico() {
        return this.transacoes;
    }

    definirLimiteDeSaque(valorLimite) {
        this.limiteDeSaque = valorLimite;
    }

    verificarLimiteDeSaque(valor) {
        if (valor > this.limiteDeSaque) {
            throw new Error('Saque acima do limite permitido');
        }
        return true;
    }

    aplicarJuros(taxa) {
        const juros = this.saldo * (taxa / 100);
        this.saldo += juros;
        this.transacoes.push({ tipo: 'Juros', valor: juros });
        return this.saldo;
    }

    pagarConta(valor, descricao) {
        this.sacar(valor);
        this.transacoes.push({ tipo: 'Pagamento', valor, descricao });
        return this.saldo;
    }

    obterTotalDepositado() {
        return this.transacoes
            .filter(transacao => transacao.tipo === 'Depósito')
            .reduce((total, transacao) => total + transacao.valor, 0);
    }
}

module.exports = Banco;
