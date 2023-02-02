import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
  SpyObject,
} from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { CAR_NUMBER_TO_ADD_MOCK } from "../../mocks/car-number-to-add-mock";
import { LOADING_STATUS_ERROR_MOCK } from "../../mocks/loading-status-error-mock";
import { SnackBarMock } from "../../mocks/snack-bar-mock";
import { HeaderComponent } from "./header.component";


describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  let component: HeaderComponent;
  let snackBarMock: SpyObject<MatSnackBar>;

  const createComponent = createComponentFactory<HeaderComponent>({
    component: HeaderComponent,
    providers: [
      mockProvider(MatSnackBar, {
        open: jest.fn(),
      }),
      mockProvider(MatDialog, {
        open: jest.fn().mockReturnValue({
          afterClosed: () => of(CAR_NUMBER_TO_ADD_MOCK),
        }),
      }),
    ],
    imports: [MatDialogModule, MatIconModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    snackBarMock = spectator.inject(MatSnackBar);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('should be initialized', () => {
    it('component should exists', () => {
      expect(component).toBeDefined();
    });
  });

  describe('ngOnChanges', () => {
    it('component should exists', () => {
      expect(component.ngOnChanges).toBeDefined();
    });

    it('should ask toolbar if add car numbers error', () => {
      const spy = jest.spyOn(snackBarMock, 'open');

      spectator.setInput({
        addCarNumberLoadingStatus: LOADING_STATUS_ERROR_MOCK,
      });

      expect(spy).toHaveBeenCalledWith(
        ...SnackBarMock('Add felt. Pleas try later')
      );
    });
  });

  describe('onAddNumber', () => {
    it('component should exists', () => {
      expect(component.onAddNumber).toBeDefined();
    });

    it('component emit carNumber', () => {
      const spy = jest.spyOn(component.addNewNumber, 'emit')

      component.onAddNumber()

      expect(spy).toHaveBeenCalledWith(CAR_NUMBER_TO_ADD_MOCK);
    });
  });
});
