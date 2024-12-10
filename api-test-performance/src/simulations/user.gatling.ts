import { simulation, rampUsers } from "@gatling.io/core";
import { loginScenario, logoutScenario } from "@scenarios/user/authentication.scenario";
import {
  createUserScenario,
  createUsersWithListScenario,
  getUserByUsernameScenario,
  updateUserScenario,
  deleteUserScenario
} from "@scenarios/user/userManagement.scenario";

import { getEnvVar } from "@utils/config/environment";
import { httpProtocol } from "@utils/config/setHttpProtocol";

export default simulation((setUp) => {
  const userRampDuration = getEnvVar("USER_RAMP_DURATION", "100");
  const createUsers = getEnvVar("CREATE_USERS", "100");
  const readUsers = getEnvVar("READ_USERS", "100");
  const updateUsers = getEnvVar("UPDATE_USERS", "100");
  const deleteUsers = getEnvVar("DELETE_USERS", "100");
  const authUsers = getEnvVar("AUTH_USERS", "100");

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
