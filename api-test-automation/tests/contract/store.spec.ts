import {
  Order,
  createOrderResponseSchema,
  getOrderByIdResponseSchema,
  deleteOrderResponseSchema,
  getInventoryResponseSchema,
} from "@schemas/store.schema";
import { StoreApi } from "@api/store-api";
import { DataGenerator } from "@helpers/dataGenerator";
import { test, expect } from "@playwright/test";

test.describe("Store API Contract Tests", () => {
  let storeApi: StoreApi;

  test.beforeEach(async ({ request }) => {
    storeApi = new StoreApi(request);
  });

  test(
    "create order response should match schema",
    { tag: ["@contract"] },
    async () => {
      const order = DataGenerator.order();
      const response = await storeApi.createOrder(order);
      const responseBody = await response.json();

      expect(() =>
        createOrderResponseSchema.parse({
          success: true,
          data: responseBody,
        })
      ).not.toThrow();
    }
  );

  test(
    "get order by id response should match schema",
    { tag: ["@contract"] },
    async () => {
      const order = await (
        await storeApi.createOrder(DataGenerator.order())
      ).json();
      const response = await storeApi.getOrderById(order.id);
      const responseBody = await response.json();

      expect(() =>
        getOrderByIdResponseSchema.parse({
          success: true,
          data: responseBody,
        })
      ).not.toThrow();
    }
  );

  test(
    "get inventory response should match schema",
    { tag: ["@contract"] },
    async () => {
      const response = await storeApi.getInventory();
      const responseBody = await response.json();

      expect(() =>
        getInventoryResponseSchema.parse({
          success: true,
          data: responseBody,
        })
      ).not.toThrow();
    }
  );
});
