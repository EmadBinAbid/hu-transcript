import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormComponent } from './components/form/form.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent
},
{
  path: '',
  component: FormComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
},
{
  path: 'details',
  component: DetailsComponent
},
{
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
