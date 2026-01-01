// api-error.interceptor.ts
import { HttpRequest, HttpHandlerFn, HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IApiErrorResponse } from '../models/iapi-error-response';
import { Apierrorservice } from '../services/apierrorservice';
import { Router } from '@angular/router';

export const apiErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const apiErrorService = inject(Apierrorservice);
 const router = inject(Router);
const token = localStorage.getItem('userToken');
  let authReq =req;
if(token)
{
  authReq=req.clone({

    setHeaders: {
        Authorization: `Bearer ${token}`
      }
  });
}


 return next(authReq).pipe(
    tap({
     next: () => {
      },
            error: (err) => {
                    apiErrorService.clear();
               const apiError: IApiErrorResponse = err.error ?? { message: err.message ?? 'Unknown error', type: 'Unknown' };

              if (err.status === 401) {
         router.navigate(['/login']);
          apiErrorService.sendError(apiError);
          return;
        }

              if([400,404,409].includes(err.status))
              {
              apiErrorService.sendError(apiError);
              return;
              }
      }
    })
  )
};

