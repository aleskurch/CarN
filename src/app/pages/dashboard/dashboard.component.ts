import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICarNumber } from "./interfaces/car-number.interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  @Input() public carNumbers!: ICarNumber[] | null;
}
