import { PetStatus } from "@enums/pet.enum";

export interface Pet {
  id: number;
  name: string;
  category?: Category;
  photoUrls: string[];
  tags?: Tag[];
  status?: PetStatus;
}

export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface PetListResponse {
  pets: Pet[];
}

export interface ApiError {
  code: number;
  message: string;
}

export interface ApiErrorResponse {
  error: ApiError;
}
