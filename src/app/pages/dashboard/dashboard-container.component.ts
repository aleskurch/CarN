import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ICarNumber } from "../../shared/interfaces/car-number.interface";
import { selectCarNumbers } from '../../state/dashboard/dashboard.selectors';
import { DashboardActions } from '../../state/dashboard/dashboard.actions';

@Component({
  selector: 'app-dashboard-container',
  template: `<app-dashboard
    [carNumbers]="carNumbers$ | async"
  ></app-dashboard>`,
})
export class DashboardContainerComponent implements OnInit {
  public carNumbers$: Observable<ICarNumber[] | null>;

  constructor(private store: Store) {
    this.carNumbers$ = this.store.select(selectCarNumbers);
  }

  public ngOnInit(): void {
    this.store.dispatch(DashboardActions.getCarNumbersRequest());
  }
}
