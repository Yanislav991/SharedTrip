import { TestBed } from '@angular/core/testing';

import { MyTripGuard } from './my-trip.guard';

describe('MyTripGuard', () => {
  let guard: MyTripGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MyTripGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
