import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketComponent } from './ticket.component';
import { CommonsharedmoduleModule } from '../commonsharedmodule/commonsharedmodule.module';


@NgModule({
  declarations: [TicketComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    CommonsharedmoduleModule
  ]
})
export class TicketModule { }
