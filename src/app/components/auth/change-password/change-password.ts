import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IChangePasswordRequest } from '../../../models/auth/ichange-password-request';
import { Apierrorservice } from '../../../services/apierrorservice';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './change-password.html', 
  styleUrl: './change-password.css',
})
export class ChangePassword {
  errorMessage:string='';
  isSuccess=false;
  isLoading=false;
  changePasswordForm=new FormGroup({
    OldPassword: new FormControl('', [Validators.required]),
    NewPassword: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
  })
constructor(private authService:AuthService,
  private errorService:Apierrorservice
)
{

}

changePassword(form:FormGroup)
{
  if(form.invalid)
  {
    form.markAllAsTouched();
    return ;
  }
  this.isLoading=true;
  const changePasswordRequest= form.value as IChangePasswordRequest
this.authService.changePassword(changePasswordRequest).pipe(
finalize(()=>this.isLoading=false)
).subscribe({
  next:()=>{
 this.isSuccess=true;
 this.errorMessage = '';
  },
  error:()=>{
    this.errorMessage=this.errorService.getErrorsMessage();
  }
})
}

}
