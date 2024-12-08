import { APIRequestContext } from "@playwright/test";

import { Pet } from "../types/pet.types";
import { PetStatus } from "../enums/pet.enum";

export class PetApi {
  constructor(private request: APIRequestContext) {}

  async createPet(pet: Pet) {
    return await this.request.post("/api/v3/pet", { data: pet });
  }

  async updatePet(pet: Pet) {
    return await this.request.put("/api/v3/pet", { data: pet });
  }

  async updatePetWithFormData(
    petId: number,
    options?: { name?: string; status?: PetStatus }
  ) {
    const params = new URLSearchParams();

    if (options?.name) {
      params.append("name", options.name);
    }

    if (options?.status) {
      params.append("status", options.status);
    }

    const queryString = params.toString();
    return await this.request.put(`/pet/${petId}?${queryString}`);
  }
  async getPetById(petId: number) {
    return await this.request.get(`/api/v3/pet/${petId}`);
  }

  async getPetByStatus(petStatus: PetStatus) {
    return await this.request.get(
      `/api/v3/pet/findByStatus?status=${petStatus}`
    );
  }

  async getPetByTags(petTags: string[]) {
    const params = new URLSearchParams();
    petTags.forEach((petTag) => params.append("tags", petTag));
    return await this.request.get(
      `/api/v3/pet/findByTags?${params.toString()}`
    );
  }

  async deletePet(petId: number) {
    return await this.request.delete(`/api/v3/pet/${petId}`);
  }

  async uploadPetImage(
    petId: number,
    imageBuffer: Buffer,
    additionalMetadata?: string
  ) {
    const params = new URLSearchParams();

    if (additionalMetadata) {
      params.append("additionalMetadata", additionalMetadata);
    }

    return await this.request.post(
      `/pet/${petId}/uploadImage?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/octet-stream",
        },
        data: imageBuffer,
      }
    );
  }
}
