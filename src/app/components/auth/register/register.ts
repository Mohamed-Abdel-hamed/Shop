import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Iregister } from '../../../models/auth/iregister';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Apierrorservice } from '../../../services/apierrorservice';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  errorMessage:string='';
  isLoading=false;
  isComplete=false;
  isFailedRegister=false;
  failedRegisterMessage:string='';
  constructor(private _authService:AuthService,private _apiErrorServicee:Apierrorservice)
  {

  }
  ngOnInit(): void {
    this.registerForm.get('email')?.valueChanges.subscribe(()=>{
       this.errorMessage = '';
    })
  }

registerForm=new FormGroup({
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
    ]),
password: new FormControl('', [
  Validators.required,
  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
]),

})

submit(register: FormGroup) {
  if (register.invalid) {
    register.markAllAsTouched();
    return;
  }
this.isLoading=true;


  const formData=register.value as Iregister

  this._authService.register(formData).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
    next: ()=>{
      this. isComplete=true;
    },
      error: () => {
        let errorResponse=this._apiErrorServicee.getError();
        if(errorResponse.status==409)
          {
              this.errorMessage= errorResponse.getErrorsMessage();
          }
          else if(errorResponse.status==400)
          {

            this.isFailedRegister=true;
            this.failedRegisterMessage=errorResponse.getErrorsMessage();

          }
  },

  })
}

}
