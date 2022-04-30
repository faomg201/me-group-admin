import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule }from 'ngx-pagination';
import { HotToastModule } from '@ngneat/hot-toast';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { SharedsModule } from 'src/app/shareds/shareds.module';
import { ListserviceComponent } from './list/listservice/listservice.component';
import { ListworksComponent } from './list/listworks/listworks.component';
import { ListteamsComponent } from './list/listteams/listteams.component';
import { EditserviceComponent } from './edit/editservice/editservice.component';
import { EditworksComponent } from './edit/editworks/editworks.component';
import { ListcontractusComponent } from './list/listcontractus/listcontractus.component';
import { ListaboutusComponent } from './list/listaboutus/listaboutus.component';
import { BaccountComponent } from './list/baccount/baccount.component';
import { LogsComponent } from './list/logs/logs.component';
import { EditteamsComponent } from './edit/editteams/editteams.component';
import { EditaccountComponent } from './edit/editaccount/editaccount.component';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    ListComponent,
    ListserviceComponent,
    ListworksComponent,
    ListteamsComponent,
    EditserviceComponent,
    EditworksComponent,
    ListcontractusComponent,
    ListaboutusComponent,
    BaccountComponent,
    LogsComponent,
    EditteamsComponent,
    EditaccountComponent,
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HotToastModule
  ]
})
export class AdministratorModule { }
