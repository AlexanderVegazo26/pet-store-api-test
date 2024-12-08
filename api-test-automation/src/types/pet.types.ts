import { PetStatus } from "../enums/pet.enum";

export interface Pet {
  id?: number;
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
