import { simulation, rampUsers } from "@gatling.io/core";
import {
  placeOrderScenario,
  getOrderByIdScenario,
  deleteOrderScenario,
  getInventoryScenario
} from "@scenarios/store/order.scenario";

import { http } from "@gatling.io/http";

export default simulation((setUp) => {
  const httpProtocol = http
    .baseUrl("http://127.0.0.1:8080/api/v3")
    .acceptHeader("application/json")
    .contentTypeHeader("application/json");

  setUp(
    placeOrderScenario().injectOpen(rampUsers(10).during(5)),
    getOrderByIdScenario().injectOpen(rampUsers(20).during(5)),
    deleteOrderScenario().injectOpen(rampUsers(5).during(5)),
    getInventoryScenario().injectOpen(rampUsers(15).during(5))
  ).protocols(httpProtocol);
});
