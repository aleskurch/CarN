import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, tap } from 'rxjs';

import { AddNumberComponent } from '../../shared/components/add-number-modal/add-number.component';
import {
  CarNumberToAddInterface,
  CarNumberInterface,
} from '../../shared/interfaces/car-number.interface';
import { LoadingStatusInterface } from '../../shared/interfaces/loading-status-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnChanges {
  @Input() public carNumbers!: CarNumberInterface[] | null;
  @Input() public carNumbersLoadingStatus!: LoadingStatusInterface | null;
  @Input() public editNumbersLoadingStatus!: LoadingStatusInterface | null;
  @Input() public deleteNumbersLoadingStatus!: LoadingStatusInterface | null;

  @Output() public deleteCarNumber: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() public editCarNumber: EventEmitter<CarNumberToAddInterface> =
    new EventEmitter<CarNumberToAddInterface>();
  @Output() public askStatusesDrop: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(private matDialog: MatDialog, private snackBar: MatSnackBar) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.carNumbersLoadingStatus &&
      this.carNumbersLoadingStatus?.error
    ) {
      this.snackBar.open(
        'Numbers loading felt. Pleas try to refresh the page',
        'Ok',
        { duration: 6000 }
      );
    }

    if (
      changes.editNumbersLoadingStatus &&
      this.editNumbersLoadingStatus?.error
    ) {
      this.snackBar.open('Edit felt. Pleas try later', 'Ok', {
        duration: 6000,
      });
      this.askStatusesDrop.emit();
    }

    if (
      changes.deleteNumbersLoadingStatus &&
      this.deleteNumbersLoadingStatus?.error
    ) {
      this.snackBar.open('Delete felt. Pleas try later', 'Ok', {
        duration: 6000,
      });
      this.askStatusesDrop.emit();
    }
  }

  public onEdit(carNumber: CarNumberInterface): void {
    this.matDialog
      .open(AddNumberComponent, {
        data: { carNumber, isEdit: true },
        width: '50vw',
        autoFocus: false,
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((editedCarNumber: CarNumberToAddInterface) =>
          this.editCarNumber.emit(editedCarNumber)
        )
      )
      .subscribe();
  }

  public onDelete(carNumber: string): void {
    this.deleteCarNumber.emit(carNumber);
  }
}
