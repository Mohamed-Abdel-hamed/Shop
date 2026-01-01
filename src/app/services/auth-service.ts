import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Iregister } from '../models/auth/iregister';
import { Iemailconfirmation } from '../models/auth/iemailconfirmation';
import { environment } from '../../environments/environment.prod';
import { Ilogin } from '../models/auth/ilogin';
import { Iloginresponse } from '../models/auth/iloginresponse';
import { jwtDecode} from 'jwt-decode';
import { IUser } from '../models/user/iuser';
import { IChangePasswordRequest } from '../models/auth/ichange-password-request';
import { Iforgetpassword } from '../models/auth/iforgetpassword';
import { Iresetpassword } from '../models/auth/iresetpassword';
import { IUpdateAccount } from '../models/auth/iupdateaccount';
import { IProfile } from '../models/user/iprofile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.baseUrl;
 isLogin=new BehaviorSubject<boolean>(false);
  constructor(private _httpClient:HttpClient)
  {
    this.isAuthenticated();
  }
  register(register:Iregister):Observable<void>
  {
    return this._httpClient.post<void>('http://fast-shop.runasp.net/api/Auths/register',register);
  }
  confirmEmail(emailconfirm:Iemailconfirmation):Observable<void>
  {
    return this._httpClient.post<void>('http://fast-shop.runasp.net/api/Auths/confirm-email',emailconfirm)
  }

login(login:Ilogin):Observable<Iloginresponse>
{
return this._httpClient.post<any>(`${this.apiUrl}Auths`,login).pipe(
  map((res)=>this.mapToLoginResponse(res)),
  tap(response=>{
       const expireDate=new Date(Date.now()+response.expiresIn*1000)
      localStorage.setItem('userToken',response.token);
      localStorage.setItem('tokenExpiresIn',expireDate.toString());
  }

  )
)
}
changePassword(changePasswordRequest:IChangePasswordRequest):Observable<void>
{
  return this._httpClient.put<void>(`${this.apiUrl}Accounts/change-password`,changePasswordRequest)
}
forgetPassword(forgetPasswordRequest:Iforgetpassword):Observable<void>
{
  return this._httpClient.post<void>(`${this.apiUrl}Auths/forget-password`,forgetPasswordRequest)
}
resetPassword(resetpasswordRequest:Iresetpassword):Observable<void>
{
return this._httpClient.post<void>(`${this.apiUrl}Auths/reset-password`,resetpasswordRequest)
}
updateAccount(updateAccount:IUpdateAccount):Observable<void>
{
  return this._httpClient.put<void>(`${this.apiUrl}Accounts`,updateAccount)
}
getProfile():Observable<IProfile>
{
  return this._httpClient.get<IProfile>(`${this.apiUrl}Accounts`);
}
getUserInfo():IUser | null
{
    const token = localStorage.getItem('userToken');
      if (!token) {
    return null;
  }
    const decoded:any =jwtDecode(token);
    const user:IUser={
       id: decoded.sub,
    firstName: decoded.given_name ,
    lastName: decoded.family_name,
    email: decoded.email,
    phoneNumber:decoded.phone_number,
    role:decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    };

  return user;
}
private mapToLoginResponse(res: any): Iloginresponse {

  return {
    token: res.token,
    expiresIn: res.expiresIn
  };
}
 logOut():void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('tokenExpiresIn');
    this.isLogin.next(false);
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    const expiry = localStorage.getItem('tokenExpiresIn');

    if (!token || !expiry) {
      this. isLogin.next(false);
      return false;
    }

    const isValid = new Date(expiry) > new Date();
    this. isLogin.next(isValid);
    return isValid;
  }
  }
