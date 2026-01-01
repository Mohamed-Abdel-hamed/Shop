import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Iproduct } from '../models/iproduct';
import { environment } from '../../environments/environment.prod';
import { Iproductresponseadmin } from '../models/iproductresponseadmin';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl=environment.baseUrl;
  constructor(private httpClient:HttpClient)
  {

  }
   getAllForAdmin():Observable<Iproductresponseadmin[]>
  {
    return this.httpClient.get<Iproductresponseadmin[]>(`${this.apiUrl}Products/admin`);
  }
  getAll():Observable<Iproduct[]>
  {
    return this.httpClient.get<Iproduct[]>(`${this.apiUrl}Products/customer`);
  }
  getById(id:number):Observable<Iproduct>
  {
    return this.httpClient.get<Iproduct>(`${this.apiUrl}Products/${id}`);
  }
  getStockOfProduct(id:number):Observable<number>
  {
     return this.httpClient.get<number>(`${this.apiUrl}Products/stock/${id}`);
  }

  add(formData: FormData):Observable<void>
  {
    return this.httpClient.post<void>(`${this.apiUrl}products`,formData);
  }
  update(id: number,formData: FormData):Observable<void>
  {
    return this.httpClient.put<void>(`${this.apiUrl}products/${id}`,formData);
  }
  toggleStatus(id:number):Observable<void>
  {
     return this.httpClient.put<void>(`${this.apiUrl}products/togglestatus/${id}`,{});
  }
}
