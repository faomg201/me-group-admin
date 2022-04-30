import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ListserviceComponent } from './list/listservice/listservice.component';
import { ListworksComponent } from './list/listworks/listworks.component';
import { ListteamsComponent } from './list/listteams/listteams.component';
import { ListcontractusComponent } from './list/listcontractus/listcontractus.component';
import { ListaboutusComponent } from './list/listaboutus/listaboutus.component';

import { EditserviceComponent } from './edit/editservice/editservice.component';
import { EditworksComponent } from './edit/editworks/editworks.component';
import { EditteamsComponent } from './edit/editteams/editteams.component';
import { EditaccountComponent } from './edit/editaccount/editaccount.component';

import { BaccountComponent } from './list/baccount/baccount.component';
import { LogsComponent } from './list/logs/logs.component';


const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'listservices', component: ListserviceComponent},
  {path: 'listworks', component: ListworksComponent},
  {path: 'listteams', component: ListteamsComponent},
  {path: 'listcontractus', component: ListcontractusComponent},
  {path: 'listaboutus', component: ListaboutusComponent},
  {path: 'baccount', component: BaccountComponent},
  {path: 'logs', component: LogsComponent},
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'editservice/:id', component: EditserviceComponent},
  {path: 'editworks/:id', component: EditworksComponent},
  {path: 'editteams/:id', component: EditteamsComponent},
  {path: 'editaccount/:id', component: EditaccountComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
