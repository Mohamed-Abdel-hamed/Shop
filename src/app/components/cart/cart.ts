import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Icartitem } from '../../models/icartitem';
import { environment } from '../../../environments/environment.prod';
import { Modal } from "../../shared/components/modal/modal";
import { RouterLink } from "@angular/router";
import Swal from 'sweetalert2';
import { Apierrorservice } from '../../services/apierrorservice';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-cart',
  imports: [Modal, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  @ViewChild(Modal) Modal!: Modal;
  public hostImage=environment.hostImage;
  items:Icartitem[]=[];
  totalPrice:number=0;
  totalItem:number=0;
  hasStock=false;
  selectedItemId!: number;
constructor(private cartservice:CartService,
  private errorService:Apierrorservice,
private orderService:OrderService){}
  ngOnInit(): void {

    this.cartservice.loadCart();

    this.cartservice.items$.subscribe(items=>{
     this.items=items;
    });

    this.cartservice.orderData$.subscribe(o=>{
       const data = o as { totalItems: number; totalPrice: number };
       this.totalItem=data.totalItems;
       this.totalPrice=data.totalPrice;
    });
 }

increase(id:number)
{
this.cartservice.increaseQuantity(id);
}

decrease(id:number)
{
  this.cartservice.decreaseQuantity(id);

}
removeItem(id:number)
{

  this.cartservice.removeItem(id).subscribe({
    next:()=>{
       Swal.fire({
      title: "Deleted!",
      text: "Your item has been deleted.",
      icon: "success"
    });
    },
    error:()=>{
       Swal.fire({
      title: "Error" ,
      text: this.errorService.getErrorsMessage(),
      icon: "error"
    });
    }
  });
}

  isOutOfStock(productId:number,qnt:number):boolean {
   return this.cartservice.isOutOfStock(productId,qnt);
  }
 hasSingleItem(productId:number):boolean {
    return this.cartservice.hasSingleItem(productId);
  }
  open(id:number)
  {
    this.selectedItemId=id;
this.Modal.open();
  }
  checkout()
  {
     this.orderService.add();
  }
}
