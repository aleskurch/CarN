import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';
import { Subscription } from 'rxjs';

import { environment } from "../../../../environments/environment";
import { CarNumberInterface } from "../../../interfaces/car-number.interface";
import { CAR_NUMBER_TO_ADD_MOCK } from "../../../mocks/car-number-to-add-mock";

import { HeaderService } from "./header.service";

describe('HeaderService', () => {
  let spectator: SpectatorHttp<HeaderService>;
  let service: HeaderService;
  let subscription: Subscription;

  const createService = createHttpFactory({
    service: HeaderService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;

    subscription = new Subscription();
  });

  describe('should be initialized', () => {
    it('component should exists', () => {
      expect(service).toBeDefined();
    });
  });

  describe('addCarNumber', () => {
    it('component should exists', () => {
      expect(service.addCarNumber).toBeDefined();
    });

    it('should call api post/car-numbers', fakeAsync(() => {
      const createdDate: CarNumberInterface = {...CAR_NUMBER_TO_ADD_MOCK, registerDate: new Date()}
      const sub = service.addCarNumber(CAR_NUMBER_TO_ADD_MOCK).subscribe((response) => {
        expect(response).toEqual(createdDate);
      });

      tick();

      subscription.add(sub);

      const req = spectator.expectOne(
        `${environment.apiUrl}car-numbers`,
        HttpMethod.POST
      );
      req.flush(createdDate);
    }));
  });
});
