import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
  SpyObject,
} from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { CAR_NUMBER_TO_ADD_MOCK } from "../../shared/mocks/car-number-to-add-mock";
import { LOADING_STATUS_ERROR_MOCK } from '../../shared/mocks/loading-status-error-mock';
import { SnackBarMock } from '../../shared/mocks/snack-bar-mock';

describe('DashboardComponent', () => {
  let spectator: Spectator<DashboardComponent>;
  let component: DashboardComponent;
  let snackBarMock: SpyObject<MatSnackBar>;

  const createComponent = createComponentFactory<DashboardComponent>({
    component: DashboardComponent,
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
    imports: [MatDialogModule, MatProgressSpinnerModule, MatIconModule],
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
    it('should exists', () => {
      expect(component.ngOnChanges).toBeDefined();
    });

    it('should ask toolbar if car numbers loading error', () => {
      const spy = jest.spyOn(snackBarMock, 'open');

      spectator.setInput({
        carNumbersLoadingStatus: LOADING_STATUS_ERROR_MOCK,
      });

      expect(spy).toHaveBeenCalledWith(
        ...SnackBarMock('Numbers loading felt. Pleas try to refresh the page')
      );
    });

    it('should ask toolbar if edit car numbers error', () => {
      const spy = jest.spyOn(snackBarMock, 'open');

      spectator.setInput({
        editNumbersLoadingStatus: LOADING_STATUS_ERROR_MOCK,
      });

      expect(spy).toHaveBeenCalledWith(
        ...SnackBarMock('Edit felt. Pleas try later')
      );
    });

    it('should ask toolbar if delete car numbers error', () => {
      const spy = jest.spyOn(snackBarMock, 'open');

      spectator.setInput({
        deleteNumbersLoadingStatus: LOADING_STATUS_ERROR_MOCK,
      });

      expect(spy).toHaveBeenCalledWith(
        ...SnackBarMock('Delete felt. Pleas try later')
      );
    });
  });

  describe('onEdit', () => {
    it('should exists', () => {
      expect(component.onEdit).toBeDefined();
    });

    it('component emit carNumber', () => {
      const spy = jest.spyOn(component.editCarNumber, 'emit')

      component.onEdit({...CAR_NUMBER_TO_ADD_MOCK, registerDate: new Date()})

      expect(spy).toHaveBeenCalledWith(CAR_NUMBER_TO_ADD_MOCK);
    });
  });

  describe('onDelete', () => {
    it('should exists', () => {
      expect(component.onDelete).toBeDefined();
    });

    it('component emit carNumber.number', () => {
      const spy = jest.spyOn(component.deleteCarNumber, 'emit')

      component.onDelete(CAR_NUMBER_TO_ADD_MOCK.number)

      expect(spy).toHaveBeenCalledWith(CAR_NUMBER_TO_ADD_MOCK.number);
    });
  });
});
