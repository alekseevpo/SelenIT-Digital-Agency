import { test, expect } from '@playwright/test';

test('home page loads primary CTA', async ({ page }) => {
    await page.goto('/en');
    await expect(page.getByRole('link', { name: 'Start Your Project' })).toBeVisible();
});

test('contact page shows main form fields', async ({ page }) => {
    await page.goto('/en/contact');
    await expect(page.getByRole('heading', { name: 'Let us Start a Conversation' })).toBeVisible();
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await page.getByRole('button', { name: 'Request Full Callback' }).click();
    await expect(page.getByLabel('Phone Number')).toBeVisible();
});
