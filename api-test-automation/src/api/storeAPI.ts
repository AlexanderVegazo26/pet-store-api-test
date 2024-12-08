import { APIRequestContext } from "@playwright/test";
import { Order } from "../types/store.types";

export class StoreApi {
  constructor(private request: APIRequestContext) {}

  async getInventory() {
    return await this.request.get("/api/v3/store/inventory");
  }

  async createOrder(order: Order) {
    return await this.request.post("/api/v3/store/order", {
      data: order,
    });
  }

  async getOrderById(orderId: number) {
    return await this.request.get(`/api/v3/store/order/${orderId}`);
  }

  async deleteOrder(orderId: number) {
    return await this.request.delete(`/api/v3/store/order/${orderId}`);
  }
}
