import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumProfAdmComponent } from './alum-prof-adm.component';

describe('AlumProfAdmComponent', () => {
  let component: AlumProfAdmComponent;
  let fixture: ComponentFixture<AlumProfAdmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumProfAdmComponent]
    });
    fixture = TestBed.createComponent(AlumProfAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
