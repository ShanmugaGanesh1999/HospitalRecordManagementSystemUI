import { TestBed } from '@angular/core/testing';

import { PatientPreviousRecordService } from './patient-previous-record.service';

describe('PatientPreviousRecordService', () => {
  let service: PatientPreviousRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientPreviousRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
