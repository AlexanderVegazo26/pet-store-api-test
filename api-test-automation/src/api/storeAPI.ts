
import { Order } from "@/types/store.types";
import { APIRequestContext, APIResponse } from "@playwright/test";

export class StoreApi {
  constructor(private request: APIRequestContext) {}

  async getInventory(): Promise<APIResponse> {
    return await this.request.get("/api/v3/store/inventory");
  }

  async createOrder(order: Order): Promise<APIResponse> {
    return await this.request.post("/api/v3/store/order", {
      data: order,
    });
  }

  async getOrderById(orderId: number): Promise<APIResponse> {
    return await this.request.get(`/api/v3/store/order/${orderId}`);
  }

  async deleteOrder(orderId: number): Promise<APIResponse> {
    return await this.request.delete(`/api/v3/store/order/${orderId}`);
  }
}
