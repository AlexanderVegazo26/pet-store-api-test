import { OrderStatus } from "@enums/store.enum";
import { z } from "zod";

// Base schemas
export const orderSchema = z.object({
  id: z.number(),
  petId: z.number(),
  quantity: z.number(),
  shipDate: z.string().optional(),
  status: z.nativeEnum(OrderStatus),
  complete: z.boolean().optional()
});

export const inventorySchema = z.record(z.string(), z.number());

export const apiErrorSchema = z.object({
  code: z.number(),
  message: z.string()
});

export const createOrderRequestSchema = orderSchema.omit({ id: true });
export const updateOrderRequestSchema = orderSchema;

export const createOrderResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: orderSchema
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema
  })
]);

export const getOrderByIdResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: orderSchema
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema
  })
]);

export const deleteOrderResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    message: z.string()
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema
  })
]);

export const getInventoryResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    data: inventorySchema
  }),
  z.object({
    success: z.literal(false),
    error: apiErrorSchema
  })
]);

export type Order = z.infer<typeof orderSchema>;
export type Inventory = z.infer<typeof inventorySchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
export type CreateOrderResponse = z.infer<typeof createOrderResponseSchema>;
export type GetOrderByIdResponse = z.infer<typeof getOrderByIdResponseSchema>;
export type DeleteOrderResponse = z.infer<typeof deleteOrderResponseSchema>;
export type GetInventoryResponse = z.infer<typeof getInventoryResponseSchema>;
