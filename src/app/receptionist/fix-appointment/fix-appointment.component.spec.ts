import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixAppointmentComponent } from './fix-appointment.component';

describe('FixAppointmentComponent', () => {
  let component: FixAppointmentComponent;
  let fixture: ComponentFixture<FixAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
