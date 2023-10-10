import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateRegisterButtonComponent } from './generate-register-button.component';

describe('GenerateRegisterButtonComponent', () => {
  let component: GenerateRegisterButtonComponent;
  let fixture: ComponentFixture<GenerateRegisterButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateRegisterButtonComponent]
    });
    fixture = TestBed.createComponent(GenerateRegisterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
