import { IOrderItem } from "./iorder-item";

export interface IOrder {
  id: number;
  customerId: number;
  orderDate: string;
  status: string;
  totalPrice: number;
  paymentStatus: string;
  paymentDate: string | null;
  sessionId: string | null;
  paymentIntentId: string | null;
  orderItems: IOrderItem[];
}
