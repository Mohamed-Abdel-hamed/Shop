import { Icartitem } from "./icartitem";

export interface Icart {
    id: number;
  totalPrice: number;
  totalItems: number;
  items: Icartitem[];
}
