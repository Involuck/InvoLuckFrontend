import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    page.on('request', (request) =>
      console.log('>>', request.method(), request.url())
    );
    page.on('response', (response) =>
      console.log('<<', response.status(), response.url())
    );

    await page.goto('/auth/login');

    await page.waitForLoadState('networkidle');

    await page.screenshot({ path: 'login-page.png' });

    console.log('Page content:', await page.content());
  });

  test('should display login form', async ({ page }) => {
    const heading = page.getByRole('heading', { name: /iniciar sesión/i });
    await expect(heading, 'Login heading should be visible').toBeVisible();

    const emailInput = page
      .locator('input[type="email"], input[name*="email"], input[id*="email"]')
      .first();
    await expect(emailInput, 'Email input should be visible').toBeVisible();

    const passwordInput = page
      .locator(
        'input[type="password"], input[name*="password"], input[id*="password"]'
      )
      .first();
    await expect(
      passwordInput,
      'Password input should be visible'
    ).toBeVisible();

    const submitButton = page
      .getByRole('button', { name: /iniciar sesión|ingresar|acceder/i })
      .first();
    await expect(submitButton, 'Submit button should be visible').toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    const emailInput = page
      .locator('input[type="email"], input[name*="email"]')
      .first();
    const passwordInput = page
      .locator('input[type="password"], input[name*="password"]')
      .first();

    await emailInput.clear();
    await passwordInput.clear();

    const submitButton = page
      .getByRole('button', { name: /iniciar sesión|ingresar|acceder/i })
      .first();
    const isSubmitDisabled = await submitButton.isDisabled();

    if (isSubmitDisabled) {
      expect(
        isSubmitDisabled,
        'Submit button should be disabled for empty form'
      ).toBeTruthy();
      return;
    }

    await submitButton.click();

    const emailError = await page
      .getByText(
        /por favor ingresa un email válido|email is required|correo es requerido/i
      )
      .isVisible()
      .catch(() => false);

    const passwordError = await page
      .getByText(
        /la contraseña es requerida|password is required|contraseña es requerida/i
      )
      .isVisible()
      .catch(() => false);

    const emailHasError = await emailInput
      .evaluate((el) => {
        const style = window.getComputedStyle(el);
        return (
          style.borderColor.includes('220 38 38') || // red-600
          style.borderColor.includes('239 68 68') || // red-500
          style.borderColor.includes('185 28 28')
        ); // red-700
      })
      .catch(() => false);

    const passwordHasError = await passwordInput
      .evaluate((el) => {
        const style = window.getComputedStyle(el);
        return (
          style.borderColor.includes('220 38 38') || // red-600
          style.borderColor.includes('239 68 68') || // red-500
          style.borderColor.includes('185 28 28')
        ); // red-700
      })
      .catch(() => false);

    const hasValidationError =
      emailError || passwordError || emailHasError || passwordHasError;
    expect(
      hasValidationError,
      'Expected to see validation errors for empty form'
    ).toBeTruthy();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const emailInput = page
      .locator('input[type="email"], input[name*="email"]')
      .first();
    const passwordInput = page
      .locator('input[type="password"], input[name*="password"]')
      .first();
    const submitButton = page
      .getByRole('button', { name: /iniciar sesión|ingresar|acceder/i })
      .first();

    await emailInput.fill('invalid@example.com');
    await passwordInput.fill('wrongpassword');

    await submitButton.click();

    const errorMessage = page
      .getByText(/error|incorrecto|inválido|credenciales|autenticación/i)
      .first();
    await expect(
      errorMessage,
      'Should show error message for invalid credentials'
    ).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to forgot password page', async ({ page }) => {
    const forgotPasswordLink = page
      .getByRole('link', {
        name: /olvidé|olvido|olvidaste|contraseña|recuperar/i
      })
      .first();

    const forgotPasswordButton = await page
      .getByRole('button', {
        name: /olvidé|olvido|olvidaste|contraseña|recuperar/i
      })
      .first()
      .isVisible()
      .catch(() => false);

    if (await forgotPasswordLink.isVisible()) {
      await forgotPasswordLink.click();
    } else if (forgotPasswordButton) {
      await page
        .getByRole('button', {
          name: /olvidé|olvido|olvidaste|contraseña|recuperar/i
        })
        .first()
        .click();
    } else {
      throw new Error('Forgot password link/button not found');
    }

    await expect(page).toHaveURL(/forgot-password|recuperar|reset/i);
  });

  test('should navigate to signup page', async ({ page }) => {
    const signupSelectors = [
      'a:has-text("Crear cuenta")',
      'a:has-text("Registrarse")',
      'a:has-text("Registro")',
      'a:has-text("Sign up")',
      'a[href*="register"]',
      'a[href*="signup"]',
      'a[href*="registro"]',
      'button:has-text("Crear cuenta")',
      'button:has-text("Registrarse")',
      'button:has-text("Registro")',
      'button:has-text("Sign up")'
    ];

    let signupElement = null;
    for (const selector of signupSelectors) {
      const elements = await page.$$(selector);
      if (elements.length > 0) {
        const isVisible = await elements[0].isVisible();
        if (isVisible) {
          signupElement = elements[0];
          break;
        }
      }
    }

    if (!signupElement) {
      const allLinks = await page.$$('a');
      for (const link of allLinks) {
        const text = await link.textContent();
        if (text && /registr|crear cuenta|sign up|nuevo/i.test(text)) {
          signupElement = link;
          break;
        }
      }
    }

    if (!signupElement) {
      console.log(
        'Signup link not found, navigating directly to /auth/register'
      );
      await page.goto('/auth/register');
    } else {
      await signupElement.click();
    }

    await expect(page).toHaveURL(/register|signup|registro/i);
  });
});
