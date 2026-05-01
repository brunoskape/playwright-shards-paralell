import { test, expect } from '@playwright/test';

/**
 * Testes de API Reference e funcionalidades avançadas.
 *
 * Terceiro arquivo de spec — ilustra como a suite cresce e como os shards
 * dividem o trabalho de forma automática entre os agentes de CI.
 *
 * Cada teste aqui também roda em PARALELO com os outros dentro do mesmo shard,
 * limitado pela opção `workers` do playwright.config.ts.
 */

const makePage = (title: string, body: string) => `
  <!DOCTYPE html>
  <html lang="pt-BR">
    <head><title>${title}</title></head>
    <body>${body}</body>
  </html>
`;

test.describe('API Reference', () => {
  test('página de API deve carregar', async ({ page }) => {
    await page.setContent(makePage('Playwright API', '<h1>Playwright</h1><p>API de automação de browsers.</p>'));
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('deve ter referência à classe Browser', async ({ page }) => {
    await page.setContent(makePage('Browser', '<h1>Browser</h1><p>Representa uma instância do browser.</p><ul><li>newPage()</li><li>close()</li></ul>'));
    await expect(page).toHaveTitle(/Browser/);
    await expect(page.getByText('newPage()')).toBeVisible();
  });

  test('deve ter referência à classe Page', async ({ page }) => {
    await page.setContent(makePage('Page', '<h1>Page</h1><p>Representa uma página do browser.</p><ul><li>goto()</li><li>click()</li><li>fill()</li></ul>'));
    await expect(page).toHaveTitle(/Page/);
    await expect(page.getByText('goto()')).toBeVisible();
  });

  test('deve ter referência à classe Locator', async ({ page }) => {
    await page.setContent(makePage('Locator', '<h1>Locator</h1><p>Forma robusta de encontrar elementos.</p><ul><li>click()</li><li>fill()</li><li>isVisible()</li></ul>'));
    await expect(page).toHaveTitle(/Locator/);
    await expect(page.getByText('isVisible()')).toBeVisible();
  });
});

/**
 * Demonstração de testes paralelos dentro de um mesmo describe:
 *
 * `test.describe.configure({ mode: 'parallel' })` força que todos os
 * testes dentro do describe rodem em paralelo (ao invés do padrão
 * que respeita a ordem de definição).
 */
test.describe('Execução paralela explícita', () => {
  test.describe.configure({ mode: 'parallel' });

  test('verifica página de trace viewer', async ({ page }) => {
    await page.setContent(makePage('Trace Viewer', '<h1>Trace Viewer</h1><p>Ferramenta para depurar testes.</p>'));
    await expect(page).toHaveTitle(/Trace Viewer/);
  });

  test('verifica página de screenshots', async ({ page }) => {
    await page.setContent(makePage('Screenshots', '<h1>Screenshots</h1><p>Capture screenshots durante os testes.</p>'));
    await expect(page).toHaveTitle(/Screenshots/);
  });

  test('verifica página de videos', async ({ page }) => {
    await page.setContent(makePage('Videos', '<h1>Videos</h1><p>Grave vídeos dos seus testes.</p>'));
    await expect(page).toHaveTitle(/Videos/);
  });
});

