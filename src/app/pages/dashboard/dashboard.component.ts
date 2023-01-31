import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, tap } from 'rxjs';
import { AddNumberComponent } from '../../shared/components/add-number-modal/add-number.component';
import {
  CarNumberToAdd,
  ICarNumber,
} from '../../shared/interfaces/car-number.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  @Input() public carNumbers!: ICarNumber[] | null;

  @Output() public deleteCarNumber: EventEmitter<ICarNumber> =
    new EventEmitter<ICarNumber>();
  @Output() public editCarNumber: EventEmitter<ICarNumber> =
    new EventEmitter<ICarNumber>();

  constructor(private matDialog: MatDialog) {}

  public onEdit(carNumber: ICarNumber): void {
    this.matDialog
      .open(AddNumberComponent, {
        data: {carNumber, isEditable: true},
        width: '50vw',
        autoFocus: false,
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((editedCarNumber: CarNumberToAdd) =>
          this.editCarNumber.emit({
            ...editedCarNumber,
            registerDate: carNumber.registerDate,
          })
        )
      )
      .subscribe();
  }

  public onDelete(carNumber: ICarNumber): void {
    this.deleteCarNumber.emit(carNumber);
  }
}
