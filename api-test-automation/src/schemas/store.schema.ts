// schemas/store.schema.ts
import { z } from "zod";
import { OrderStatus } from "@enums/store.enum";

// Base schemas
export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

export const customerSchema = z.object({
  id: z.number(),
  username: z.string(),
  address: z.array(addressSchema),
});

export const orderSchema = z.object({
  id: z.number(),
  petId: z.number(),
  quantity: z.number(),
  shipDate: z.date().optional(),
  status: z.nativeEnum(OrderStatus).optional(),
  complete: z.boolean().optional(),
});

export const inventoryResponseSchema = z.object({
  inventory: z.object({
    approved: z.number(),
    placed: z.number(),
    delivered: z.number(),
  }),
});

// Response schemas for different endpoints
export const orderListSchema = z.array(orderSchema);

export const apiErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
});

// Request schemas
export const createOrderRequestSchema = orderSchema.omit({ id: true });

export const updateOrderRequestSchema = orderSchema;

// Type exports
export type Address = z.infer<typeof addressSchema>;
export type Customer = z.infer<typeof customerSchema>;
export type Order = z.infer<typeof orderSchema>;
export type OrderList = z.infer<typeof orderListSchema>;
export type InventoryResponse = z.infer<typeof inventoryResponseSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
export type CreateOrderRequest = z.infer<typeof createOrderRequestSchema>;
export type UpdateOrderRequest = z.infer<typeof updateOrderRequestSchema>;
