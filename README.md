# playwright-shards-paralell

> Projeto didático demonstrando **testes paralelos** e **shards** com [Playwright](https://playwright.dev) + TypeScript.

---

## 📚 Conceitos

### Paralelismo (`workers`)

O Playwright pode rodar vários testes ao mesmo tempo dentro de uma mesma máquina usando **workers** (processos paralelos).

```
workers: '50%'   → usa metade dos núcleos da máquina
workers: 4       → até 4 testes simultâneos
workers: 1       → execução sequencial (padrão em modo headed)
```

Configurado em `playwright.config.ts`.

### Shards

Shards dividem a suite de testes em **fatias independentes** para serem executadas em máquinas (agentes de CI) diferentes ao mesmo tempo.

```
# Agente 1 de CI:
npx playwright test --shard=1/3

# Agente 2 de CI:
npx playwright test --shard=2/3

# Agente 3 de CI:
npx playwright test --shard=3/3
```

O Playwright distribui os arquivos de spec automaticamente entre os shards.

---

## 🗂️ Estrutura do Projeto

```
├── playwright.config.ts   # Configuração central (workers, projetos, etc.)
├── tests/
│   ├── home.spec.ts       # Testes da página inicial
│   ├── docs.spec.ts       # Testes da seção de documentação
│   └── api.spec.ts        # Testes da API reference + exemplo de parallel mode
└── .github/
    └── workflows/
        └── playwright.yml # CI com 3 shards rodando em paralelo
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

```bash
npm install
npx playwright install --with-deps
```

### Comandos disponíveis

| Comando | Descrição |
|---|---|
| `npm test` | Roda todos os testes em todos os browsers |
| `npm run test:chromium` | Apenas no Chromium |
| `npm run test:headed` | Com browser visível |
| `npm run test:shard1` | Shard 1 de 3 |
| `npm run test:shard2` | Shard 2 de 3 |
| `npm run test:shard3` | Shard 3 de 3 |
| `npm run test:report` | Abre o relatório HTML |

### Simulando shards localmente

```bash
# Terminal 1
npx playwright test --shard=1/3

# Terminal 2
npx playwright test --shard=2/3

# Terminal 3
npx playwright test --shard=3/3
```

---

## ⚙️ GitHub Actions CI

O workflow `.github/workflows/playwright.yml` usa uma **matrix strategy** para rodar 3 shards em paralelo:

```yaml
strategy:
  matrix:
    shardIndex: [1, 2, 3]
    shardTotal: [3]
```

Cada agente executa:
```bash
npx playwright test --project=chromium --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
```

Os relatórios de cada shard são enviados como artefatos e combinados no job `merge-reports`.

---

## 🔍 Modos de paralelismo nos testes

### Padrão (por arquivo)
Cada arquivo `.spec.ts` roda em um worker separado — testes dentro do mesmo arquivo são sequenciais.

### Paralelo explícito (dentro de um describe)
```typescript
test.describe('Meu grupo', () => {
  test.describe.configure({ mode: 'parallel' });

  test('teste A', async ({ page }) => { /* ... */ });
  test('teste B', async ({ page }) => { /* ... */ });
  // A e B rodam ao mesmo tempo
});
```

Veja o exemplo em `tests/api.spec.ts`.

---

## 📖 Referências

- [Playwright - Parallelism](https://playwright.dev/docs/test-parallel)
- [Playwright - Sharding](https://playwright.dev/docs/test-sharding)
- [Playwright - Configuration](https://playwright.dev/docs/test-configuration)
