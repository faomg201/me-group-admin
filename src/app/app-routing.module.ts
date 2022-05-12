import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppURL } from './app.url';
import { LoginComponent } from './login/login.component';
import { LogoutGuard } from './login/helpers/guard/logout.guard';
import { AuthGuard } from './login/helpers/guard/auth.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent, canActivate: [LogoutGuard] },
  {

    path: AppURL.Admin,
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
      canActivate: [AuthGuard]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
