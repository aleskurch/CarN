import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNumberComponent } from './add-number-modal/add-number/add-number.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) {}

  public onAddNumber(): void {
    this.dialog
      .open(AddNumberComponent, {
        width: '50vw',
        autoFocus: false
      })
      .afterClosed()
      .subscribe();
  }
}
