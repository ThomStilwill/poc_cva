import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BadRouteComponent } from './bad-route/bad-route.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: '**', component: BadRouteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
