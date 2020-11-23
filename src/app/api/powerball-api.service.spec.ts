import { TestBed } from '@angular/core/testing';

import { PowerballApiService } from './powerball-api.service';

describe('PowerballApiService', () => {
  let service: PowerballApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerballApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
