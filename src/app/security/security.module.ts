import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtInterceptor } from './providers/jwt.interceptor';
import { ErrorInterceptor } from './providers/error.interceptor';
import { fakeBackendProvider } from './providers/fake-backend';

import { AuthenticationService } from './services/authentication.service';
import { AuthorizationService } from './services/authorization.service';

import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationDirective } from './directives/authorization.directive';

@NgModule({
  declarations: [
    AuthorizationDirective
  ],
  exports: [
    AuthorizationDirective
    ],
  imports: [
    CommonModule,
  ],
  providers: [AuthenticationService, AuthorizationService, UserService,
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
