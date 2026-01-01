import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Iforgetpassword } from '../../../models/auth/iforgetpassword';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  imports: [ FormsModule,ReactiveFormsModule,JsonPipe],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {
forgetPasswordForm=new FormGroup({
  Email:new FormControl('',[Validators.required,Validators.email])
})
constructor(private authService:AuthService)
{

}
forgetPassword(form:FormGroup)
{
  if(form.invalid)
  {
    return;
  }
  const forgetPasswordRequest=form.value as Iforgetpassword;
this.authService.forgetPassword(forgetPasswordRequest).subscribe({
  next:()=>{

  }
})
}
}
