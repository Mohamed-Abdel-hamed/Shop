import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../../models/iproduct';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth-service';
import { CurrencyPipe } from '@angular/common';
import { environment } from '../../../../environments/environment.prod';
import { AddToCartButton } from "../../../shared/components/add-to-cart-button/add-to-cart-button";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, AddToCartButton, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
hostImage=environment.hostImage;
products:Iproduct[]=[];

  cartQuantities: { [key: number]: number } = {};

constructor(private productService:ProductService,
  private cartService:CartService,
  private authService:AuthService){}

ngOnInit(): void {

  this.loadProducts();
  this.loadCartQuantities();

}

loadProducts()
{
this.productService.getAll().subscribe({
  next:(res)=>{
this.products=res
  }
});
}


checkQuantity(isSuccessful:boolean)
{
  if (isSuccessful) {
      this.loadCartQuantities();
      }

}

loadCartQuantities()
{
   if (this.authService.isAuthenticated()) {
      this.cartService.getCart().subscribe({

    next:(res)=>{
 this.cartQuantities = {};
res.items.forEach(cartItem=>{

this.cartQuantities[cartItem.productId]=cartItem.quantity

});

    }

  });
   }
else{
  return;
}

}
  isOutOfStock(product: Iproduct): boolean {
    this.cartService.isOutOfStock
    const alreadyInCart = this.cartQuantities[product.id] || 0;
    return product.stock - alreadyInCart <= 0;
  }

}
