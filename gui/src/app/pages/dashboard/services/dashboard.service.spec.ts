import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';
import { Subscription } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CAR_NUMBER_TO_ADD_MOCK } from '../../../shared/mocks/car-number-to-add-mock';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let spectator: SpectatorHttp<DashboardService>;
  let service: DashboardService;
  let subscription: Subscription;

  const createService = createHttpFactory({
    service: DashboardService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;

    subscription = new Subscription();
  });

  describe('should be initialized', () => {
    it('service should exists', () => {
      expect(service).toBeDefined();
    });
  });

  describe('getCarNumbers', () => {
    it('should exists', () => {
      expect(service.getCarNumbers).toBeDefined();
    });

    it('should call api get/car-numbers', fakeAsync(() => {
      const sub = service.getCarNumbers().subscribe((response) => {
        expect(response).toEqual([CAR_NUMBER_TO_ADD_MOCK]);
      });

      tick();

      subscription.add(sub);

      const req = spectator.expectOne(
        `${environment.apiUrl}car-numbers`,
        HttpMethod.GET
      );
      req.flush({ carNumbers: [CAR_NUMBER_TO_ADD_MOCK] });
    }));
  });

  describe('deleteCarNumber', () => {
    it('should exists', () => {
      expect(service.deleteCarNumber).toBeDefined();
    });

    it('should call api delete/car-numbers', fakeAsync(() => {
      const sub = service
        .deleteCarNumber(CAR_NUMBER_TO_ADD_MOCK.number)
        .subscribe((response) => {
          expect(response).toBe(true);
        });

      tick();

      subscription.add(sub);

      const req = spectator.expectOne(
        `${environment.apiUrl}car-numbers?carNumber=${CAR_NUMBER_TO_ADD_MOCK.number}`,
        HttpMethod.DELETE
      );
      req.flush(true);
    }));
  });

  describe('editCarNumber', () => {
    it('should exists', () => {
      expect(service.editCarNumber).toBeDefined();
    });

    it('should call api patch/car-numbers', fakeAsync(() => {
      const sub = service
        .editCarNumber(CAR_NUMBER_TO_ADD_MOCK)
        .subscribe((response) => {
          expect(response).toBe(true);
        });

      tick();

      subscription.add(sub);

      const req = spectator.expectOne(
        `${environment.apiUrl}car-numbers`,
        HttpMethod.PATCH
      );
      req.flush(true);
    }));
  });
});
