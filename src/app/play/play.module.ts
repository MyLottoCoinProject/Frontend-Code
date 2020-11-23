import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { PlayComponent } from './play.component';
import { CommonsharedmoduleModule } from '../commonsharedmodule/commonsharedmodule.module';

@NgModule({
  declarations: [PlayComponent],
  imports: [
    CommonModule,
    PlayRoutingModule,
    CommonsharedmoduleModule
  ]
})
export class PlayModule { }
