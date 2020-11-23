import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CommonsharedmoduleModule } from '../commonsharedmodule/commonsharedmodule.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CommonsharedmoduleModule
  ]
})
export class HomeModule { }
