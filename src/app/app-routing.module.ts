import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppURL } from './app.url';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'', 
  redirectTo: 'login',
  pathMatch: 'full',
},
{path: 'login',component: LoginComponent},
{
  
  path : AppURL.Admin,
  loadChildren: () =>
    import ('./admin/admin.module').then((mod) => mod.AdminModule),
  
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
