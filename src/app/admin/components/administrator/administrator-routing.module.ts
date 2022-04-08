import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { AddserviceComponent } from './create/addservice/addservice.component';
import { AddworkComponent } from './create/addwork/addwork.component';
import { AddteamsComponent } from './create/addteams/addteams.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'addservice', component: AddserviceComponent},
  {path: 'addwork', component: AddworkComponent},
  {path: 'addteams', component: AddteamsComponent},
  {path: 'list', component: ListComponent},
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
