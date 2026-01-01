import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Icategory } from '../models/icategory';
import { Chartresponse } from '../models/dashboard/chartresponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.baseUrl;
  constructor(private httpClient:HttpClient ) {}

  getAll():Observable<Icategory[]>
  {
    return this.httpClient.get<Icategory[]>(`${this.apiUrl}Categories`);
  }
  get(id:number):Observable<Icategory>
  {
    return this.httpClient.get<Icategory>(`${this.apiUrl}categories/${id}`);
  }
add(name:string):Observable<void>
{
  return this.httpClient.post<void>(`${this.apiUrl}categories`,name)
}
update(name:string):Observable<void>
{
  return this.httpClient.put<void>(`${this.apiUrl}categories`,name)
}
toggleStatus(id:number):Observable<void>
{
  return this.httpClient.put<void>(`${this.apiUrl}categories/togglestatus/${id}`,{})
}
getCategoryCount():Observable<Chartresponse[]>
{
  return this.httpClient.get<Chartresponse[]>(`${this.apiUrl}Dashboard/categories`);
}
}
