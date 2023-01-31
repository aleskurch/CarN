import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICarNumber } from '../../interfaces/car-number.interface';

import { IAddNumberFormGroup } from './interfaces/add-number-form-group.interface';

@Component({
  selector: 'app-add-number',
  templateUrl: './add-number.component.html',
  styleUrls: ['./add-number.component.scss'],
})
export class AddNumberComponent {
  public formGroup: FormGroup<IAddNumberFormGroup> = this.formBuilder.group({
    number: [
      {
        value: this.data?.carNumber?.number || '',
        disabled: !!this.data?.isEdit,
      },
      [Validators.required],
    ],
    holder: [this.data?.carNumber?.holder || '', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddNumberComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { carNumber: ICarNumber; isEdit: boolean } | null
  ) {}

  public onSubmit(): void {
    this.formGroup.getRawValue();
    this.dialogRef.close({ ...this.formGroup.getRawValue() });
  }
}
