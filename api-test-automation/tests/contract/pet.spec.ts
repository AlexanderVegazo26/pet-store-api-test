import { apiErrorSchema, Pet, petSchema } from "@schemas/pet.schema";
import { PetApi } from "@api/pet-api";
import { PetStatus } from "@enums/pet.enum";
import { DataGenerator } from "@helpers/dataGenerator";
import { test, expect } from "@playwright/test";

test.describe("Pet Store API Contract Tests", () => {
  let petApi: PetApi;

  test.beforeEach(async ({ request }) => {
    petApi = new PetApi(request);
  });

  test(
    "create pet response should match schema",
    { tag: ["@contract"] },
    async () => {
      const response = await petApi.createPet(DataGenerator.pet());
      const responseBody = await response.json();

      expect(() => petSchema.parse(responseBody)).not.toThrow();
    }
  );

  test(
    "get pet by id response should match schema",
    { tag: ["@contract"] },
    async () => {
      const pet = await (await petApi.createPet(DataGenerator.pet())).json();
      const response = await petApi.getPetById(pet.id);
      const responseBody = await response.json();

      expect(() => petSchema.parse(responseBody)).not.toThrow();
    }
  );

  test(
    "get pets by status response should match array schema",
    { tag: ["@contract"] },
    async () => {
      const response = await petApi.getPetByStatus(PetStatus.AVAILABLE);
      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      if (responseBody.length > 0) {
        expect(() => petSchema.parse(responseBody[0])).not.toThrow();
      }
    }
  );

  test(
    "update pet response should match schema",
    { tag: ["@contract"] },
    async () => {
      const pet = await (await petApi.createPet(DataGenerator.pet())).json();
      const response = await petApi.updatePet({ ...pet, name: "Updated" });
      const responseBody = await response.json();

      expect(() => petSchema.parse(responseBody)).not.toThrow();
    }
  );

  test(
    "error response should match schema",
    { tag: ["@contract"] },
    async () => {
      const response = await petApi.createPet({} as Pet);
      const responseBody = await response.json();

      expect(() => apiErrorSchema.parse(responseBody)).not.toThrow();
    }
  );
});
