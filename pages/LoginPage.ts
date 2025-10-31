import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/web/index.php/auth/login');
    await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();

    // Consider login successful if either the dashboard URL appears
    // OR the sidebar "Admin" link becomes visible (whichever happens first)
    const adminLink = this.page.getByRole('link', { name: 'Admin' });

    await Promise.race([
      this.page.waitForURL(/.*\/index\.php\/dashboard\/?.*/i, { timeout: 45_000 }),
      adminLink.waitFor({ state: 'visible', timeout: 45_000 }),
    ]);

    await expect(adminLink).toBeVisible({ timeout: 15_000 });
  }
}





