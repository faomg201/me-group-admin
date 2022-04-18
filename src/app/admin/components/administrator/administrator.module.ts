import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { AddserviceComponent } from './create/addservice/addservice.component';
import { AddworkComponent } from './create/addwork/addwork.component';
import { AddteamsComponent } from './create/addteams/addteams.component';
import { ListserviceComponent } from './list/listservice/listservice.component';
import { ListworksComponent } from './list/listworks/listworks.component';
import { ListteamsComponent } from './list/listteams/listteams.component';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    ListComponent,
    AddserviceComponent,
    AddworkComponent,
    AddteamsComponent,
    ListserviceComponent,
    ListworksComponent,
    ListteamsComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministratorModule { }
