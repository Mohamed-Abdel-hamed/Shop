import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../../models/iorder';
import { OrderService } from '../../../services/order.service';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
ngOnInit(): void {
  throw new Error('Method not implemented.');
}
orders:IOrder[]=[];
}
