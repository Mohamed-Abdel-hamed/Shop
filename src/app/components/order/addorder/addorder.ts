import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-addorder',
  imports: [],
  templateUrl: './addorder.html',
  styleUrl: './addorder.css',
})
export class Addorder implements OnInit {
constructor(private orderService:OrderService,private router:Router
)
{}
  ngOnInit(): void {
      this.orderService.add();
      this.router.navigateByUrl('/order/confirmorder');
  }
}
