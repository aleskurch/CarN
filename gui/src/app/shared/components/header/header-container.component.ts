import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { HeaderActions } from '../../../state/header/header.actions';
import { selectAddCarNumberLoadingStatus } from '../../../state/header/header.selectors';
import { CarNumberToAddInterface } from '../../interfaces/car-number.interface';
import { LoadingStatusInterface } from '../../interfaces/loading-status-interface';

@Component({
  selector: 'app-header-container',
  template: `<app-header
    [addCarNumberLoadingStatus]="addCarNumberLoadingStatus$ | async"
    (addNewNumber)="onAddEventNumber($event)"
    (askStatusDrop)="onStatusDrop()"
  ></app-header>`,
})
export class HeaderContainerComponent implements OnDestroy {
  public addCarNumberLoadingStatus$: Observable<LoadingStatusInterface | null>;

  constructor(private store: Store) {
    this.addCarNumberLoadingStatus$ = this.store.select(
      selectAddCarNumberLoadingStatus
    );
  }

  public onAddEventNumber(newNumber: CarNumberToAddInterface): void {
    this.store.dispatch(
      HeaderActions.addCarNumberRequest({
        carNumber: newNumber,
      })
    );
  }

  public onStatusDrop(): void {
    this.store.dispatch(HeaderActions.dropStatus());
  }

  ngOnDestroy(): void {
    this.onStatusDrop();
  }
}
