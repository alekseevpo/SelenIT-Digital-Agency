import { test, expect } from '@playwright/test';

test('home page loads primary CTA', async ({ page }) => {
    await page.goto('/en');
    // Wait for page to load completely
    await page.waitForLoadState('networkidle');
    // Wait a bit more for lazy loaded components
    await page.waitForTimeout(2000);

    // Check for the actual CTA button - "Get a Quote" instead of "Start Your Project"
    await expect(page.getByRole('link', { name: 'Get a Quote' })).toBeVisible();
});

test('contact page shows main form fields', async ({ page }) => {
    await page.goto('/en/contact');
    await expect(page.getByRole('heading', { name: 'Let us Start a Conversation' })).toBeVisible();
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await page.getByRole('button', { name: 'Request Full Callback' }).click();
    await expect(page.getByLabel('Phone Number')).toBeVisible();
});
