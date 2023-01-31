import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { DashboardContainerComponent } from "./dashboard-container.component";
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent, DashboardContainerComponent],
    imports: [CommonModule, DashboardRoutingModule, MatCardModule, MatButtonModule, MatIconModule],
  exports: [
    DashboardContainerComponent
  ]
})
export class DashboardModule {}
