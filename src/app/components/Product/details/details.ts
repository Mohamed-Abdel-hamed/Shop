import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../../models/iproduct';
import { environment } from '../../../../environments/environment.prod';
import { map } from 'rxjs';
import { CurrencyPipe, NgClass } from '@angular/common';
import { AddToCartButton } from "../../../shared/components/add-to-cart-button/add-to-cart-button";

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, NgClass, AddToCartButton],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  hostImage=environment.hostImage
  id!:number
  product:Iproduct|null=null;
constructor(private productService:ProductService,private route:ActivatedRoute){}
  ngOnInit(): void {

    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(this.id)
    .subscribe({
      next:(res)=>{
        this.product=res;
      }
    })
  }

}
