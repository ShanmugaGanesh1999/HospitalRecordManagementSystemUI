import { TestBed } from '@angular/core/testing';

import { AddPatientService } from './add-patient.service';

describe('AddPatientService', () => {
  let service: AddPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
