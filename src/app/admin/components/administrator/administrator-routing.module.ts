import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ListserviceComponent } from './list/listservice/listservice.component';
import { ListworksComponent } from './list/listworks/listworks.component';
import { ListteamsComponent } from './list/listteams/listteams.component';
import { EditserviceComponent } from './edit/editservice/editservice.component';
import { EditworksComponent } from './edit/editworks/editworks.component';
import { ListcontractusComponent } from './list/listcontractus/listcontractus.component';
import { ListaboutusComponent } from './list/listaboutus/listaboutus.component';


const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'listservices', component: ListserviceComponent},
  {path: 'listworks', component: ListworksComponent},
  {path: 'listteams', component: ListteamsComponent},
  {path: 'listcontractus', component: ListcontractusComponent},
  {path: 'listaboutus', component: ListaboutusComponent},
  {path: 'list', component: ListComponent},
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'editservice/:id', component: EditserviceComponent},
  {path: 'editworks/:id', component: EditworksComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
