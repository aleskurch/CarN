import { ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { createComponentFactory, mockProvider, Spectator, SpyObject, } from '@ngneat/spectator/jest';

import { CAR_NUMBER_TO_ADD_MOCK } from "../../mocks/car-number-to-add-mock";
import { AddNumberComponent } from "./add-number.component";
import { AddNumbersService } from "./services/add-numbers.service";


describe('AddNumberComponent', () => {
  let spectator: Spectator<AddNumberComponent>;
  let component: AddNumberComponent;
  let dialogRefSpy: SpyObject<MatDialogRef<AddNumberComponent>>

  const createComponent = createComponentFactory<AddNumberComponent>({
    component: AddNumberComponent,
    providers: [
      mockProvider(MatDialogRef, {
        close: jest.fn()
      }),
      mockProvider(AddNumbersService),
      { provide: MAT_DIALOG_DATA, useValue: {isEdit: true, carNumber: CAR_NUMBER_TO_ADD_MOCK} },
    ],
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    dialogRefSpy = spectator.inject(MatDialogRef);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('should be initialized', () => {
    it('component should exists', () => {
      expect(component).toBeDefined();
    });
  });

  describe('isEdit', () => {
    it('should exists', () => {
      expect(component.isEdit).toBeDefined();
    });

    it('should check is edit mode', () => {
      expect(component.isEdit).toBe(true);
    });
  });

  describe('onSubmit', () => {
    it('should exists', () => {
      expect(component.onSubmit).toBeDefined();
    });

    it('should submit edited/added car umber', () => {
      const spy = jest.spyOn(dialogRefSpy, 'close');

      component.onSubmit();

      expect(spy).toHaveBeenCalledWith(CAR_NUMBER_TO_ADD_MOCK);
    });
  });
});
