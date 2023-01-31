import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardContainerComponent } from "./dashboard-container.component";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent, DashboardContainerComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
