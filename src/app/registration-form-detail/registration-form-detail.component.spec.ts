import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormDetailComponent } from './registration-form-detail.component';

describe('RegistrationFormDetailComponent', () => {
  let component: RegistrationFormDetailComponent;
  let fixture: ComponentFixture<RegistrationFormDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFormDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
