# AccuKnox-user-management-tests

End-to-end User Management tests for the OrangeHRM demo using **Playwright (TypeScript)** and the **Page Object Model (POM)**.

- **AUT**: https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
- **Demo creds**: Username `Admin`, Password `admin123` (visible on login page)
- **Playwright version used**: 1.48.0

## ✅ Covered Scenarios
Each scenario is a separate `test()` block:
1. Login & Navigate to **Admin** module
2. **Add** a new user
3. **Search** the newly created user
4. **Edit** all possible user details (role, status)
5. **Validate** the updated details
6. **Delete** the user

## 🧱 Project Structure

```
AccuKnox-user-management-tests/
├─ pages/
│  ├─ LoginPage.ts
│  ├─ AdminPage.ts
│  └─ UserManagementPage.ts
├─ tests/
│  └─ user-management.spec.ts
├─ utils/
│  └─ data.ts
├─ playwright.config.ts
├─ package.json
└─ README.md
```

## 🛠 Setup

```bash
# 1) Install deps
npm ci

# 2) Install Playwright browsers
npx playwright install

# (optional) Validate versions
npx playwright --version
```

> If you do not have Node.js, install LTS (v18+).

## ▶️ Run tests

```bash
# Headless (CI-default)
npx playwright test

# Headed, UI mode
npx playwright test --ui

# Run the single spec
npx playwright test tests/user-management.spec.ts
```

## 🌱 Test Data
- The spec generates a unique username per run (timestamp-based).
- It uses an existing employee like **"Paul Collings"** on the demo instance.
- Role toggles between **ESS** and **Admin** during edit step to validate changes.

## 📄 Notes
- Selectors prefer `getByRole`, `getByLabel`, `getByPlaceholder`, or visible text.
- Proper waits are added via Playwright’s auto-waiting & explicit expectations.
- The suite is written to be idempotent: it cleans up by deleting the created user.

## 🔒 Environment
No secrets are required—demo creds are on the login page.

---

© 2025 AccuKnox QA Trainee Practical Assessment sample solution.
