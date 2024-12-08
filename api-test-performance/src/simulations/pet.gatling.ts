import { simulation, rampUsers } from "@gatling.io/core";
import { createPetScenario, updatePetScenario } from "../scenarios/pet/petManagement.scenario";
import { http } from "@gatling.io/http";
import { findPetsByStatusScenario } from "../scenarios/pet/petSearch.scenario";

export default simulation((setUp) => {
  const httpProtocol = http
    .baseUrl("http://127.0.0.1:8080/api/v3")
    .acceptHeader("application/json")
    .contentTypeHeader("application/json");

  setUp(
    createPetScenario().injectOpen(rampUsers(10).during(5)),
    updatePetScenario().injectOpen(rampUsers(5).during(5)),
    findPetsByStatusScenario().injectOpen(rampUsers(20).during(5))
  ).protocols(httpProtocol);
});
