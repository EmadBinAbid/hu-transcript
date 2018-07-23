import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormComponent } from './components/form/form.component';
import { DetailsComponent } from './components/details/details.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { AdminDetailsComponent } from './components/admin-details/admin-details.component';

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
  path: 'supervisor',
  component: SupervisorComponent
},
{
  path: 'details',
  component: DetailsComponent
},
{
  path: 'adminDetails',
  component: AdminDetailsComponent
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
