import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppURL } from './app.url';


const routes: Routes = [
  {path:'', 
  redirectTo: AppURL.Admin,
  pathMatch: 'full'
},
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
