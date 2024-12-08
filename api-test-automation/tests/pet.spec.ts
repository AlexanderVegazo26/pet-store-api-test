import { test, expect } from "@playwright/test";
import { PetApi } from "../src/api/petApi";
import { DataGenerator } from "../src/helpers/dataGenerator";
import { Pet } from "../src/types/pet.types";
import { XMLParser } from "fast-xml-parser";
import { XmlHelper } from "../src/helpers/xmlhelper";

test.describe("Pet store API Tests", () => {
  let petApi: PetApi;

  test.beforeEach(async ({ request }) => {
    petApi = new PetApi(request);
  });

  test("should create a new pet", async () => {
    const newPet: Pet = DataGenerator.generatePet();
    const response = await petApi.createPet(newPet);

    expect(response.status()).toBe(200);
    const parsedXmlResponse = await XmlHelper.parseXmlResponse<{ Pet: Pet }>(
      response
    );

    expect(parsedXmlResponse.Pet).toMatchObject({
      id: newPet.id,
      name: newPet.name,
      category: {
        id: newPet.category?.id,
        name: newPet.category?.name,
      },
      photoUrls: {
        photoUrl: newPet.photoUrls[0],
      },
      tags: {
        tag: {
          id: newPet.tags?.[0].id,
          name: newPet.tags?.[0].name,
        },
      },
      status: newPet.status,
    });
  });
});
