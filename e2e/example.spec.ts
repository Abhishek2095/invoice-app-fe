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

    await expect(page.locator(`text=${itemToAdd.Name}`)).toHaveText(
      `${itemToAdd.Name}`
    );
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

  test.only("item form validations", async ({ page }) => {
    await page.goto(`${baseURL}`);
    await itemsGetBeforeCreateNewItem(page);
    await page.locator('a:has-text("Items")').click();

    await page.locator('button:has-text("New Item")').click();
    const submitButton = page.locator('button:has-text("Submit")');

    await submitButton.click();

    const emptyFieldErrors = itemInputs.map(
      (input) => `${input.label} is required`
    );

    // await expect(page.locator(`text=hello`)).toHaveText(`hello`);

    // await expect(page.locator(`text=${emptyFieldErrors[0]}`)).toHaveText(
    //   `${emptyFieldErrors[0]}`
    // );

    // await expect(page.locator(`text=${emptyFieldErrors[0]}`)).toHaveText(
    //   `${emptyFieldErrors[0]}`
    // );

    // await expect(page.locator(`text=${emptyFieldErrors[1]}`)).toHaveText(
    //   `${emptyFieldErrors[1]}`
    // );

    // await expect(page.locator(`text=${emptyFieldErrors[2]}`)).toHaveText(
    //   `${emptyFieldErrors[2]}`
    // );

    // await expect(page.locator(`text=${emptyFieldErrors[3]}`)).toHaveText(
    //   `${emptyFieldErrors[3]}`
    // );

    for (let i = 0; i < emptyFieldErrors.length; i++) {
      await expect(page.locator(`text=${emptyFieldErrors[i]}`)).toHaveText(
        `${emptyFieldErrors[i]}`
      );
    }

    // emptyFieldErrors.forEach(async (errMsg) => {
    //   console.log(errMsg);
    //   await expect(page.locator(`text=${errMsg}`)).toHaveText(`${errMsg}`);
    // });

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
