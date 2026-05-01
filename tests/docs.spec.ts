import { test, expect } from '@playwright/test';

/**
 * Testes da seção de documentação.
 *
 * Arquivo separado para demonstrar como múltiplos arquivos de spec
 * são distribuídos entre shards no CI.
 *
 * Quando rodamos:  npx playwright test --shard=2/3
 * o Playwright divide todos os arquivos de spec em 3 grupos e este agente
 * de CI processa apenas os arquivos do grupo 2.
 */

const makeDocPage = (title: string, content: string) => `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head><title>${title} - Docs</title></head>
    <body>
      <h1>${title}</h1>
      ${content}
    </body>
  </html>
`;

test.describe('Documentação', () => {
  test('página de instalação deve conter instruções de npm', async ({ page }) => {
    await page.setContent(
      makeDocPage('Instalação', '<code>npm init playwright@latest</code><p>Instale as dependências e rode os testes.</p>')
    );
    await expect(page.locator('code')).toHaveText('npm init playwright@latest');
  });

  test('deve ter seção de configuração de browsers', async ({ page }) => {
    await page.setContent(
      makeDocPage('Browsers', '<p>Playwright suporta Chromium, Firefox e WebKit.</p><ul><li>Chromium</li><li>Firefox</li><li>WebKit</li></ul>')
    );
    await expect(page).toHaveTitle(/Browsers/);
    await expect(page.locator('ul li')).toHaveCount(3);
  });

  test('página de configuração deve carregar corretamente', async ({ page }) => {
    await page.setContent(
      makeDocPage('Configuration', '<p>Configure o Playwright via <code>playwright.config.ts</code>.</p>')
    );
    await expect(page).toHaveTitle(/Configuration/);
  });

  test('deve acessar a página de paralelismo', async ({ page }) => {
    await page.setContent(
      makeDocPage('Parallelism', '<p>Use workers para rodar testes em paralelo.</p><code>workers: 4</code>')
    );
    await expect(page).toHaveTitle(/Parallelism/);
    await expect(page.locator('code')).toContainText('workers');
  });

  test('deve acessar a página de sharding', async ({ page }) => {
    await page.setContent(
      makeDocPage('Sharding', '<p>Divida sua suite com <code>--shard=1/3</code> para rodar em vários agentes de CI.</p>')
    );
    await expect(page).toHaveTitle(/Sharding/);
    await expect(page.locator('p')).toContainText('--shard=1/3');
  });
});

