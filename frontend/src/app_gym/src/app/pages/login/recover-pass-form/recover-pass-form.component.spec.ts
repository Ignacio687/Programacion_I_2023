import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPassFormComponent } from './recover-pass-form.component';
import { UserCredentialsComponent } from 'src/app/components/user-credentials/user-credentials.component';
describe('RecoverPassFormComponent', () => {
  let component: RecoverPassFormComponent;
  let fixture: ComponentFixture<RecoverPassFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverPassFormComponent]
    });
    fixture = TestBed.createComponent(RecoverPassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
