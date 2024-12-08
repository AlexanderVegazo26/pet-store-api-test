import { exec, jsonPath, scenario, StringBody } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";
import { Order } from "@utils/types/store.types";
import { DataGenerator } from "@helpers/dataGenerator";

const placeOrderSteps = () =>
  exec((session) => {
    const order = DataGenerator.generateOrder();
    return session.set("testOrder", order);
  }).exec(
    http("Create purchase order")
      .post("/store/order")
      .body(
        StringBody((session) => {
          const order = session.get("testOrder") as Order;
          return JSON.stringify(order);
        })
      )
      .check(
        status().is(200),
        // Store the order ID from response for subsequent requests
        jsonPath("$.id").saveAs("orderId")
      )
  );

export const placeOrderScenario = () => {
  return scenario("Place Order").exec(placeOrderSteps()).pause(1);
};

export const getOrderByIdScenario = () => {
  return scenario("Get Order")
    .exec(placeOrderSteps())
    .exec(
      http("Find purchase order by ID")
        .get((session) => `/store/order/${session.get("orderId")}`)
        .check(status().is(200))
    )
    .pause(1);
};

export const deleteOrderScenario = () => {
  return scenario("Delete Order")
    .exec(placeOrderSteps())
    .exec(
      http("Delete purchase order by ID")
        .delete((session) => `/store/order/${session.get("orderId")}`)
        .check(status().is(200))
    )
    .pause(1);
};

export const getInventoryScenario = () => {
  return scenario("Get Inventory")
    .exec(http("Get store inventory by status").get("/store/inventory").check(status().is(200)))
    .pause(1);
};
