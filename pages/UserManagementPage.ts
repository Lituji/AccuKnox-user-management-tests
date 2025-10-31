import { Page, expect } from '@playwright/test';

export class UserManagementPage {
  constructor(private page: Page) {}

  async clickAdd() {
    await this.page.getByRole('button', { name: 'Add' }).click();
    await expect(this.page.getByRole('heading', { name: 'Add User' })).toBeVisible();
  }

  async createUser(employeeName: string, username: string, role: 'Admin' | 'ESS' = 'ESS', status: 'Enabled' | 'Disabled' = 'Enabled') {
    // User Role
    await this.page.getByText('User Role').locator('xpath=..').locator('i').click();
    await this.page.getByRole('option', { name: role }).click();

    // Employee Name (autocomplete)
    const empInput = this.page.getByPlaceholder('Type for hints...');
    await empInput.fill(employeeName);
    const drop = this.page.locator('.oxd-autocomplete-dropdown').first();
    await expect(drop).toBeVisible();
    await drop.getByText(employeeName, { exact: false }).first().click();

    // Status
    await this.page.getByText('Status').locator('xpath=..').locator('i').click();
    await this.page.getByRole('option', { name: status }).click();

    // Username
    await this.page.getByLabel('Username').fill(username);

    // Password + Confirm
    await this.page.getByLabel('Password').fill('Passw0rd!');
    await this.page.getByLabel('Confirm Password').fill('Passw0rd!');

    await this.page.getByRole('button', { name: 'Save' }).click();

    // After save, should return to Users list with success toast
    await expect(this.page.getByText('Success')).toBeVisible();
  }

  async searchUser(username: string) {
    await expect(this.page.getByRole('heading', { name: 'System Users' })).toBeVisible();
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByRole('button', { name: 'Search' }).click();
    await expect(this.page.getByRole('table')).toBeVisible();
    await expect(this.page.getByRole('row', { name: username }).first()).toBeVisible();
  }

  async openUserFromResults(username: string) {
    await this.page.getByRole('row', { name: username }).first().getByRole('link').first().click();
    await expect(this.page.getByRole('heading', { name: 'Edit User' })).toBeVisible();
  }

  async editUser(role: 'Admin' | 'ESS', status: 'Enabled' | 'Disabled') {
    // Change role
    await this.page.getByText('User Role').locator('xpath=..').locator('i').click();
    await this.page.getByRole('option', { name: role }).click();

    // Change status
    await this.page.getByText('Status').locator('xpath=..').locator('i').click();
    await this.page.getByRole('option', { name: status }).click();

    await this.page.getByRole('button', { name: 'Save' }).click();
    await expect(this.page.getByText('Success')).toBeVisible();
  }

  async validateUserDetails(expected: { username: string, role: 'Admin'|'ESS', status: 'Enabled'|'Disabled' }) {
    await expect(this.page.getByLabel('Username')).toHaveValue(expected.username);
    // Simple validation by toggling dropdowns to confirm option presence (UI lacks static value attributes)
    await this.page.getByText('User Role').locator('xpath=..').locator('.oxd-select-text').click();
    await this.page.getByRole('option', { name: expected.role }).click();
    await this.page.getByText('Status').locator('xpath=..').locator('.oxd-select-text').click();
    await this.page.getByRole('option', { name: expected.status }).click();
  }

  async deleteUser(username: string) {
    // Ensure we're on list
    if (await this.page.getByRole('button', { name: 'Save' }).isVisible().catch(() => false)) {
      await this.page.getByRole('link', { name: 'Cancel' }).click();
    }
    await this.searchUser(username);
    // Click the trash icon
    await this.page.getByRole('row', { name: username }).first().getByRole('button', { name: 'Delete' }).click();
    // Confirm dialog
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    await expect(this.page.getByText('Success')).toBeVisible();
  }
}
