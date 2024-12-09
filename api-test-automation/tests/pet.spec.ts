import { Pet, PetListResponse } from "@/types/pet.types";
import { PetApi } from "@api/pet-api";
import { PetStatus } from "@enums/pet.enum";
import { DataGenerator } from "@helpers/dataGenerator";
import { XmlHelper } from "@helpers/xmlhelper";
import { test, expect } from "@playwright/test";

test.describe("Pet store API Tests", () => {
  let petApi: PetApi;

  test.beforeEach(async ({ request }) => {
    petApi = new PetApi(request);
  });

  test(
    "should create a new pet",
    {
      tag: ["@smoke"],
    },
    async () => {
      const pet: Pet = DataGenerator.generatePet();
      const createPetResponse = await petApi.createPet(pet);

      expect(createPetResponse.status()).toBe(200); //bug: It should be 201 for post creation
      const createPetResponseParsed = (
        await XmlHelper.parseXmlResponse<{
          Pet: Pet;
        }>(createPetResponse)
      ).Pet;

      expect(createPetResponseParsed).toMatchObject({
        id: pet.id,
        name: pet.name,
        category: {
          id: pet.category?.id,
          name: pet.category?.name,
        },
        photoUrls: {
          photoUrl: pet.photoUrls[0],
        },
        tags: {
          tag: {
            id: pet.tags?.[0].id,
            name: pet.tags?.[0].name,
          },
        },
        status: pet.status,
      });
    }
  );

  test(
    "should update an existing pet",
    {
      tag: ["@smoke"],
    },
    async () => {
      const pet: Pet = DataGenerator.generatePet();
      await petApi.createPet(pet);

      const updatedPet: Pet = {
        ...pet,
        name: "Updated " + pet.name,
        status: PetStatus.SOLD,
      };

      const updateResponse = await petApi.updatePet(updatedPet);
      expect(updateResponse.status()).toBe(200);

      const getPetResponse = await petApi.getPetById(pet.id);
      const getPetResponseParsed = (
        await XmlHelper.parseXmlResponse<{
          Pet: Pet;
        }>(getPetResponse)
      ).Pet;

      expect(getPetResponseParsed).toMatchObject({
        id: updatedPet.id,
        name: updatedPet.name,
        status: updatedPet.status,
      });
    }
  );

  test(
    "should delete an existing pet",
    {
      tag: ["@smoke"],
    },
    async () => {
      const pet: Pet = DataGenerator.generatePet();
      await petApi.createPet(pet);

      const deleteResponse = await petApi.deletePet(pet.id);
      expect(deleteResponse.status()).toBe(200);

      const getPetAfterDeleteResponse = await petApi.getPetById(pet.id);
      expect(getPetAfterDeleteResponse.status()).toBe(404);
    }
  );

  test(
    "should find pets by status",
    {
      tag: ["@smoke"],
    },
    async () => {
      const pet: Pet = DataGenerator.generatePet();
      await petApi.createPet(pet);

      const getPetByStatusResponse = await petApi.getPetByStatus(
        PetStatus.AVAILABLE
      );
      expect(getPetByStatusResponse.status()).toBe(200);

      const getPetByStatusResponseParsed = (
        await XmlHelper.parseXmlResponse<PetListResponse>(
          getPetByStatusResponse
        )
      ).ArrayList.item;

      expect(getPetByStatusResponseParsed).toContainEqual(
        expect.objectContaining({
          id: pet.id,
          status: PetStatus.AVAILABLE,
        })
      );
    }
  );

  test("should handle invalid pet creation", async () => {
    const invalidPet = {} as Pet;
    const createResponse = await petApi.createPet(invalidPet);
    expect(createResponse.status()).toBe(500); //bug it should be a 400
  });

  test("should upload pet image", async () => {
    const pet: Pet = DataGenerator.generatePet();
    await petApi.createPet(pet);

    const imageBuffer = Buffer.from("fake-image-data");
    const uploadResponse = await petApi.uploadPetImage(pet.id, imageBuffer);

    expect(uploadResponse.status()).toBe(200);
  });

  test("should fail when getting pet with invalid ID", async () => {
    const invalidPetId = 998952;
    const getPetResponse = await petApi.getPetById(invalidPetId);

    expect(getPetResponse.status()).toBe(404);
  });
});
