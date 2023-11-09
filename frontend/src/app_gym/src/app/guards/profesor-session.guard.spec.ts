import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profesorSessionGuard } from './profesor-session.guard';

describe('profesorSessionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profesorSessionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
