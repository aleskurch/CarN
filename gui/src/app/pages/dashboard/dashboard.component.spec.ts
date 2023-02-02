import { MatDialogModule } from "@angular/material/dialog";
import { Spectator } from "@ngneat/spectator";
import { createComponentFactory } from "@ngneat/spectator/jest";

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let spectator: Spectator<DashboardComponent>;
  let component: DashboardComponent;
  const createComponent = createComponentFactory<DashboardComponent>({
    component: DashboardComponent,
    imports: [MatDialogModule]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  describe("should be initialized", () => {
    it('component should exists', () => {
      expect(component).toBeDefined();
    })
  })
});
