import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule }from 'ngx-pagination';
import { HotToastModule } from '@ngneat/hot-toast';
import { ImageCropperModule } from 'ngx-image-cropper';


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
import { ListserviceusComponent } from './list/listserviceus/listserviceus.component';
import { ListmyblogComponent } from './list/listmyblog/listmyblog.component';
import { WorkwithusComponent } from './list/workwithus/workwithus.component';
import { EditserviceusComponent } from './edit/editserviceus/editserviceus.component';

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
    ListserviceusComponent,
    ListmyblogComponent,
    WorkwithusComponent,
    EditserviceusComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HotToastModule,
    ImageCropperModule
  ]
})
export class AdministratorModule { }
