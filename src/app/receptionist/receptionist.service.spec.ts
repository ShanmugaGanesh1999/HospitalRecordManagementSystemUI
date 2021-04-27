import { TestBed } from '@angular/core/testing';

import { ReceptionistService } from './receptionist.service';

describe('ReceptionistService', () => {
  let service: ReceptionistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceptionistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
