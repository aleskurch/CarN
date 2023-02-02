import { fakeAsync, tick } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
  SpyObject,
} from '@ngneat/spectator/jest';
import { Store } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { of, Subscription } from 'rxjs';

import { DashboardContainerComponent } from './dashboard-container.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardActions } from '../../state/dashboard/dashboard.actions';
import { CAR_NUMBER_TO_ADD_MOCK } from '../../shared/mocks/car-number-to-add-mock';

describe('DashboardContainerComponent', () => {
  let spectator: Spectator<DashboardContainerComponent>;
  let component: DashboardContainerComponent;

  let storeSpy: SpyObject<Store>;
  let subscription: Subscription;

  const createComponent = createComponentFactory<DashboardContainerComponent>({
    component: DashboardContainerComponent,
    providers: [
      mockProvider(Store, {
        dispatch: jest.fn(),
        select: jest.fn().mockReturnValue(of(true)),
      }),
    ],
    declarations: [MockComponent(DashboardComponent)],
    imports: [MatDialogModule, MatProgressSpinnerModule, MatIconModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    storeSpy = spectator.inject(Store);
    subscription = new Subscription();
  });

  afterEach(() => {
    jest.clearAllMocks();
    subscription.unsubscribe();
  });

  describe('should be initialized', () => {
    it('component should exists', () => {
      expect(component).toBeDefined();
    });

    it('should select values to carNumbers$', fakeAsync(() => {
      const sub = component.carNumbers$.subscribe((val) => {
        expect(val).toBe(true);
      });

      tick();

      subscription.add(sub);
    }));

    it('should select values to carNumbersLoadingStatus$', fakeAsync(() => {
      const sub = component.carNumbersLoadingStatus$.subscribe((val) => {
        expect(val).toBe(true);
      });

      tick();

      subscription.add(sub);
    }));

    it('should select values to editCarNumbersLoadingStatus$', fakeAsync(() => {
      const sub = component.editCarNumbersLoadingStatus$.subscribe((val) => {
        expect(val).toBe(true);
      });

      tick();

      subscription.add(sub);
    }));

    it('should select values to deleteCarNumbersLoadingStatus$', fakeAsync(() => {
      const sub = component.deleteCarNumbersLoadingStatus$.subscribe((val) => {
        expect(val).toBe(true);
      });

      tick();

      subscription.add(sub);
    }));
  });

  describe('ngOnInit', () => {
    it('component should exists', () => {
      expect(component.ngOnInit).toBeDefined();
    });

    it('component dispatch getCarNumbersRequest', () => {
      const spy = jest.spyOn(storeSpy, 'dispatch');

      expect(spy).toHaveBeenCalledWith(DashboardActions.getCarNumbersRequest());
    });
  });

  describe('onDeleteCarNumber', () => {
    it('component should exists', () => {
      expect(component.onDeleteCarNumber).toBeDefined();
    });

    it('component dispatch deleteCarNumberRequest', () => {
      const spy = jest.spyOn(storeSpy, 'dispatch');

      component.onDeleteCarNumber(CAR_NUMBER_TO_ADD_MOCK.number);

      expect(spy).toHaveBeenCalledWith(
        DashboardActions.deleteCarNumberRequest({
          carNumber: CAR_NUMBER_TO_ADD_MOCK.number,
        })
      );
    });
  });

  describe('onEditCarNumber', () => {
    it('component should exists', () => {
      expect(component.onEditCarNumber).toBeDefined();
    });

    it('component dispatch editCarNumberRequest', () => {
      const spy = jest.spyOn(storeSpy, 'dispatch');

      component.onEditCarNumber(CAR_NUMBER_TO_ADD_MOCK);

      expect(spy).toHaveBeenCalledWith(
        DashboardActions.editCarNumberRequest({
          carNumber: CAR_NUMBER_TO_ADD_MOCK,
        })
      );
    });
  });

  describe('onStatusDrop', () => {
    it('component should exists', () => {
      expect(component.onStatusDrop).toBeDefined();
    });

    it('component dispatch dropLoadingStatuses', () => {
      const spy = jest.spyOn(storeSpy, 'dispatch');

      component.onStatusDrop();

      expect(spy).toHaveBeenCalledWith(DashboardActions.dropLoadingStatuses());
    });
  });

  describe('ngOnDestroy', () => {
    it('component should exists', () => {
      expect(component.ngOnDestroy).toBeDefined();
    });

    it('component call onStatusDrop', () => {
      const spy = jest.spyOn(component, 'onStatusDrop');

      component.ngOnDestroy();

      expect(spy).toHaveBeenCalled();
    });
  });
});
