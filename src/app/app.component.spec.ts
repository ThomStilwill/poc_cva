import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { routes } from './app-routing.module';
import { SecurityModule } from './security/security.module';
import { SharedModule } from './shared/shared.module';
import { SecureComponent } from './views/secure/secure.component';
import { UserComponent } from './views/user/user.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NotAuthorizedComponent } from './views/not-authorized/not-authorized.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AppConfigModule } from './app-config.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        WelcomeComponent,
        UserComponent,
        LoginComponent,
        SecureComponent,
        NotAuthorizedComponent,
        NotFoundComponent
      ],
      imports: [
        AppConfigModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        SecurityModule.forRoot(),
        SharedModule.forRoot()
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
