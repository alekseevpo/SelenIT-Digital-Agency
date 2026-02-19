import { test, expect, devices } from '@playwright/test';

test.use({ ...devices['iPhone 13'] });

test.describe('mobile layout', () => {
    test('mobile menu opens and shows nav links', async ({ page }) => {
        await page.goto('/en');
        await page.getByRole('button', { name: /open menu/i }).click();
        await expect(page.getByRole('button', { name: /services/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /contact/i }).first()).toBeVisible();
    });

    test('mobile contact form fields are accessible', async ({ page }) => {
        await page.goto('/en/contact');
        await expect(page.getByLabel('Full Name')).toBeVisible();
        await expect(page.getByLabel('Email Address')).toBeVisible();
        await page.getByRole('button', { name: 'Request Full Callback' }).click();
        await expect(page.getByLabel('Phone Number')).toBeVisible();
    });

    test('mobile showreel page renders hero and project cards', async ({ page }) => {
        await page.goto('/en/showreel');
        await expect(page.getByRole('heading', { name: /work that speaks for us/i })).toBeVisible();
        const firstProject = page
            .getByRole('heading', { name: /luxe fashion e-commerce/i })
            .first();
        await firstProject.scrollIntoViewIfNeeded();
        await expect(firstProject).toBeVisible();
    });

    test('mobile services page renders hero and service list', async ({ page }) => {
        await page.goto('/en/services');
        await expect(
            page.getByRole('heading', { name: /comprehensive digital solutions/i }),
        ).toBeVisible();
        const firstService = page.getByRole('heading', { name: /branding/i }).first();
        await firstService.scrollIntoViewIfNeeded();
        await expect(firstService).toBeVisible();
    });

    test('mobile testimonials section is reachable on home', async ({ page }) => {
        await page.goto('/en');
        // Wait for page to load completely
        await page.waitForLoadState('networkidle');
        // Wait a bit more for lazy loaded components
        await page.waitForTimeout(2000);

        const testimonialsHeading = page.getByRole('heading', { name: /what our clients say/i });

        // Wait for the element to be attached to DOM before scrolling
        await testimonialsHeading.waitFor({ state: 'attached', timeout: 5000 });
        await testimonialsHeading.scrollIntoViewIfNeeded();
        await expect(testimonialsHeading).toBeVisible();
    });
});
