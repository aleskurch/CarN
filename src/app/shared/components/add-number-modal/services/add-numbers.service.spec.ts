import { TestBed } from '@angular/core/testing';

import { AddNumbersService } from './add-numbers.service';

describe('AddNumbersService', () => {
  let service: AddNumbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNumbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
