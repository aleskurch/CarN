import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [HeaderContainerComponent, HeaderComponent]
})
export class HeaderModule { }
