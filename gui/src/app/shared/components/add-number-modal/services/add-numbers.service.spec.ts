import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';
import { Subscription } from 'rxjs';

import { environment } from "../../../../environments/environment";
import { CAR_NUMBER_TO_ADD_MOCK } from "../../../mocks/car-number-to-add-mock";
import { AddNumbersService } from "./add-numbers.service";

describe('AddNumbersService', () => {
  let spectator: SpectatorHttp<AddNumbersService>;
  let service: AddNumbersService;
  let subscription: Subscription;

  const createService = createHttpFactory({
    service: AddNumbersService,
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

  describe('isUnique', () => {
    it('should exists', () => {
      expect(service.isUnique).toBeDefined();
    });

    it('should call api get/car-numbers?:id', fakeAsync(() => {
      const sub = service.isUnique(CAR_NUMBER_TO_ADD_MOCK.number).subscribe((response) => {
        expect(response).toEqual(false);
      });

      tick();

      subscription.add(sub);

      const req = spectator.expectOne(
        `${environment.apiUrl}car-numbers?carNumber=${CAR_NUMBER_TO_ADD_MOCK.number}`,
        HttpMethod.GET
      );
      req.flush({valid: true});
    }));
  });
});
