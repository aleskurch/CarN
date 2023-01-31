import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, tap } from 'rxjs';

import { CarNumberToAdd } from "../../interfaces/car-number.interface";
import { AddNumberComponent } from '../add-number-modal/add-number.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() public addNewNumber: EventEmitter<CarNumberToAdd> =
    new EventEmitter<CarNumberToAdd>();

  constructor(public dialog: MatDialog) {}

  public onAddNumber(): void {
    this.dialog
      .open(AddNumberComponent, {
        width: '50vw',
        autoFocus: false,
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((newNumber: CarNumberToAdd) => this.addNewNumber.emit(newNumber))
      )
      .subscribe();
  }
}
