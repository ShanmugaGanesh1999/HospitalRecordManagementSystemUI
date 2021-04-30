import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPreviousRecordComponent } from './patient-previous-record.component';

describe('PatientPreviousRecordComponent', () => {
  let component: PatientPreviousRecordComponent;
  let fixture: ComponentFixture<PatientPreviousRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPreviousRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPreviousRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
