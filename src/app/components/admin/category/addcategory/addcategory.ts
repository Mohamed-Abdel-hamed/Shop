import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { finalize, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
import { Apierrorservice } from '../../../../services/apierrorservice';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-addcategory',
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './addcategory.html',
  styleUrl: './addcategory.css',
})
export class Addcategory {
  isLoading=false;
  errorMessage='';
categoryForm=new FormGroup(
 {
   name:new FormControl('',[Validators.required,Validators.maxLength(100),Validators.minLength(3)]),
 }
)
constructor(private categoryService:CategoryService,
 private router:Router,
 private errorService:Apierrorservice
){}
ngOnInit() {
  this.categoryForm.valueChanges.subscribe(() => {
    this.errorMessage = '';
  });
}
submit(form:FormGroup)
{
  this.isLoading=true
  if(form.invalid)
  {
    form.markAllAsTouched();
    this.isLoading=false;
    return;
  }
this.categoryService.add(form.value).pipe(
finalize(()=>this.isLoading=false)
)
.subscribe({
next:()=>{
    Swal.fire({
              title: "Added!",
              text: "category has been Added.",
              icon: "success"
            });
           
    this.router.navigateByUrl('/admin/categories');
},
error:()=>{
  this.errorMessage=this.errorService.getErrorsMessage()
}
})
}
}
