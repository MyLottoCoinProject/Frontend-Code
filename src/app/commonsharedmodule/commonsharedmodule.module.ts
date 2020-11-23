import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from '../_alert';
import { CommonsharedmoduleRoutingModule } from './commonsharedmodule-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { WorkstepsectionComponent } from './workstepsection/workstepsection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BannerComponent, WorkstepsectionComponent],
  imports: [
    CommonModule,
    CommonsharedmoduleRoutingModule,
    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    WorkstepsectionComponent
  ]
})
export class CommonsharedmoduleModule { }
