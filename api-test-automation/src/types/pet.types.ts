import { PetStatus } from "../enums/pet.enum";

export interface Pet {
  id: number;
  name: string;
  category?: Category;
  photoUrls: string[];
  tags?: tag[];
  status?: PetStatus;
}

export interface Category {
  id: number;
  name: string;
}

export interface tag {
  id: number;
  name: string;
}


export interface PetListResponse {
  ArrayList: {
    item: Pet[];
  };
}

export interface ApiError {
  code: number;
  message: string;
}

export interface ApiErrorResponse {
  ApiError: ApiError;
}
