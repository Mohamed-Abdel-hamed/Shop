import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Iemailconfirmation } from '../../../models/auth/iemailconfirmation';
import { Apierrorservice } from '../../../services/apierrorservice';

@Component({
  selector: 'app-email-confirmation',
  imports: [],
  templateUrl: './email-confirmation.html',
  styleUrl: './email-confirmation.css',
})
export class EmailConfirmation implements OnInit {
errorMessage='';
  constructor(private _authService:AuthService,
    private _ActivatedRout:ActivatedRoute,
  private _router:Router,private _errorService:Apierrorservice){}
  ngOnInit(): void {
    const userId=this._ActivatedRout.snapshot.queryParamMap.get('userId');
      const code=this._ActivatedRout.snapshot.queryParamMap.get('code');
       if (userId && code) {
         const payload: Iemailconfirmation = { userId, code };
      this.confirmEmail(payload);
    }
  }
confirmEmail(emailconfirm:Iemailconfirmation)
{
  this._authService.confirmEmail(emailconfirm).subscribe({
    next:()=>{
      this._router.navigateByUrl('/login')
    }, 
     error: () =>{
      this.errorMessage=this._errorService.getErrorsMessage();
     }
  })
}

}
