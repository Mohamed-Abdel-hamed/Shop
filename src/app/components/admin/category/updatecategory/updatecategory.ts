import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Apierrorservice } from '../../../../services/apierrorservice';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { Modal } from "../../../../shared/components/modal/modal";

@Component({
  selector: 'app-updatecategory',
  imports: [ReactiveFormsModule],
  templateUrl: './updatecategory.html',
  styleUrl: './updatecategory.css',
})
export class Updatecategory {
  isLoading=false;
  errorMessage='';
categoryForm=new FormGroup(
 {
   name:new FormControl('',[Validators.required,Validators.maxLength(100),Validators.minLength(3)]),
 }
)
constructor(private categoryService:CategoryService,
 private router:Router,
 private route:ActivatedRoute,
 private errorService:Apierrorservice
){}
ngOnInit() {

    const productId=Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategory(productId);
  this.categoryForm.valueChanges.subscribe(() => {
    this.errorMessage = '';
  });
}
loadCategory(id:number)
{
  this.categoryService.get(id).subscribe({
    next:(category)=>{
      this.categoryForm.patchValue({
        name:category.name
      })
    }
  })
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
this.categoryService.update(form.value).pipe(
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
