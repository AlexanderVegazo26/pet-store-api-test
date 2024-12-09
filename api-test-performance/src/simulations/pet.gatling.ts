import { simulation, rampUsers } from "@gatling.io/core";
import { http } from "@gatling.io/http";
import { getEnvVar } from "@utils/config/environment";
import { findPetsByStatusScenario } from "@scenarios/pet/petSearch.scenario";
import { createPetScenario, updatePetScenario } from "@scenarios/pet/petManagement.scenario";

export default simulation((setUp) => {
  const httpProtocol = http
    .baseUrl("http://127.0.0.1:8080/api/v3")
    .acceptHeader("application/json")
    .contentTypeHeader("application/json");

  const petRampDuration = getEnvVar("PET_RAMP_DURATION", "5");
  const createPets = getEnvVar("CREATE_PETS", "10");
  const readPets = getEnvVar("READ_PETS", "20");

  setUp(
    createPetScenario().injectOpen(rampUsers(createPets).during(petRampDuration)),
    updatePetScenario().injectOpen(rampUsers(readPets).during(petRampDuration)),
    findPetsByStatusScenario().injectOpen(rampUsers(readPets).during(petRampDuration))
  ).protocols(httpProtocol);
});
