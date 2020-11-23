import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';
import { CommonsharedmoduleModule } from '../commonsharedmodule/commonsharedmodule.module';

@NgModule({
  declarations: [ResultComponent],
  imports: [
    CommonModule,
    ResultRoutingModule,
    CommonsharedmoduleModule
  ]
})
export class ResultModule { }
