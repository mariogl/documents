import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("shows page title", async ({ page }) => {
  const pageTitle = page.getByRole("heading", { name: /documents/i });

  await expect(pageTitle).toBeVisible();
});

test("creates a new document", async ({ page }) => {
  const newDocumentData = {
    name: "E2E Test Document",
    version: "2.3.1",
  };

  const newDocumentButton = page.getByRole("button", {
    name: /add document/i,
  });

  await newDocumentButton.click();

  const nameInput = await page.getByLabel(/^name/i);
  const versionInput = await page.getByLabel(/^version/i);

  await nameInput.fill(newDocumentData.name);
  await versionInput.fill(newDocumentData.version);
  await versionInput.press("Enter");

  const message = await page.getByText(/document added successfully/i);

  await expect(message).toBeVisible();

  const newDocumentName = await page.getByRole("heading", {
    name: newDocumentData.name,
  });

  await expect(newDocumentName).toBeVisible();
});
