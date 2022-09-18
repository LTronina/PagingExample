import { TestBed } from '@angular/core/testing';

import { LtComponentsLibService } from './lt-components-lib.service';

describe('LtComponentsLibService', () => {
  let service: LtComponentsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LtComponentsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
