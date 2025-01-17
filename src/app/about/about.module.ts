import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { CommonsharedmoduleModule } from '../commonsharedmodule/commonsharedmodule.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    CommonsharedmoduleModule
  ]
})
export class AboutModule { }
