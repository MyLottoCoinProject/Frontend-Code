import { TestBed } from '@angular/core/testing';

import { PowerballMetamaskService } from './powerball-metamask.service';

describe('PowerballMetamaskService', () => {
  let service: PowerballMetamaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerballMetamaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
