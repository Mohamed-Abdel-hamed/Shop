import { Iproduct } from "./iproduct";

export interface Iproductresponseadmin extends Iproduct {
   createdOn: string;
   updatedOn?:string;
   isDelete:boolean;
}
