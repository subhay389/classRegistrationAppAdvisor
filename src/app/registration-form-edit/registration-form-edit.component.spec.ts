import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormEditComponent } from './registration-form-edit.component';

describe('RegistrationFormEditComponent', () => {
  let component: RegistrationFormEditComponent;
  let fixture: ComponentFixture<RegistrationFormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
