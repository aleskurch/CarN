import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderActions } from '../../../state/header/header.actions';

import { CarNumberToAdd } from '../../interfaces/car-number.interface';

@Component({
  selector: 'app-header-container',
  template: `<app-header
    (addNewNumber)="onAddEventNumber($event)"
  ></app-header>`,
})
export class HeaderContainerComponent {
  constructor(private store: Store) {}

  public onAddEventNumber(newNumber: CarNumberToAdd): void {
    this.store.dispatch(
      HeaderActions.addCarNumberRequest({
        carNumber: { ...newNumber, registerDate: new Date() },
      })
    );
  }
}
