import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SecureComponent } from './views/secure/secure.component';
import { AuthGuard } from './security/guards/auth.guard';
import { Role } from './security/models/role';
import { LoginComponent } from './views/login/login.component';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { NotAuthorizedComponent } from './views/not-authorized/not-authorized.component';

const routes: Routes = [
  { path: 'admin', component: SecureComponent,
                  canActivate: [AuthGuard],
                  data: { roles: [Role.Admin] } },
  { path: 'user', component: UserComponent,
                  canActivate: [AuthGuard],
                  data: { roles: [Role.Admin, Role.User] } },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'notauth', component: NotAuthorizedComponent},
  { path: 'notfound', component: NotFoundComponent},
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
