import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { IUpdateAccount } from '../../../models/auth/iupdateaccount';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { Apierrorservice } from '../../../services/apierrorservice';

@Component({
  selector: 'app-updateaccount',
   standalone: true,
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './updateaccount.html',
  styleUrl: './updateaccount.css',
})
export class Updateaccount {
   errorMessage:string='';
   isLoading=false;
   isComplete=false;
   isFailedUpdate=false;
   failedUpdateMessage:string='';
   constructor(private _authService:AuthService,private _apiErrorServicee:Apierrorservice)
   {

   }
   ngOnInit(): void {
      this.getProfile();
     this.updateForm.get('email')?.valueChanges.subscribe(()=>{
        this.errorMessage = '';
     })
   }

 updateForm=new FormGroup({
   firstName:new FormControl('',
     [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(50)
     ]),
     lastName:new FormControl('',
     [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(50)
     ]),
      userName:new FormControl('',
     [
       Validators.required,
       Validators.minLength(3),
       Validators.maxLength(50)
     ]),
     email:new FormControl('',
     [
       Validators.required,
       Validators.email
     ]),
     phoneNumber:new FormControl('',
     [
       Validators.required,
       Validators.pattern(/^01\d{9}$/)
     ])
 })

getProfile(){
  this._authService.getProfile().subscribe({
    next:(res)=>{
      this.updateForm.patchValue({
        firstName:res.firstName,
        lastName:res.lastName,
        userName:res.userName,
        email:res.email,
        phoneNumber:res.phoneNumber
      })
    }
  })
}
submit(formUpdate: FormGroup) {
   if (formUpdate.invalid) {
     formUpdate.markAllAsTouched();
     return;
   }
 this.isLoading=true;


   const formData=formUpdate.value as IUpdateAccount

   this._authService.updateAccount(formData).pipe(
         finalize(() => this.isLoading = false)
       ).subscribe({
     next: ()=>{
       this. isComplete=true;
     },
       error: () => {
         let errorResponse=this._apiErrorServicee.getError();
           if(errorResponse.status==400)
           {

             this.isFailedUpdate=true;
             this.failedUpdateMessage=errorResponse.getErrorsMessage();

           }
   },

   })
 }

}
