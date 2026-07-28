import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Compliance Console Accessibility & Smoke", () => {
  test("Sign-in page meets WCAG 2.1 AA", async ({ page }) => {
    await page.goto("/sign-in");
    
    // Check h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);
    
    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("Rule Register page meets WCAG 2.1 AA", async ({ page }) => {
    await page.goto("/rules");
    
    // Check skip link
    await expect(page.locator("a", { hasText: "Skip to content" })).toBeAttached();

    // Check h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Navigation active state
    await expect(page.locator("nav a", { hasText: "Rule Register" })).toHaveAttribute("aria-current", "page");

    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("Section Schema page meets WCAG 2.1 AA", async ({ page }) => {
    await page.goto("/sections");
    
    // Check h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Navigation active state
    await expect(page.locator("nav a", { hasText: "Section Schema" })).toHaveAttribute("aria-current", "page");

    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("CEF page meets WCAG 2.1 AA and toggle works", async ({ page }) => {
    await page.goto("/cef");
    
    // Check h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Navigation active state
    await expect(page.locator("nav a", { hasText: "Conditions for Enhanced Funding" })).toHaveAttribute("aria-current", "page");

    // Check toggle behavior
    await expect(page.locator("button", { hasText: "Initial Approval (22 conditions)" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("[data-cef-condition]")).toHaveCount(22);
    
    await page.locator("button", { hasText: "Reapproval (19 conditions)" }).click();
    await expect(page.locator("button", { hasText: "Reapproval (19 conditions)" })).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("The Reapproval Asymmetry")).toBeVisible();
    await expect(page.locator("[data-cef-condition]")).toHaveCount(19);

    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("Integrity page meets WCAG 2.1 AA", async ({ page }) => {
    await page.goto("/integrity");
    
    // Check h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Navigation active state
    await expect(page.locator("nav a", { hasText: "Conflicts & open questions" })).toHaveAttribute("aria-current", "page");

    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
