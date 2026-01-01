import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Ilogin } from '../../../models/auth/ilogin';
import { Router, RouterLink } from '@angular/router';
import { Apierrorservice } from '../../../services/apierrorservice';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  errorMessage:string='';
isLoading=false;
isLocked=false;
constructor(private _authService:AuthService,
  private _router:Router,
private _apiErrorresponse:Apierrorservice)
{

}
loginForm=new FormGroup({
email:new FormControl('',[Validators.required,Validators.email]),
password:new FormControl('',[Validators.required])
})
ngOnInit(): void {

}
login(loginForm:FormGroup)
{
   if (loginForm.invalid) {
    loginForm.markAllAsTouched();
    return;
  }
this.isLoading=true
   const formData=loginForm.value as Ilogin
  this._authService.login(formData).pipe(
    finalize(()=>this.isLoading=false)
  )
  .subscribe({
    next:()=>{
       this._authService.isLogin.next(true);
      const role = this._authService.getUserInfo()?.role;

      if (role === 'Admin') {
        this._router.navigateByUrl('/admin');
      } else {
        this._router.navigateByUrl('/home');
      }
    },
    error:()=>{
      if( this._apiErrorresponse.getErrorCode()==="User.LockedUser")
      {
        this.isLocked=true;
      }
      this.errorMessage= this._apiErrorresponse.getErrorsMessage();
    }
  })
}
}
