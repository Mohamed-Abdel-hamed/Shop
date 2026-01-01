import { Component, model, NgModule, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ProductService } from '../../../../services/product.service';
import { Apierrorservice } from '../../../../services/apierrorservice';
import { Iproductresponseadmin } from '../../../../models/iproductresponseadmin';
import { environment } from '../../../../../environments/environment.prod';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBar } from "../../../../shared/components/search-bar/search-bar";
import { NgxPaginationModule } from 'ngx-pagination';
import { Modal } from '../../../../shared/components/modal/modal';
import Swal from 'sweetalert2';
import { Iproduct } from '../../../../models/iproduct';


@Component({
  selector: 'app-products',
  imports: [RouterLink, NgClass, FormsModule, SearchBar, NgxPaginationModule, Modal],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  hostImage=environment.hostImage;
  errorMessage:string='';
  value:any;
  products:Iproductresponseadmin[]=[];
  allProducts:Iproductresponseadmin[]=[];
  isArrowChange=false;
  sortField :keyof Iproductresponseadmin|null =null
    p: number = 1;
     @ViewChild(Modal) Modal!: Modal;
selectedItemId!: number;
isExist!:boolean;
productId!: number;
product:Iproduct|null=null;
constructor(private productService:ProductService,
  private errorService:Apierrorservice)
{}
  ngOnInit(): void {
this.LoadProducts();
  }
  LoadProducts()
  {
    this.productService.getAllForAdmin().subscribe({
      next:(res)=>{
        this.allProducts=res;
        this.products=this.allProducts;
      },
      error:()=>{
        this.errorMessage=this.errorService
        .getErrorsMessage();
      }

    })
  }
  search(searchValue:string)
  {
    searchValue=searchValue.trim().toLowerCase();
    if(!searchValue||searchValue === '')
    {
      this.products=this.allProducts;
      return;
    }
   this.products=this.allProducts.filter(p=>p.name.toLowerCase().includes(searchValue.toLowerCase()) ||

      p.updatedOn?.toLowerCase().includes(searchValue.toLowerCase())
    );

  }
sort(field: keyof Iproductresponseadmin) {

  if (this.sortField === field) {
    this.isArrowChange = !this.isArrowChange;
  } else {
    this.isArrowChange = true;
  }

  this.sortField = field;

  this.products.sort((a, b) => {
    let valueA: any = a[field];
    let valueB: any = b[field];


    if (valueA == null) valueA = 0;
    if (valueB == null) valueB = 0;


    if (field === 'createdOn') {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    }


    if (typeof valueA === 'string') valueA = valueA.toLowerCase();
    if (typeof valueB === 'string') valueB = valueB.toLowerCase();

    if (this.isArrowChange) {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    }
    return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
  });
}
  open(id:number)
  {
    this.selectedItemId=id;
this.Modal.open();
  }
  toggleStatus(id: number) {
    const product= this.products.find(p => p.id ===id);
    if (!product)
    {
      Swal.fire("Error!", "Product not found.", "error");
      return;
    }
  this.productService.toggleStatus(id).subscribe({
    next: () => {
      Swal.fire("Updated", "Your item has been updated.", "success");

       product.isDelete = !product.isDelete;
    },
    error: () => {
      Swal.fire("Error!", this.errorService.getErrorsMessage(), "error");
    }
  });
}
}
