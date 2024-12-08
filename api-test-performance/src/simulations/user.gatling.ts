import { simulation, rampUsers } from "@gatling.io/core";
import { loginScenario, logoutScenario } from "@scenarios/user/authentication.scenario";
import {
  createUserScenario,
  createUsersWithListScenario,
  getUserByUsernameScenario,
  updateUserScenario,
  deleteUserScenario
} from "@scenarios/user/userManagement.scenario";

import { http } from "@gatling.io/http";

export default simulation((setUp) => {
  const httpProtocol = http
    .baseUrl("http://127.0.0.1:8080/api/v3")
    .acceptHeader("application/json")
    .contentTypeHeader("application/json");

  setUp(
    createUserScenario().injectOpen(rampUsers(10).during(5)),
    createUsersWithListScenario().injectOpen(rampUsers(5).during(5)),
    getUserByUsernameScenario().injectOpen(rampUsers(20).during(5)),
    updateUserScenario().injectOpen(rampUsers(8).during(5)),
    deleteUserScenario().injectOpen(rampUsers(5).during(5)),
    loginScenario().injectOpen(rampUsers(25).during(5)),
    logoutScenario().injectOpen(rampUsers(15).during(5))
  ).protocols(httpProtocol);
});
