import { TestBed, inject } from '@angular/core/testing';

import { RegistrationFormService } from './registration-form.service';

describe('RegistrationFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistrationFormService]
    });
  });

  it('should be created', inject([RegistrationFormService], (service: RegistrationFormService) => {
    expect(service).toBeTruthy();
  }));
});
