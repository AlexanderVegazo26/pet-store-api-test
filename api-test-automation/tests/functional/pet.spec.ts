import {
  categorySchema,
  Pet,
  petSchema,
  tagSchema,
  Tag,
} from "@schemas/pet.schema";
import { PetApi } from "@api/pet-api";
import { PetStatus } from "@enums/pet.enum";
import { DataGenerator } from "@helpers/dataGenerator";
import { test, expect } from "@playwright/test";
import { z } from "zod";

test.describe("Pet store API Tests", () => {
  let petApi: PetApi;

  test.beforeEach(async ({ request }) => {
    petApi = new PetApi(request);
  });

  test(
    "should create a new pet",
    { tag: ["@smoke", "@functional"] },
    async () => {
      const pet: Pet = DataGenerator.pet();
      const createPetResponse = await petApi.createPet(pet);

      expect(createPetResponse.status()).toBe(200); //bug: It should be 201 for post creation
      expect(await createPetResponse.json()).toMatchObject({
        id: pet.id,
        name: pet.name,
        category: pet.category,
        photoUrls: pet.photoUrls,
        tags: pet.tags,
        status: pet.status,
      });
    }
  );

  test(
    "should update an existing pet",
    { tag: ["@smoke", "@functional"] },
    async () => {
      const pet: Pet = DataGenerator.pet();
      await petApi.createPet(pet);

      const updatedPet: Pet = DataGenerator.pet({
        id: pet.id,
        status: PetStatus.SOLD,
      });

      const updateResponse = await petApi.updatePet(updatedPet);
      expect(updateResponse.status()).toBe(200);
      expect(await updateResponse.json()).toMatchObject({
        id: updatedPet.id,
        status: PetStatus.SOLD,
      });
    }
  );

  test(
    "should delete an existing pet",
    { tag: ["@smoke", "@functional"] },
    async () => {
      const pet: Pet = DataGenerator.pet();
      await petApi.createPet(pet);

      const deleteResponse = await petApi.deletePet(pet.id);
      expect(deleteResponse.status()).toBe(200);

      const getPetAfterDeleteResponse = await petApi.getPetById(pet.id);
      expect(getPetAfterDeleteResponse.status()).toBe(404);
    }
  );

  test(
    "should find pets by status",
    { tag: ["@smoke", "@functional"] },
    async () => {
      const pet: Pet = DataGenerator.pet();
      await petApi.createPet(pet);

      const getPetByStatusResponse = await petApi.getPetByStatus(
        PetStatus.AVAILABLE
      );
      expect(getPetByStatusResponse.status()).toBe(200);
      expect(await getPetByStatusResponse.json()).toContainEqual(
        expect.objectContaining({
          id: pet.id,
          status: PetStatus.AVAILABLE,
        })
      );
    }
  );

  test(
    "should handle invalid pet creation",
    { tag: ["@functional"] },
    async () => {
      const invalidPet = {} as Pet;
      const createResponse = await petApi.createPet(invalidPet);
      expect(createResponse.status()).toBe(500); //bug it should be a 400
    }
  );

  test("should upload pet image", { tag: ["@functional"] }, async () => {
    const pet: Pet = DataGenerator.pet();
    await petApi.createPet(pet);

    const imageBuffer = Buffer.from("fake-image-data");
    const uploadResponse = await petApi.uploadPetImage(pet.id, imageBuffer);
    expect(uploadResponse.status()).toBe(200);
  });

  test(
    "should fail when getting pet with invalid ID",
    { tag: ["@functional"] },
    async () => {
      const getPetResponse = await petApi.getPetById(-1);
      expect(getPetResponse.status()).toBe(404);
      expect(await getPetResponse.text()).toBe("Pet not found");
    }
  );
});
