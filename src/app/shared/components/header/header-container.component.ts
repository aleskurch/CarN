import { Component } from '@angular/core';
import { IAddingCarNumber } from "./interfaces/adding-car-number.interface";

@Component({
  selector: 'app-header-container',
  template: `<app-header (addNewNumber)="onAddEventNumber($event)"></app-header>`,
})
export class HeaderContainerComponent  {
  public onAddEventNumber(newNumber: IAddingCarNumber): void {
    console.log(newNumber);
  }
}
