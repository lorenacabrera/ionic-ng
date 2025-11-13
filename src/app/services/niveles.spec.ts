import { TestBed } from '@angular/core/testing';

import { Niveles } from './niveles';

describe('Niveles', () => {
  let service: Niveles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Niveles);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
