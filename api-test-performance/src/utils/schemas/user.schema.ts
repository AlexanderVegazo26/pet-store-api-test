import { z } from "zod";
import { UserStatus } from "@enums/user.enum";


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


export const apiErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
});

export const createUserRequestSchema = userSchema.omit({ id: true });
export const updateUserRequestSchema = userSchema;
export const loginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});


export const createUserResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: userSchema,
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema,
  }),
]);

export const getUserByUsernameResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: userSchema,
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema,
  }),
]);

export const updateUserResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: userSchema,
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema,
  }),
]);

export const deleteUserResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    message: z.string(),
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema,
  }),
]);

export const loginResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: z.object({
      code: z.number(),
      type: z.string(),
      message: z.string(),
    }),
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema,
  }),
]);

export const logoutResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    message: z.string(),
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema,
  }),
]);


export type User = z.infer<typeof userSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
export type GetUserResponse = z.infer<typeof getUserByUsernameResponseSchema>;
export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>;
export type DeleteUserResponse = z.infer<typeof deleteUserResponseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type LogoutResponse = z.infer<typeof logoutResponseSchema>;
