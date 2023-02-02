import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CarNumberInterface } from '../../interfaces/car-number.interface';
import { AddNumberFormGroupInterface } from './interfaces/add-number-form-group.interface';
import { AddNumbersService } from './services/add-numbers.service';
import { UniquenessValidator } from './uniqueness-validator.directive';

@Component({
  selector: 'app-add-number',
  templateUrl: './add-number.component.html',
  styleUrls: ['./add-number.component.scss'],
})
export class AddNumberComponent {
  public formGroup: FormGroup<AddNumberFormGroupInterface> = this.formBuilder.group({
    number: [
      {
        value: this.data?.carNumber?.number || '',
        disabled: !!this.data?.isEdit,
      },
      [
        Validators.required,
        Validators.pattern(/^[A-Z]{3}\d{3}$/),
      ],
      [UniquenessValidator.checkUniqueness(this.addNumbersService)]
    ],
    holder: [this.data?.carNumber?.holder || '', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddNumberComponent>,
    private addNumbersService: AddNumbersService,
    @Inject(MAT_DIALOG_DATA)
    private data: { carNumber: CarNumberInterface; isEdit: boolean } | null
  ) {}

  public get isEdit(): boolean {
    return !!this.data?.isEdit
  }

  public onSubmit(): void {
    this.dialogRef.close({ ...this.formGroup.getRawValue() });
  }
}
