import { scenario, StringBody } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

import { DataGenerator } from "@helpers/dataGenerator";

export const createPetScenario = () => {
  const pet = DataGenerator.pet();

  return scenario("Create Pet")
    .exec(
      http("Add new pet to store")
        .post("/pet")
        .body(StringBody(JSON.stringify(pet)))
        .check(status().is(200))
    )
    .pause(1);
};

export const updatePetScenario = () => {
  const pet = DataGenerator.pet();

  return scenario("Update Pet")
    .exec(
      http("Update existing pet")
        .put("/pet")
        .body(StringBody(JSON.stringify({ ...pet, id: 1 })))
        .check(status().is(200))
    )
    .pause(1);
};
