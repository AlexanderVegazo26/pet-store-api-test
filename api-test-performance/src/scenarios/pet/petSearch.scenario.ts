import { scenario } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

export const findPetsByStatusScenario = () => {
  return scenario("Find Pets by Status")
    .exec(
      http("Get pets by status")
        .get("/pet/findByStatus")
        .queryParam("status", "available")
        .check(status().is(200))
    )
    .pause(1);
};
