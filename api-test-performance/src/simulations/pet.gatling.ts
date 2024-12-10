import { simulation, rampUsers } from "@gatling.io/core";

import { getEnvVar } from "@utils/config/environment";
import { findPetsByStatusScenario } from "@scenarios/pet/petSearch.scenario";
import { createPetScenario, updatePetScenario } from "@scenarios/pet/petManagement.scenario";
import { httpProtocol } from "@utils/config/setHttpProtocol";

export default simulation((setUp) => {
  const petRampDuration = getEnvVar("PET_RAMP_DURATION", "5");
  const createPets = getEnvVar("CREATE_PETS", "10");
  const readPets = getEnvVar("READ_PETS", "20");

  setUp(
    createPetScenario().injectOpen(rampUsers(createPets).during(petRampDuration)),
    updatePetScenario().injectOpen(rampUsers(readPets).during(petRampDuration)),
    findPetsByStatusScenario().injectOpen(rampUsers(readPets).during(petRampDuration))
  ).protocols(httpProtocol);
});
