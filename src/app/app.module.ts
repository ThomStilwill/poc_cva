import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgModuleRef } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppConfigModule } from './app-config.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { SecurityModule } from './security/security.module';
import { DemoModule } from './demo/demo.module';

import { HomeComponent } from './views/home/home.component';
import { SecureComponent } from './views/secure/secure.component';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './views/login/login.component';
import { UserComponent } from './views/user/user.component';

import { NotAuthorizedComponent } from './views/not-authorized/not-authorized.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { SecurityService } from './services/security.service';
import { SERVICE_INTERFACE } from './security/services/security-service.interface';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SecureComponent,
    WelcomeComponent,
    LoginComponent,
    UserComponent,
    NotAuthorizedComponent,
    NotFoundComponent,
  ],
  imports: [
    AppConfigModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoModule,
    AppRoutingModule,
    SecurityModule.forRoot(),
    SharedModule.forRoot()
  ],
  providers: [
    {
      provide: SERVICE_INTERFACE,
      useFactory: () => {
          return new SecurityService();
      }
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
