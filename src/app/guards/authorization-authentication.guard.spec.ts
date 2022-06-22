import { TestBed } from '@angular/core/testing';

import { AuthorizationAuthenticationGuard } from './authorization-authentication.guard';

describe('AuthorizationAuthenticationGuard', () => {
  let guard: AuthorizationAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizationAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
