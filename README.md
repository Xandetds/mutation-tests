# Mutation Tests com Stryker

Projeto baseado no trabalho de testes unitários com Jest ([unit-tests-jest](https://github.com/ugioni/unit-tests-jest)), agora com testes de mutação usando o [Stryker Mutator](https://stryker-mutator.io/).

## O que é teste de mutação

O Stryker altera o código de `src/` de forma automática (troca `>` por `>=`, remove condicionais, inverte retornos etc.), gerando "mutantes". Para cada mutante a suíte de testes é executada: se algum teste falha, o mutante foi **morto**; se todos passam, ele **sobreviveu**, o que indica um comportamento que os testes não verificam.

## Como executar

Requer Node.js >= 20.

```bash
npm install
npm test
npm run coverage
npm run mutation
```

O relatório HTML do Stryker fica em `reports/mutation/mutation.html`.

## Configuração

`stryker.config.json`: runner Jest, mutação em `src/**/*.js` e limite mínimo de 80% de mutation score (abaixo disso o comando falha).

## Resultado

| Etapa | Mutation score |
| --- | --- |
| Testes unitários do 1º trabalho | 79,32% |
| Com os testes novos em `test/mutation/` | 98,4% |

Os testes originais continuam em `test/`. Os testes criados para matar os mutantes sobreviventes estão em `test/mutation/`, um arquivo por módulo.

Os mutantes que ainda sobrevivem são equivalentes (a mudança não altera o comportamento observável):

- `anagram.js`: `toLowerCase` trocado por `toUpperCase` e separador do `join`, já que os dois lados da comparação passam pela mesma transformação.
- `carro.js`: `distancia > 0` trocado por `>= 0`, pois somar zero não muda a quilometragem.
- `contaBancaria.js` (`transferir`): as guardas `podeSacar` e `sacar` validam a mesma regra, então a segunda nunca é alcançada.
- `utilitarios.js`: `toLowerCase` trocado por `toUpperCase` antes da comparação do palíndromo.
- `textoUtils.js` (`contarPalavras`): `trim()` e `\s+` são redundantes por causa do `filter(Boolean)`.

## Estrutura

- `src`: código-fonte
- `test`: testes unitários originais
- `test/mutation`: testes adicionados a partir dos mutantes sobreviventes
