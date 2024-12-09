import { OrderStatus } from "@enums/store.enum";

export interface Order {
  id: number;
  petId: number;
  quantity: number;
  shipDate?: string;
  status?: OrderStatus;
  complete?: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Customer {
  id: number;
  username: string;
  address: Address[];
}

export interface InventoryResponse {
  HashMap: {
    approved: number;
    placed: number;
    delivered: number;
  };
}
