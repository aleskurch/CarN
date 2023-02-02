import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from "@angular/material/snack-bar";

import { AddNumberModule } from '../add-number-modal/add-number.module';
import { HeaderContainerComponent } from './header-container.component';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent, HeaderContainerComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, AddNumberModule],
  providers: [MatSnackBar],
  exports: [HeaderContainerComponent, HeaderComponent],
})
export class HeaderModule {}
