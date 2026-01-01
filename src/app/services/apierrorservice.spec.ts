import { TestBed } from '@angular/core/testing';

import { Apierrorservice } from './apierrorservice';

describe('Apierrorservice', () => {
  let service: Apierrorservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apierrorservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
