import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import {  IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';
import { Apierrorservice } from '../../../../services/apierrorservice';
import { finalize } from 'rxjs';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproduct',
  imports: [NgMultiSelectDropDownModule, FormsModule, ReactiveFormsModule],
  templateUrl: './addproduct.html',
  styleUrl: './addproduct.css',
})
export class Addproduct implements OnInit {
  dropdownList :any[]=[];
  imagePreview: string='';
  dropdownSettings = {};
  errorMessage: string | null = null;
  isLoading=false;
   isSuccess=false;
  formProduct=new FormGroup({
    name: new FormControl('',[Validators.required,Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required,Validators.maxLength(500)]),
    price: new FormControl(1, [Validators.required,Validators.min(1)]),
    stock: new FormControl(0,[Validators.required,Validators.min(0)] ),
    image: new FormControl(null,[this.imageValidator]),
    categories: new FormControl([], [Validators.required])
  })
  constructor(private categoryService:CategoryService,
     private productService:ProductService,
    private errorService:Apierrorservice,
  private router:Router){}
  ngOnInit() {

    this.categoryService.getAll().subscribe({
next:(res)=>{
  this.dropdownList=res
}
    })

    this.dropdownSettings = {
  singleSelection: false,
  idField: 'id',
  textField: 'name',
  selectAllText: 'Select All',
  unSelectAllText: 'UnSelect All',
  itemsShowLimit: 3,
  allowSearchFilter: true
} as IDropdownSettings;

  }
  imageValidator(control:AbstractControl):ValidationErrors|null

  {
    const file=control.value;

    if(!file) return null;


  const allowedTypes = ['image/jpg','image/jpeg', 'image/png'];
    if (file.type && !allowedTypes.includes(file.type)) {
        return { invalidType: true };
      }

      if (file.size > 2 * 1024 * 1024) {
    return { maxSize: true };
  }
   return null;
  }
  uploadImage(event:any)
  {
    const file = event.target.files[0];
    if(!file)return;

    this.formProduct.patchValue({image:file});
    this.formProduct.get('image')?.updateValueAndValidity();


    const fileReader=new FileReader();
    fileReader.onload = () => {
      this.imagePreview = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
  }
  submit(formProduct:FormGroup)
  {
     this.isLoading=true;
      if (formProduct.invalid) {
      formProduct.markAllAsTouched();
      this.isLoading=false;
      return;
    }

    const formData = new FormData();
     formData.append("name", formProduct.get("name")?.value as string);
    formData.append("description", this.formProduct.get("description")?.value as string);
    formData.append("price",formProduct.get("price")?.value as any);
    formData.append("stock", formProduct.get("stock")?.value as any);
    formData.append("image", formProduct.get("image")?.value);


   const categoryIds = this.formProduct.get("categories")?.value?.map((c: any) => c.id)|| [];

categoryIds.forEach(id => formData.append("Categories", id.toString()));


   this.productService.add(formData).pipe(
    finalize(()=>this.isLoading=false)
   )
   .subscribe({
    next:()=>{
      Swal.fire({
            title: "Added!",
            text: "Your item has been Added.",
            icon: "success"
          });
          this.router.navigateByUrl('/admin/products');
    },
    error:()=>{
      this.errorMessage=this.errorService.getErrorsMessage();
    }
   })
  }
}
