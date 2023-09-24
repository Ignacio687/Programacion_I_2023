import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesPlanComponent } from './clases-plan.component';

describe('ClasesPlanComponent', () => {
  let component: ClasesPlanComponent;
  let fixture: ComponentFixture<ClasesPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasesPlanComponent]
    });
    fixture = TestBed.createComponent(ClasesPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
