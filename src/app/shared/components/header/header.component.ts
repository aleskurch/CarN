import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, tap } from 'rxjs';
import { AddNumberComponent } from './add-number-modal/add-number/add-number.component';
import { IAddingCarNumber } from './interfaces/adding-car-number.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() public addNewNumber: EventEmitter<IAddingCarNumber> =
    new EventEmitter<IAddingCarNumber>();

  constructor(public dialog: MatDialog) {}

  public onAddNumber(): void {
    this.dialog
      .open(AddNumberComponent, {
        width: '50vw',
        autoFocus: false,
        panelClass: '.modal-panel',
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((newNumber: IAddingCarNumber) => this.addNewNumber.emit(newNumber))
      )
      .subscribe();
  }
}
