import { fakeAsync, tick } from '@angular/core/testing';
import { FormControl, ValidationErrors } from '@angular/forms';
import {
  createDirectiveFactory,
  mockProvider,
  SpectatorDirective,
  SpyObject,
} from '@ngneat/spectator/jest';
import { asyncScheduler, Observable, scheduled, Subscription } from 'rxjs';

import { AddNumbersService } from './services/add-numbers.service';
import { UniquenessValidator } from './uniqueness-validator.directive';

describe('UniquenessValidator', () => {
  let spectator: SpectatorDirective<UniquenessValidator>;
  let instance: UniquenessValidator;

  let addNumbersServiceSpy: SpyObject<AddNumbersService>;
  let subscription: Subscription;

  const createDirective = createDirectiveFactory({
    directive: UniquenessValidator,
    template: '<span appUniquenessValidator></span>',
    providers: [
      mockProvider(AddNumbersService, {
        isUnique: jest.fn().mockReturnValue(scheduled([true], asyncScheduler)),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createDirective();
    instance = spectator.directive;

    addNumbersServiceSpy = spectator.inject(AddNumbersService);
    subscription = new Subscription();
  });

  afterEach(() => {
    jest.clearAllMocks();
    subscription.unsubscribe();
  });

  describe('should be initialized', () => {
    it('instance should exists', () => {
      expect(instance).toBeDefined();
    });
  });

  describe('checkUniqueness', () => {
    it('should exists', () => {
      expect(UniquenessValidator.checkUniqueness).toBeDefined();
    });

    it('should check is edit mode', fakeAsync(() => {
      const sub = (
        UniquenessValidator.checkUniqueness(addNumbersServiceSpy)(
          new FormControl('value')
        ) as Observable<ValidationErrors>
      ).subscribe((val) => {
        expect(val).toEqual({
          numberAlreadyExists: true,
        });
      });

      tick();

      subscription.add(sub);
    }));
  });
});
