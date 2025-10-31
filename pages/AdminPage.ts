import { Page, expect } from '@playwright/test';

export class AdminPage {
  constructor(private page: Page) {}

  async navigateToAdmin() {
    await this.page.getByRole('link', { name: 'Admin' }).click();
    await expect(this.page.getByRole('heading', { name: 'Admin' })).toBeVisible();
  }
}
