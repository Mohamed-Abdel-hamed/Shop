import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';
import { Iresetpassword } from '../../../models/auth/iresetpassword';
import { Apierrorservice } from '../../../services/apierrorservice';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  email:string='';
  code:string='';
  errorMessage='';
  isSuccess=false;
  isLoading=false;
resetPassowrdForm=new FormGroup({
  newPassword:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) ])
})
constructor(private authService:AuthService,private rout:ActivatedRoute,
  private errorService:Apierrorservice,
  private router:Router
) {}
  ngOnInit(): void {
    this.email=this.rout.snapshot.queryParamMap.get("email")??'';
     this.code=this.rout.snapshot.queryParamMap.get("code")??'';
  }
resetPassowrd(form:FormGroup)
{
  this.isLoading=true;

if(form.invalid)
{
  form.markAllAsTouched();
  return;
}

  const resetpasswordRequest:Iresetpassword = {
    email: this.email,
    code: this.code,
    newPassword: form.value.newPassword
  };

this.authService.resetPassword(resetpasswordRequest).pipe(
  finalize(()=>this.isLoading=false)
)
.subscribe({
  next:()=>{
this.isSuccess=true;
this.router.navigateByUrl('/profile');
  },
  error:()=>{
    this.errorMessage= this.errorService.getErrorsMessage();
  }
})
}
}
