import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AddNumberComponent } from "./add-number.component";


@NgModule({
  declarations: [AddNumberComponent],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatInputModule],
  exports: [AddNumberComponent],
})
export class AddNumberModule {}
