import { test, expect } from '@playwright/test';

/**
 * Testes da página inicial (usando página local para funcionar sem internet).
 *
 * Estes testes demonstram execução PARALELA: cada `test()` é um caso
 * independente e pode rodar ao mesmo tempo que outros testes, dependendo
 * do número de `workers` configurado em playwright.config.ts.
 */

test.describe('Página inicial', () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head><title>Playwright - Framework de Testes</title></head>
        <body>
          <nav>
            <a href="/docs">Docs</a>
            <a href="/api">API</a>
            <a href="/community">Community</a>
          </nav>
          <h1>Playwright</h1>
          <p>Framework de testes end-to-end confiável para aplicações web modernas.</p>
          <a href="/docs/intro" id="get-started">Get started</a>
        </body>
      </html>
    `);
  });

  test('deve exibir o título correto', async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('deve ter o link "Get Started" visível', async ({ page }) => {
    const getStarted = page.locator('#get-started');
    await expect(getStarted).toBeVisible();
    await expect(getStarted).toHaveText('Get started');
  });

  test('deve exibir o texto de descrição do produto', async ({ page }) => {
    await expect(page.locator('p')).toContainText('Framework de testes');
  });

  test('deve exibir a barra de navegação com links principais', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Docs' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'API' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Community' })).toBeVisible();
  });
});

