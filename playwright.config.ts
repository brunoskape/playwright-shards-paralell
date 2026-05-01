import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration - Parallel & Shards Demo
 *
 * CONCEITOS IMPORTANTES:
 *
 * - workers: número de testes rodando em paralelo dentro de um mesmo processo (shard).
 *   Ex.: workers: 4 → até 4 testes ao mesmo tempo naquela máquina.
 *
 * - shards: divide a suite de testes em fatias independentes para rodar em
 *   máquinas/agentes diferentes ao mesmo tempo (útil em CI).
 *   Ex.: shard 1/3, 2/3, 3/3 → cada agente de CI roda um terço dos testes.
 *   O shard ativo é passado via linha de comando:
 *     npx playwright test --shard=1/3
 *
 * Referência: https://playwright.dev/docs/test-sharding
 */
export default defineConfig({
  testDir: './tests',

  /* Tempo máximo por teste */
  timeout: 30_000,

  /* Configurações de relatório */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],

  /* Cada teste roda em um contexto de browser isolado por padrão */
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  /* ------------------------------------------------------------------ *
   * PARALELISMO: número de workers simultâneos por shard.               *
   * '50%' usa metade dos núcleos disponíveis na máquina.               *
   * ------------------------------------------------------------------ */
  workers: '50%',

  /* Número de retentativas em caso de falha */
  retries: 1,

  /* Projetos = combinações de browser/dispositivo */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Exemplo de projeto mobile */
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
