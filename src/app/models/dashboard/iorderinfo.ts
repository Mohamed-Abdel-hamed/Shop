import { Iproductinfo } from "./iproductinfo";

export interface Iorderinfo {
ordersCount:number;
ordersPendingCount:number;
ordersCompletedCount:number;
ordersCanceledCount:number;
productInfo:Iproductinfo
}
