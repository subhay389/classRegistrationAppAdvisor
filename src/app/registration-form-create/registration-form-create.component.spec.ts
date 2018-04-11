import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormCreateComponent } from './registration-form-create.component';

describe('RegistrationFormCreateComponent', () => {
  let component: RegistrationFormCreateComponent;
  let fixture: ComponentFixture<RegistrationFormCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationFormCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
