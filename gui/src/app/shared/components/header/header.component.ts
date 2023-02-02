import {
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

import { CarNumberToAddInterface } from '../../interfaces/car-number.interface';
import { LoadingStatusInterface } from '../../interfaces/loading-status-interface';
import { AddNumberComponent } from '../add-number-modal/add-number.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  @Input() public addCarNumberLoadingStatus!: LoadingStatusInterface | null;

  @Output() public addNewNumber: EventEmitter<CarNumberToAddInterface> =
    new EventEmitter<CarNumberToAddInterface>();
  @Output() public askStatusDrop: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.addCarNumberLoadingStatus && this.addCarNumberLoadingStatus?.error) {
      this.snackBar.open('Add felt. Pleas try later', 'Ok', {
        duration: 6000,
      });
      this.askStatusDrop.emit();
    }
  }

  public onAddNumber(): void {
    this.dialog
      .open(AddNumberComponent, {
        width: '50vw',
        minWidth: '20rem',
        autoFocus: false,
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((newNumber: CarNumberToAddInterface) => this.addNewNumber.emit(newNumber))
      )
      .subscribe();
  }
}
