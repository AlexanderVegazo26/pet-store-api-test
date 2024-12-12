import { StoreApi } from "@api/store-api";
import { InventoryResponse, Order } from "@/types/store.types";
import { DataGenerator } from "@helpers/dataGenerator";
import { test, expect } from "@playwright/test";

test.describe("Store Endpoints", () => {
  let storeApi: StoreApi;

  test.beforeEach(async ({ request }) => {
    storeApi = new StoreApi(request);
  });

  test(
    "should place a new order",
    {
      tag: ["@smoke"],
    },
    async () => {
      const order: Order = DataGenerator.generateOrder();

      const createOrderResponse = await storeApi.createOrder(order);
      expect(createOrderResponse.status()).toBe(200); //it should be 201

      expect(await createOrderResponse.json()).toMatchObject({
        id: order.id,
        petId: order.petId,
        quantity: order.quantity,
        status: order.status,
      });
    }
  );

  test(
    "should check store inventory",
    {
      tag: ["@smoke"],
    },
    async () => {
      const inventoryResponse = await storeApi.getInventory();
      expect(inventoryResponse.status()).toBe(200);

      expect(await inventoryResponse.json()).toEqual(
        expect.objectContaining({
          approved: expect.any(Number),
          placed: expect.any(Number),
          delivered: expect.any(Number),
        })
      );
    }
  );

  test(
    "should get order by ID",
    {
      tag: ["@smoke"],
    },
    async () => {
      const order: Order = DataGenerator.generateOrder();
      const createOrderResponse = await storeApi.createOrder(order);
      expect(createOrderResponse.status()).toBe(200);

      const getOrderResponse = await storeApi.getOrderById(order.id);
      expect(getOrderResponse.status()).toBe(200);

      expect(await getOrderResponse.json()).toMatchObject({
        id: order.id,
        petId: order.petId,
        quantity: order.quantity,
        status: order.status,
      });
    }
  );

  test("should fail when getting non-existent order", async () => {
    const nonExistentOrderId = 99999982825;
    const getOrderResponse = await storeApi.getOrderById(nonExistentOrderId);
    expect(getOrderResponse.status()).toBe(404);
    expect(await getOrderResponse.text()).toBe("Order not found");
  });

  test(
    "should delete an existing order",
    {
      tag: ["@smoke"],
    },
    async () => {
      const order: Order = DataGenerator.generateOrder();
      const createOrderResponse = await storeApi.createOrder(order);
      expect(createOrderResponse.status()).toBe(200);

      expect(await createOrderResponse.json()).toMatchObject({
        id: order.id,
        petId: order.petId,
        quantity: order.quantity,
        status: order.status,
      });

      const deleteOrderResponse = await storeApi.deleteOrder(order.id);
      expect(deleteOrderResponse.status()).toBe(200);

      const getOrderByIdResponse = await storeApi.getOrderById(order.id);
      expect(getOrderByIdResponse.status()).toBe(404);
    }
  );
});
