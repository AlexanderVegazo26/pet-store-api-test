// schemas/pet.schema.ts
import { z } from "zod";
import { PetStatus } from "@enums/pet.enum";

// Base schemas
export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Main pet schema
export const petSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: categorySchema.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(tagSchema).optional(),
  status: z.nativeEnum(PetStatus),
});

// Response schemas for different endpoints
export const petListSchema = z.array(petSchema);

export const apiErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
});

export const imageUploadResponseSchema = z.object({
  code: z.number(),
  type: z.string(),
  message: z.string(),
});

export const createPetRequestSchema = petSchema.omit({ id: true });

export const updatePetRequestSchema = petSchema;

export const findByStatusRequestSchema = z.object({
  status: z.nativeEnum(PetStatus),
});

export type Category = z.infer<typeof categorySchema>;
export type Tag = z.infer<typeof tagSchema>;
export type Pet = z.infer<typeof petSchema>;
export type PetList = z.infer<typeof petListSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
export type ImageUploadResponse = z.infer<typeof imageUploadResponseSchema>;
