import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [],
  templateUrl: './add-to-cart-button.html',
  styleUrl: './add-to-cart-button.css',
})
export class AddToCartButton {
  @Input() productId!: number;
  @Input() isOutOfStock!: boolean;
  @Output()add=new EventEmitter<boolean>();
  isSuccessful=false;
  constructor(private cartService:CartService) {}
 addToCart(){
  this.cartService.addToCart(this.productId).subscribe({
    next: () => {
      this.isSuccessful = true;
      this.add.emit(this.isSuccessful);
 },
    error: () => {
      this.isSuccessful = false;
      this.add.emit(this.isSuccessful);
    }

});
 }
}
