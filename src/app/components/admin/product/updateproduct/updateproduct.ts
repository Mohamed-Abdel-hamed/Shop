import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { finalize } from 'rxjs/internal/operators/finalize';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { environment } from '../../../../../environments/environment.prod';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';
import { Apierrorservice } from '../../../../services/apierrorservice';

@Component({
  selector: 'app-updateproduct',
 imports: [NgMultiSelectDropDownModule, FormsModule, ReactiveFormsModule],
  templateUrl: './updateproduct.html',
  styleUrl: './updateproduct.css',
})
export class Updateproduct implements OnInit{
  hostImage=environment.hostImage;
  dropdownList :any[]=[];
  dropdownSettings = {};
  imagePreview: string='';
errorMessage='';
isLoading=false;
productId!: number;


  constructor(private categoryService:CategoryService,
     private productService:ProductService,
    private errorService:Apierrorservice,
  private router:Router,
private route:ActivatedRoute){}
  ngOnInit(): void {
   this.productId=Number(this.route.snapshot.paramMap.get('id'));
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

    this.loadProduct();
  }

  formProduct=new FormGroup({
    name: new FormControl('',[Validators.required,Validators.maxLength(100)]),
    description: new FormControl('', [Validators.required,Validators.maxLength(500)]),
    price: new FormControl(1, [Validators.required,Validators.min(1)]),
    stock: new FormControl(0,[Validators.required,Validators.min(0)] ),
    image: new FormControl(null,[this.imageValidator]),
    categories: new FormControl<any[]>([], [Validators.required])
  })

  loadProduct() {
    this.productService.getById(this.productId).subscribe({
      next:(product)=>{
        const mappedCategories = this.dropdownList.filter(cat =>
  (product.categories as any[]).includes(cat.name)
);
 this.formProduct.patchValue({
        name: product.name,
        price: product.price,
        stock:product.stock,
        description: product.description,
        categories : mappedCategories
      });
       this.imagePreview = this.hostImage + product.imageUrl;
      },
      error:()=>{
        this.errorMessage=this.errorService.getErrorsMessage();
      }
    });
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
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }
  submit(formProduct:FormGroup)
  {
    this.isLoading=true;
    if(formProduct.invalid)
    {
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


categoryIds.forEach(id => formData.append("categories", id.toString()));

   this.productService.update(this.productId,formData).pipe(
    finalize(()=>this.isLoading=false)
   )
   .subscribe({
    next:()=>{
      Swal.fire({
            title: "Updated!",
            text: "Your item has been Updated.",
            icon: "success"
          });
          this.router.navigateByUrl('/admin/products');
    },
    error:()=>{
      this.errorMessage=this.errorService.getErrorsMessage();
    }
   });
  }
}
