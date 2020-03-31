import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BadRouteComponent } from './bad-route/bad-route.component';
import { HomeComponent } from './home/home.component';
import { SecureComponent } from './secure/secure.component';
import { AuthGuard } from './_guards/auth.guard';
import { Role } from './_models/roles';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'test', component: SecureComponent,
                  canActivate: [AuthGuard],
                  data: { roles: [Role.Admin] } },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', component: BadRouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
