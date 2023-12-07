import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { recoverPassGuard } from './recover-pass.guard';

describe('recoverPassGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => recoverPassGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
