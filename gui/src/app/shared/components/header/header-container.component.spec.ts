import { fakeAsync, tick } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import {
  Spectator,
  createComponentFactory,
  mockProvider,
  SpyObject,
} from '@ngneat/spectator/jest';
import { Store } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { of, Subscription } from 'rxjs';

import { HeaderActions } from '../../../state/header/header.actions';
import { CAR_NUMBER_TO_ADD_MOCK } from '../../mocks/car-number-to-add-mock';
import { HeaderContainerComponent } from './header-container.component';
import { HeaderComponent } from './header.component';

describe('HeaderContainerComponent', () => {
  let spectator: Spectator<HeaderContainerComponent>;
  let component: HeaderContainerComponent;

  let storeSpy: SpyObject<Store>;
  let subscription: Subscription;

  const createComponent = createComponentFactory<HeaderContainerComponent>({
    component: HeaderContainerComponent,
    providers: [
      mockProvider(Store, {
        dispatch: jest.fn(),
        select: jest.fn().mockReturnValue(of(true)),
      }),
    ],
    declarations: [MockComponent(HeaderComponent)],
    imports: [MatDialogModule],
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

    it('should select values to addCarNumberLoadingStatus$', fakeAsync(() => {
      const sub = component.addCarNumberLoadingStatus$.subscribe((val) => {
        expect(val).toBe(true);
      });

      tick();

      subscription.add(sub);
    }));
  });

  describe('onAddEventNumber', () => {
    it('component should exists', () => {
      expect(component.onAddEventNumber).toBeDefined();
    });

    it('component dispatch addCarNumberRequest', () => {
      const spy = jest.spyOn(storeSpy, 'dispatch');

      component.onAddEventNumber(CAR_NUMBER_TO_ADD_MOCK);

      expect(spy).toHaveBeenCalledWith(
        HeaderActions.addCarNumberRequest({
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

      expect(spy).toHaveBeenCalledWith(HeaderActions.dropLoadingStatus());
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
