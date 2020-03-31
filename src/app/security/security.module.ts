import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider } from './_helpers/fake-backend';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [

  ],
  exports: [

    ],
  imports: [
    CommonModule,
  ],
  providers: [AuthenticationService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
})
export class SecurityModule {
  constructor(@Optional() @SkipSelf() parentModule: SecurityModule) {
    if (parentModule) {
      throw new Error('Security Module already loaded');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SecurityModule,
      providers: [ AuthenticationService, UserService, fakeBackendProvider ]
    };
  }
 }
