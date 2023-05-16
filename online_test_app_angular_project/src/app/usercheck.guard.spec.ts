import { TestBed } from '@angular/core/testing';

import { UsercheckGuard } from './usercheck.guard';

describe('UsercheckGuard', () => {
  let guard: UsercheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsercheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
