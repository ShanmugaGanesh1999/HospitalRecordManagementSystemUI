import { TestBed } from '@angular/core/testing';

import { FixAppointmentService } from './fix-appointment.service';

describe('FixAppointmentService', () => {
  let service: FixAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
