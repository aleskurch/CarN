import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddNumberModule } from '../add-number-modal/add-number.module';
import { HeaderContainerComponent } from './header-container.component';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent, HeaderContainerComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, AddNumberModule],
  exports: [HeaderContainerComponent, HeaderComponent],
})
export class HeaderModule {}
