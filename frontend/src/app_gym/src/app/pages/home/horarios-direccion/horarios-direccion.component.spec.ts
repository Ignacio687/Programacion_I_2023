import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosDireccionComponent } from './horarios-direccion.component';

describe('HorariosDireccionComponent', () => {
  let component: HorariosDireccionComponent;
  let fixture: ComponentFixture<HorariosDireccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorariosDireccionComponent]
    });
    fixture = TestBed.createComponent(HorariosDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
