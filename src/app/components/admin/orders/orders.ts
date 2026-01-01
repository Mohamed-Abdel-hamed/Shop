import { Component } from '@angular/core';
import { IOrder } from '../../../models/iorder';
import { OrderService } from '../../../services/order.service';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { environment } from '../../../../environments/environment.prod';
import { Pagination } from "../../../shared/components/pagination/pagination";
import { SearchBar } from "../../../shared/components/search-bar/search-bar";

@Component({
  selector: 'app-orders',
  imports: [DatePipe, NgClass, CurrencyPipe, Pagination, SearchBar],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders {
  hostImage=environment.hostImage;
orders:IOrder[]=[];
allOrders:IOrder[]=[];
totalPages = 0;
pageNumber = 1;
hasNextPage = false;
hasPreviousPage = false;
searchValue = '';
  constructor(private orderService:OrderService) {}
  ngOnInit(): void {
this.getOrders()
  }
  getOrders(page: number = 1){
    this.orderService.getAll(page,2,this.searchValue).subscribe({
      next:(res)=>{
         this.orders = res.items;
    this.allOrders = res.items;
      this.pageNumber = res.pageNumber;
      this.totalPages = res.totalPages;
      this.hasNextPage = res.hasNextPage;
      this.hasPreviousPage = res.hasPreviousPage;
      }
    });
  }
  search(searchValue: string) {

  const q = searchValue?.trim().toLowerCase();

  if (!q) {
    this.orders = this.allOrders;
    return;
  }
  this.orders = this.allOrders.filter(o =>
    o.paymentStatus?.toLowerCase().match(q) ||
    o.customerId?.toString().includes(q) ||
    o.orderItems?.some(i =>
      i.productName?.toLowerCase().includes(q)
    )
  );
}
onSearchChanged(value: string) {
  this.searchValue = value.trim();
  this.pageNumber = 1;
  this.getOrders();
}

}
