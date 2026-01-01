import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Icart } from '../models/icart';
import { ProductService } from './product.service';
import { Icartitem } from '../models/icartitem';
import { AuthService } from './auth-service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl=environment.baseUrl;
     items$ = new BehaviorSubject<Icartitem[]>([]);
  cartStockes: { [key: number]: number } = {};
  orderData$=new BehaviorSubject<object>({totalItem: 0, totalPrice: 0});
  constructor(private httpClient:HttpClient,private productService:ProductService
  ){}

  getCart():Observable<Icart>
  {
    return this.httpClient.get<Icart>(`${this.apiUrl}Cart`)
    ;
  }
loadCart()
  {
    this.getCart().subscribe({
        next:(res)=>{
          this.items$.next(res.items);
      this.orderData$.next({
        totalItems: res.totalItems,
        totalPrice: res.totalPrice
      });

      res.items.forEach(item=>{

       this.saveStockOfProduct(item.productId);
      });
    }
    })
  }
  addToCart(productId:number):Observable<void>
  {
    return this.httpClient.post<void>(`${this.apiUrl}Cart/add?productId=${productId}`,{});
  }

    increaseQuantity(cartItemId: number) {
    const item = this.items$.value.find(x => x.id === cartItemId);
    if (!item || this.isOutOfStock(item.productId, item.quantity)) return;

    this.httpClient.put(`${this.apiUrl}Cart/${cartItemId}/increase`, {}).subscribe(() => {
      item.quantity++;
      this.updateTotals();
    });
  }

    decreaseQuantity(cartItemId:number)
  {
    const item=this.items$.value.find(x=>x.id===cartItemId);
    if(!item) return;
    this.httpClient.put<void>(`${this.apiUrl}Cart/${cartItemId}/decrease`,{}).subscribe(()=>{
      item.quantity--;
      this.updateTotals();
    });
  }
removeItem(id: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.apiUrl}cart/item/${id}`).pipe(
    tap(() => {
      const updatedItems = this.items$.value.filter(x => x.id !== id);
      this.items$.next(updatedItems);

      this.updateTotals();
    })
  );
}

 saveStockOfProduct(productId:number)
  {
    this.productService.getStockOfProduct(productId).subscribe({
      next:(res)=>{
         this.cartStockes[productId]=res;
      }
    })
  }

    isOutOfStock(productId:number,qnt:number): boolean {
    const stock= this.cartStockes[productId] || 0;
    return stock - qnt <= 0;
  }

  hasSingleItem(productId:number):boolean
  {
   const item = this.items$.value.find(i => i.productId === productId);
   if(!item) return false;
  return item.quantity === 1;
  }
  private updateTotals() {
  const totalPrice = this.items$.value.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const totalItems = this.items$.value.reduce((sum, item) => sum + item.quantity, 0);
  this.orderData$.next({ totalItems, totalPrice });
}
}

