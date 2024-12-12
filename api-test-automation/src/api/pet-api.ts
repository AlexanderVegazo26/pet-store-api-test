import { PetStatus } from "@enums/pet.enum";
import { APIRequestContext, APIResponse } from "@playwright/test";
import { Pet } from "@schemas/pet.schema";

export class PetApi {
  constructor(private request: APIRequestContext) {}

  async createPet(pet: Partial<Pet>): Promise<APIResponse> {
    return await this.request.post("/api/v3/pet", { data: pet });
  }

  async updatePet(pet: Partial<Pet>): Promise<APIResponse> {
    return await this.request.put("/api/v3/pet", { data: pet });
  }

  async updatePetWithFormData(
    petId: number,
    options?: { name?: string; status?: PetStatus }
  ): Promise<APIResponse> {
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
  async getPetById(petId: number): Promise<APIResponse> {
    return await this.request.get(`/api/v3/pet/${petId}`);
  }

  async getPetByStatus(petStatus: PetStatus): Promise<APIResponse> {
    return await this.request.get(
      `/api/v3/pet/findByStatus?status=${petStatus}`
    );
  }

  async getPetByTags(petTags: string[]): Promise<APIResponse> {
    const params = new URLSearchParams();
    petTags.forEach((petTag) => params.append("tags", petTag));
    return await this.request.get(
      `/api/v3/pet/findByTags?${params.toString()}`
    );
  }

  async deletePet(petId: number, apiKey?: string): Promise<APIResponse> {
    const headers: Record<string, string> = {};

    if (apiKey) {
      headers["api_key"] = apiKey;
    }

    return await this.request.delete(`/api/v3/pet/${petId}`, {
      headers,
    });
  }

  async uploadPetImage(
    petId: number,
    imageBuffer: Buffer,
    additionalMetadata?: string
  ): Promise<APIResponse> {
    const params = new URLSearchParams();

    if (additionalMetadata) {
      params.append("additionalMetadata", additionalMetadata);
    }

    return await this.request.post(
      `/api/v3/pet/${petId}/uploadImage?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/octet-stream",
        },
        data: imageBuffer,
      }
    );
  }
}
