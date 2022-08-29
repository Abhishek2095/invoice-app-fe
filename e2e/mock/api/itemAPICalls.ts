import { Page } from "@playwright/test";
import {
  itemsAfterCreateNewItem,
  itemsBeforeCreateNewItem,
  itemToAdd,
} from "../data/itemsMockData";

export const itemsGetBeforeCreateNewItem = (page: Page) =>
  page.route("http://localhost:8080/v1/item/items", (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(itemsBeforeCreateNewItem),
    });
  });

export const itemsPostSuccess = (page: Page) =>
  page.route("http://localhost:8080/v1/item/add", (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(itemToAdd),
    });
  });

export const itemsPostFailure = (page: Page) =>
  page.route("http://localhost:8080/v1/item/add", (route) => {
    route.fulfill({
      status: 400,
      body: JSON.stringify("error"),
    });
  });

export const itemsGetAfterCreateNewItem = (page: Page) =>
  page.route("http://localhost:8080/v1/item/items", (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(itemsAfterCreateNewItem),
    });
  });
