import { simulation, rampUsers } from "@gatling.io/core";
import {
  placeOrderScenario,
  getOrderByIdScenario,
  deleteOrderScenario,
  getInventoryScenario
} from "@scenarios/store/order.scenario";

import { getEnvVar } from "@utils/config/environment";
import { httpProtocol } from "@utils/config/setHttpProtocol";

export default simulation((setUp) => {
  const orderRampDuration = getEnvVar("ORDER_RAMP_DURATION", "100");
  const createOrders = getEnvVar("CREATE_ORDERS", "100");
  const readOrders = getEnvVar("READ_ORDERS", "100");
  const deleteOrders = getEnvVar("DELETE_ORDERS", "100");
  const readInventory = getEnvVar("READ_INVENTORY", "100");

  setUp(
    placeOrderScenario().injectOpen(rampUsers(createOrders).during(orderRampDuration)),
    getOrderByIdScenario().injectOpen(rampUsers(readOrders).during(orderRampDuration)),
    deleteOrderScenario().injectOpen(rampUsers(deleteOrders).during(orderRampDuration)),
    getInventoryScenario().injectOpen(rampUsers(readInventory).during(orderRampDuration))
  ).protocols(httpProtocol);
});
