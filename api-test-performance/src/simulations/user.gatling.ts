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
import { getEnvVar } from "@utils/config/environment";

export default simulation((setUp) => {
  const httpProtocol = http
    .baseUrl("http://127.0.0.1:8080/api/v3")
    .acceptHeader("application/json")
    .contentTypeHeader("application/json");

  const userRampDuration = getEnvVar("USER_RAMP_DURATION", "5");
  const createUsers = getEnvVar("CREATE_USERS", "10");
  const readUsers = getEnvVar("READ_USERS", "20");
  const updateUsers = getEnvVar("UPDATE_USERS", "8");
  const deleteUsers = getEnvVar("DELETE_USERS", "5");
  const authUsers = getEnvVar("AUTH_USERS", "25");

  setUp(
    createUserScenario().injectOpen(rampUsers(createUsers).during(userRampDuration)),
    createUsersWithListScenario().injectOpen(rampUsers(createUsers).during(userRampDuration)),
    getUserByUsernameScenario().injectOpen(rampUsers(readUsers).during(userRampDuration)),
    updateUserScenario().injectOpen(rampUsers(updateUsers).during(userRampDuration)),
    deleteUserScenario().injectOpen(rampUsers(deleteUsers).during(userRampDuration)),
    loginScenario().injectOpen(rampUsers(authUsers).during(userRampDuration)),
    logoutScenario().injectOpen(rampUsers(authUsers).during(userRampDuration))
  ).protocols(httpProtocol);
});
