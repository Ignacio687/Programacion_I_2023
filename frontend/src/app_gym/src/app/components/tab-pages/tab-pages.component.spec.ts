import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPagesComponent } from './tab-pages.component';

describe('TabPagesComponent', () => {
  let component: TabPagesComponent;
  let fixture: ComponentFixture<TabPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabPagesComponent]
    });
    fixture = TestBed.createComponent(TabPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
