import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPageContainerComponent } from './error-page-container.component';
import { ErrorPageRoutingModule } from './error-page-routing.module';
import { ErrorPageComponent } from './error-page.component';

@NgModule({
  declarations: [ErrorPageComponent, ErrorPageContainerComponent],
  imports: [CommonModule, ErrorPageRoutingModule],
})
export class ErrorPageModule {}
