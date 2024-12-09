import { InventoryResponse, Order } from "@/types/store.types";
import { StoreApi } from "@api/storeApi";
import { DataGenerator } from "@helpers/dataGenerator";
import { XmlHelper } from "@helpers/xmlhelper";
import { test, expect } from "@playwright/test";

test.describe("Store Endpoints", () => {
  let storeApi: StoreApi;

  test.beforeEach(async ({ request }) => {
    storeApi = new StoreApi(request);
  });

  test("should place a new order", async () => {
    const order: Order = DataGenerator.generateOrder();

    const createOrderResponse = await storeApi.createOrder(order);
    expect(createOrderResponse.status()).toBe(200); //it should be 201

    const orderResponseParsed = await XmlHelper.parseXmlResponse<{
      Order: Order;
    }>(createOrderResponse);

    expect(orderResponseParsed.Order).toMatchObject({
      id: order.id,
      petId: order.petId,
      quantity: order.quantity,
      status: order.status,
    });
  });

  test("should check store inventory", async () => {
    const inventoryResponse = await storeApi.getInventory();
    expect(inventoryResponse.status()).toBe(200);

    const inventoryResponseParsed = (
      await XmlHelper.parseXmlResponse<InventoryResponse>(inventoryResponse)
    ).HashMap;

    expect(inventoryResponseParsed).toEqual(
      expect.objectContaining({
        approved: expect.any(Number),
        placed: expect.any(Number),
        delivered: expect.any(Number),
      })
    );
  });

  test("should get order by ID", async () => {
    const order: Order = DataGenerator.generateOrder();
    const createOrderResponse = await storeApi.createOrder(order);
    expect(createOrderResponse.status()).toBe(200);

    const getOrderResponse = await storeApi.getOrderById(order.id);
    expect(getOrderResponse.status()).toBe(200);

    const orderResponseParsed = (
      await XmlHelper.parseXmlResponse<{
        Order: Order;
      }>(getOrderResponse)
    ).Order;

    expect(orderResponseParsed).toMatchObject({
      id: order.id,
      petId: order.petId,
      quantity: order.quantity,
      status: order.status,
    });
  });

  test("should fail when getting non-existent order", async () => {
    const nonExistentOrderId = 99999982825;
    const getOrderResponse = await storeApi.getOrderById(nonExistentOrderId);
    expect(getOrderResponse.status()).toBe(404);
  });

  test("should delete an existing order", async () => {
    const order: Order = DataGenerator.generateOrder();
    const createOrderResponse = await storeApi.createOrder(order);
    expect(createOrderResponse.status()).toBe(200);

    const orderResponseParsed = await XmlHelper.parseXmlResponse<{
      Order: Order;
    }>(createOrderResponse);
    expect(orderResponseParsed.Order).toMatchObject({
      id: order.id,
      petId: order.petId,
      quantity: order.quantity,
      status: order.status,
    });

    const deleteOrderResponse = await storeApi.deleteOrder(order.id);
    expect(deleteOrderResponse.status()).toBe(200);

    const getOrderByIdResponse = await storeApi.getOrderById(order.id);
    expect(getOrderByIdResponse.status()).toBe(404);
  });
});
