import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectorButtonComponent } from './form-selector-button.component';

describe('FormSelectorButtonComponent', () => {
  let component: FormSelectorButtonComponent;
  let fixture: ComponentFixture<FormSelectorButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSelectorButtonComponent]
    });
    fixture = TestBed.createComponent(FormSelectorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
