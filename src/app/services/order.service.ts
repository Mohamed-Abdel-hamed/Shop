import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import {  map, Observable } from 'rxjs';
import { IOrder } from '../models/iorder';
import { IPaginatedResponse } from '../models/ipaginated-response';
import { Iorderinfo } from '../models/dashboard/iorderinfo';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl=environment.baseUrl;
  constructor(private httpClient:HttpClient){}
  add()
  {
    this.httpClient.post<any>(`${this.apiUrl}orders/add`, {}).subscribe({
      next:(res)=>{

         window.open(res.url, "_blank");
      }
    });
  }
  success(orderId:number,sessionId:string):Observable<void>
  {
    return this.httpClient.get<void>(`${this.apiUrl}orders/success?orderId=${orderId}&sessionId=${sessionId}`);
  }
  cancel(orderId:number):Observable<void>
  {
    return this.httpClient.get<void>(`${this.apiUrl}orders/success?orderId=${orderId}`);
  }
  getAll(pageNumber?: number,
     pageSize?: number,
     searchValue?: string,
     SortColumn?: string,
     SortDirection?: string):Observable<IPaginatedResponse<IOrder>>
  {
    const params: any = {};
    if (pageNumber !== undefined) params.PageNumber = pageNumber;
    if (pageSize !== undefined) params.PageSize = pageSize;
   if (searchValue && searchValue.trim().length > 0) {
  params.SearchValue = searchValue;
}

    if (SortColumn !== undefined) params.SortColumn = SortColumn;
    if (SortDirection !== undefined) params.SortDirection = SortDirection;

    return this.httpClient.get<IPaginatedResponse<IOrder>>(`${this.apiUrl}orders/get-for-admin`, { params });
  }

  getOrdersInfo(): Observable<Iorderinfo> {
    const params: any = {};
    params.PageSize=10000000;
  return this.httpClient.get<IPaginatedResponse<IOrder>>(`${this.apiUrl}orders/get-for-admin`, { params }).pipe(
    map(res => ({
      ordersCount: res.items.length,
      ordersPendingCount: res.items.filter(o => o.status === 'Pending').length,
      ordersCompletedCount: res.items.filter(o => o.status === 'Completed').length,
      ordersCanceledCount: res.items.filter(o => o.status === 'Canceled').length,
productInfo: {

  totalQuantitySold : res.items
  .flatMap(o => o.orderItems)
  .reduce((sum, item) => sum + Number(item.quantity), 0)
}
    }))
  );
}

}
