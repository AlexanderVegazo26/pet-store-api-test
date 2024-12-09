import { simulation, rampUsers } from "@gatling.io/core";
import {
  placeOrderScenario,
  getOrderByIdScenario,
  deleteOrderScenario,
  getInventoryScenario
} from "@scenarios/store/order.scenario";

import { http } from "@gatling.io/http";
import { getEnvVar } from "@utils/config/environment";

export default simulation((setUp) => {
  const httpProtocol = http
    .baseUrl("http://127.0.0.1:8080/api/v3")
    .acceptHeader("application/json")
    .contentTypeHeader("application/json");

  const orderRampDuration = getEnvVar("ORDER_RAMP_DURATION", "5");
  const createOrders = getEnvVar("CREATE_ORDERS", "10");
  const readOrders = getEnvVar("READ_ORDERS", "20");
  const deleteOrders = getEnvVar("DELETE_ORDERS", "5");
  const readInventory = getEnvVar("READ_INVENTORY", "15");

  setUp(
    placeOrderScenario().injectOpen(rampUsers(createOrders).during(orderRampDuration)),
    getOrderByIdScenario().injectOpen(rampUsers(readOrders).during(orderRampDuration)),
    deleteOrderScenario().injectOpen(rampUsers(deleteOrders).during(orderRampDuration)),
    getInventoryScenario().injectOpen(rampUsers(readInventory).during(orderRampDuration))
  ).protocols(httpProtocol);
});
