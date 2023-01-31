import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";

import { IAddNumberFormGroup } from './interfaces/add-number-form-group.interface';

@Component({
  selector: 'app-add-number',
  templateUrl: './add-number.component.html',
  styleUrls: ['./add-number.component.scss'],
})
export class AddNumberComponent {
  public formGroup: FormGroup<IAddNumberFormGroup> = this.formBuilder.group({
    number: ['', [Validators.required]],
    holder: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddNumberComponent>
  ) {}

  public onSubmit(): void {
    this.formGroup.getRawValue();
    this.dialogRef.close({ ...this.formGroup.getRawValue() });
  }
}
