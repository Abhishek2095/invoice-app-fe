import { test, expect } from "@playwright/test";
import {
  itemsGetAfterCreateNewItem,
  itemsGetBeforeCreateNewItem,
  itemsPostSuccess,
  itemsPostFailure,
} from "./mock/api/itemAPICalls";
import {
  itemsAfterCreateNewItem,
  itemsBeforeCreateNewItem,
  itemToAdd,
} from "./mock/data/itemsMockData";

import { itemInputs } from "../src/views/Items/const";

const baseURL = "https://stupendous-chaja-374541.netlify.app/";
// const baseURL = "http://localhost:3000/";
test.describe("items test", () => {
  test("successful item post", async ({ page }) => {
    await page.goto(`${baseURL}`);
    await itemsGetBeforeCreateNewItem(page);
    await page.locator('a:has-text("Items")').click();

    await page.locator("tr").first().waitFor();
    expect(await page.locator("tr").count()).toEqual(
      itemsBeforeCreateNewItem.items.length + 1
    );

    await page.locator('button:has-text("New Item")').click();
    await page.fill('[placeholder="Item name"]', itemToAdd.Name);
    await page.fill(
      '[placeholder="Description of the item"]',
      itemToAdd.Description
    );
    await page.fill('[placeholder="Stock"]', itemToAdd.Stock.toString());
    await page.fill('[placeholder="Price"]', itemToAdd.Price.toString());
    await itemsPostSuccess(page);
    await page.locator('button:has-text("Submit")').click();

    await itemsGetAfterCreateNewItem(page);

    page.locator(`text=${itemToAdd.Name}`);
    expect(await page.locator("tr").count()).toEqual(
      itemsAfterCreateNewItem.items.length + 1
    );
  });

  test("unsuccessful item post", async ({ page }) => {
    await page.goto(`${baseURL}`);
    await itemsGetBeforeCreateNewItem(page);
    await page.locator('a:has-text("Items")').click();

    await page.locator("tr").first().waitFor();
    expect(await page.locator("tr").count()).toEqual(
      itemsBeforeCreateNewItem.items.length + 1
    );

    await page.locator('button:has-text("New Item")').click();
    await page.fill('[placeholder="Item name"]', itemToAdd.Name);
    await page.fill(
      '[placeholder="Description of the item"]',
      itemToAdd.Description
    );
    await page.fill('[placeholder="Stock"]', itemToAdd.Stock.toString());
    await page.fill('[placeholder="Price"]', itemToAdd.Price.toString());
    await itemsPostFailure(page);
    await page.locator('button:has-text("Submit")').click();
    page.locator("text=Something went wrong");
  });

  test("item form validations", async ({ page }) => {
    await page.goto(`${baseURL}`);
    await itemsGetBeforeCreateNewItem(page);
    await page.locator('a:has-text("Items")').click();

    await page.locator('button:has-text("New Item")').click();
    const submitButton = page.locator('button:has-text("Submit")');

    await submitButton.click();

    const emptyFieldErrors = itemInputs.map(
      (input) => `${input.label} is required`
    );

    emptyFieldErrors.forEach((errMsg) => page.locator(`text=${errMsg}`));

    // await page.fill('[placeholder="Item name"]', itemToAdd.Name);
    // await page.fill(
    //   '[placeholder="Description of the item"]',
    //   itemToAdd.Description
    // );
    // await page.fill('[placeholder="Stock"]', itemToAdd.Stock.toString());
    // await page.fill('[placeholder="Price"]', itemToAdd.Price.toString());
    // await itemsPostFailure(page);
    // await page.locator('button:has-text("Submit")').click();
  });
});
