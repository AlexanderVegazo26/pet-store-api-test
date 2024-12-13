import { z } from "zod";
import { PetStatus } from "@enums/pet.enum";


export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const petSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: categorySchema.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(tagSchema).optional(),
  status: z.nativeEnum(PetStatus).optional(),
});


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

export const createPetResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: petSchema,
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema,
  }),
]);

export const updatePetResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: petSchema,
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema,
  }),
]);

export const deletePetResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    message: z.string(),
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema,
  }),
]);

export const getPetByIdResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: petSchema,
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema,
  }),
]);

export const getPetListResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: z.array(petSchema),
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema,
  }),
]);

export const uploadPetImageResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: imageUploadResponseSchema,
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema,
  }),
]);

export type Category = z.infer<typeof categorySchema>;
export type Tag = z.infer<typeof tagSchema>;
export type Pet = z.infer<typeof petSchema>;
export type PetList = z.infer<typeof petListSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
export type ImageUploadResponse = z.infer<typeof imageUploadResponseSchema>;
export type CreatePetResponse = z.infer<typeof createPetResponseSchema>;
export type UpdatePetResponse = z.infer<typeof updatePetResponseSchema>;
export type DeletePetResponse = z.infer<typeof deletePetResponseSchema>;
export type GetPetByIdResponse = z.infer<typeof getPetByIdResponseSchema>;
export type GetPetListResponse = z.infer<typeof getPetListResponseSchema>;
export type UploadPetImageResponse = z.infer<
  typeof uploadPetImageResponseSchema
>;
