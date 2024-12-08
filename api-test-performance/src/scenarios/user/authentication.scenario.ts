import { scenario, exec } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

export const loginScenario = () => {
  return scenario("User Login")
    .exec(
      http("Login user")
        .get("/user/login")
        .queryParam("username", "${username}")
        .queryParam("password", "${password}")
        .check(status().is(200))
    )
    .pause(1);
};

export const logoutScenario = () => {
  return scenario("User Logout")
    .exec(http("Logout user").get("/user/logout").check(status().is(200)))
    .pause(1);
};
