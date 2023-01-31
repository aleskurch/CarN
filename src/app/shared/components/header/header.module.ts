import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { HeaderContainerComponent } from "./header-container.component";
import { HeaderComponent } from './header.component';
import { AddNumberComponent } from './add-number-modal/add-number/add-number.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HeaderContainerComponent,
    AddNumberComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [HeaderContainerComponent, HeaderComponent]
})
export class HeaderModule { }
