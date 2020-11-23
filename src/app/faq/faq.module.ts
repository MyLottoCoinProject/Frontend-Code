import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';
import { CommonsharedmoduleModule } from '../commonsharedmodule/commonsharedmodule.module';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    CommonsharedmoduleModule
  ]
})
export class FaqModule { }
