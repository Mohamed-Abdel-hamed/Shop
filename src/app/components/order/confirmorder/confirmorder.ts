import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Apierrorservice } from '../../../services/apierrorservice';

@Component({
  selector: 'app-confirmorder',
  imports: [],
  templateUrl: './confirmorder.html',
  styleUrl: './confirmorder.css',
})
export class Confirmorder implements OnInit {
    successMesssage:string='';
  errorMesssage:string='';
  constructor(private acticeRoute:ActivatedRoute,
    private orderService:OrderService,private errorService:Apierrorservice)
  {

  }
 ngOnInit(): void {
  this.acticeRoute.queryParams.subscribe(params => {
    const orderId = Number(params['orderId']);
    const sessionId = params['sessionId'];

    if (!orderId || !sessionId) return;

    this.success(orderId, sessionId);
  });
}

  success(orderId:number,sessionId:string)
  {
    this.orderService.success(orderId,sessionId).subscribe({
      next:()=>{
        this.successMesssage="order success";
      },
      error:()=>{
        this.errorMesssage=this.errorService.getErrorsMessage();
      }
    });
  }


}
