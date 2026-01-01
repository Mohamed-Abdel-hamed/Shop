import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Apierrorservice } from '../../../services/apierrorservice';

@Component({
  selector: 'app-cancelorder',
  imports: [],
  templateUrl: './cancelorder.html',
  styleUrl: './cancelorder.css',
})
export class Cancelorder implements OnInit {
      successMesssage:string='';
  errorMesssage:string='';
 constructor(private acticeRoute:ActivatedRoute,
    private orderService:OrderService,private errorService:Apierrorservice)
  {}
 ngOnInit(): void {
  this.acticeRoute.queryParams.subscribe(params => {
    const orderId = Number(params['orderId']);

    if (!orderId ) return;

    this.cancel(orderId);
  });
}

  cancel(orderId:number)
  {
    this.orderService.cancel(orderId).subscribe({
      next:()=>{
        this.successMesssage="order has problem !";
      },
      error:()=>{
        this.errorMesssage=this.errorService.getErrorsMessage();
      }
    });
  }
}
