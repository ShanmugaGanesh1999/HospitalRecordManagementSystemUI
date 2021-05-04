import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedMedicationComponent } from './finished-medication.component';

describe('FinishedMedicationComponent', () => {
  let component: FinishedMedicationComponent;
  let fixture: ComponentFixture<FinishedMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedMedicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
