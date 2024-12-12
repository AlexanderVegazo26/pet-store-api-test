// schemas/user.schema.ts
import { z } from "zod";
import { UserStatus } from "@enums/user.enum";

// Main user schema
export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string().optional(),
  userStatus: z.nativeEnum(UserStatus),
});

export const userListSchema = z.array(userSchema);

export const apiErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
});

export const createUserRequestSchema = userSchema.omit({ id: true });

export const updateUserRequestSchema = userSchema;

export const loginResponseSchema = z.object({
  code: z.number(),
  type: z.string(),
  message: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type UserList = z.infer<typeof userListSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
