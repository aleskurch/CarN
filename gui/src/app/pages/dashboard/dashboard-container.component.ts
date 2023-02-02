import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CarNumberInterface, CarNumberToAddInterface } from '../../shared/interfaces/car-number.interface';
import { LoadingStatusInterface } from '../../shared/interfaces/loading-status-interface';
import {
  selectCarNumbers,
  selectCarNumbersLoadingStatus,
  selectEditCarNumbersLoadingStatus,
  selectDeleteCarNumbersLoadingStatus,
} from '../../state/dashboard/dashboard.selectors';
import { DashboardActions } from '../../state/dashboard/dashboard.actions';

@Component({
  selector: 'app-dashboard-container',
  template: `<app-dashboard
    [carNumbers]="carNumbers$ | async"
    [carNumbersLoadingStatus]="carNumbersLoadingStatus$ | async"
    [editNumbersLoadingStatus]="editCarNumbersLoadingStatus$ | async"
    [deleteNumbersLoadingStatus]="deleteCarNumbersLoadingStatus$ | async"
    (deleteCarNumber)="onDeleteCarNumber($event)"
    (editCarNumber)="onEditCarNumber($event)"
    (askStatusesDrop)="onStatusDrop()"
  ></app-dashboard>`,
})
export class DashboardContainerComponent implements OnInit, OnDestroy {
  public carNumbers$: Observable<CarNumberInterface[] | null>;
  public carNumbersLoadingStatus$: Observable<LoadingStatusInterface | null>;
  public editCarNumbersLoadingStatus$: Observable<LoadingStatusInterface | null>;
  public deleteCarNumbersLoadingStatus$: Observable<LoadingStatusInterface | null>;

  constructor(private store: Store) {
    this.carNumbers$ = this.store.select(selectCarNumbers);
    this.carNumbersLoadingStatus$ = this.store.select(
      selectCarNumbersLoadingStatus
    );
    this.editCarNumbersLoadingStatus$ = this.store.select(
      selectEditCarNumbersLoadingStatus
    );
    this.deleteCarNumbersLoadingStatus$ = this.store.select(
      selectDeleteCarNumbersLoadingStatus
    );
  }

  public ngOnInit(): void {
    this.store.dispatch(DashboardActions.getCarNumbersRequest());
  }

  public onDeleteCarNumber(deletingCarNumber: string): void {
    this.store.dispatch(
      DashboardActions.deleteCarNumberRequest({ carNumber: deletingCarNumber })
    );
  }

  public onEditCarNumber(editingCarNumber: CarNumberToAddInterface): void {
    this.store.dispatch(
      DashboardActions.editCarNumberRequest({ carNumber: editingCarNumber })
    );
  }

  public onStatusDrop(): void {
    this.store.dispatch(DashboardActions.dropLoadingStatuses());
  }

  public ngOnDestroy(): void {
    this.onStatusDrop()
  }
}
