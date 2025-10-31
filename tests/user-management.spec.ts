import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';
import { UserManagementPage } from '../pages/UserManagementPage';
import { creds, defaultEmployee } from '../utils/data';

const unique = Date.now();
const testUser = `accuknox_${unique}`;

test.describe('OrangeHRM User Management E2E', () => {
  test('1) Login & Navigate to Admin', async ({ page }) => {
    const login = new LoginPage(page);
    const admin = new AdminPage(page);
    await login.goto();
    await login.login(creds.username, creds.password);
    await admin.navigateToAdmin();
  });

  // (keep the rest of the tests as they are)
});
