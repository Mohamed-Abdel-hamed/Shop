import { Injectable } from '@angular/core';
import { ApiError } from '../models/api-error';

@Injectable({
  providedIn: 'root'
})
export class Apierrorservice {

#_apiErrorResponse:ApiError|null=null

sendError(apiError:any)
{
  this.#_apiErrorResponse = new ApiError(apiError)
}
getError():ApiError
{

  return this.#_apiErrorResponse!
}
getErrorCode():string{
  return this.#_apiErrorResponse!.getErrorCode();
}
getErrorsMessage():string
{
return this.#_apiErrorResponse!.getErrorsMessage();
}
getErrorStatus()
{
  return this.#_apiErrorResponse!.status;
}
clear():void
{
  this.#_apiErrorResponse=null
}

}
