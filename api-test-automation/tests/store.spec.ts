import { Order } from "@schemas/store.schema";
import { StoreApi } from "@api/store-api";
import { DataGenerator } from "@helpers/dataGenerator";
import { test, expect } from "@playwright/test";

test.describe("Store Endpoints", () => {
  let storeApi: StoreApi;

  test.beforeEach(async ({ request }) => {
    storeApi = new StoreApi(request);
  });

  test("should place a new order", { tag: ["@smoke"] }, async () => {
    const order: Order = DataGenerator.order();
    const response = await storeApi.createOrder(order);

    expect(response.status()).toBe(200); //it should be 201
    expect(await response.json()).toMatchObject({
      id: order.id,
      petId: order.petId,
      quantity: order.quantity,
      status: order.status,
    });
  });

  test("should check store inventory", { tag: ["@smoke"] }, async () => {
    const response = await storeApi.getInventory();

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(
      expect.objectContaining({
        approved: expect.any(Number),
        placed: expect.any(Number),
        delivered: expect.any(Number),
      })
    );
  });

  test("should get order by ID", { tag: ["@smoke"] }, async () => {
    const order: Order = DataGenerator.order();
    await storeApi.createOrder(order);

    const response = await storeApi.getOrderById(order.id);
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({
      id: order.id,
      petId: order.petId,
      quantity: order.quantity,
      status: order.status,
    });
  });

  test("should fail when getting non-existent order", async () => {
    const response = await storeApi.getOrderById(-1);
    expect(response.status()).toBe(404);
    expect(await response.text()).toBe("Order not found");
  });

  test("should delete an existing order", { tag: ["@smoke"] }, async () => {
    const order: Order = DataGenerator.order();
    await storeApi.createOrder(order);

    const deleteResponse = await storeApi.deleteOrder(order.id);
    expect(deleteResponse.status()).toBe(200);

    const getResponse = await storeApi.getOrderById(order.id);
    expect(getResponse.status()).toBe(404);
  });
});
