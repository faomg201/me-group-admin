import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../shareds/components/navbar/navbar.component';
import { SidebarComponent } from '../shareds/components/sidebar/sidebar.component';
import { AdminURL } from './admin.url';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  redirectTo: AdminURL.Dashboard,
  pathMatch: 'full',
},
{path: '', component: SidebarComponent, outlet: 'sidebar'},
{path: '', component: NavbarComponent, outlet: 'navbar'},
{
  path: AdminURL.Dashboard,
  component: DashboardComponent,
},
{
  path: AdminURL.Administrator,
  loadChildren: () =>
  import('./components/administrator/administrator.module').then(
    (mode) => mode.AdministratorModule
  )
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
