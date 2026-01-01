import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {  provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import { apiErrorInterceptor } from './interceptors/ApiErrorInterceptor';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';
import { loaderInterceptor } from './interceptors/loader-interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(),withInterceptors([ apiErrorInterceptor,loaderInterceptor ])),
     provideSweetAlert2({
      fireOnInit: false,
      dismissOnDestroy: true
    }),
  ]
};
