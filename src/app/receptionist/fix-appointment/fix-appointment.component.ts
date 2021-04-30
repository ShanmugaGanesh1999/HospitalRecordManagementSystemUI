import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FixAppointmentService } from './fix-appointment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fix-appointment',
  templateUrl: './fix-appointment.component.html',
  styleUrls: ['./fix-appointment.component.css'],
})
export class FixAppointmentComponent implements OnInit {
  patient: any;
  doctors: any = [];
  status = 'Active';
  doctorId = new FormControl();
  appointmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FixAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fixAppointmentService: FixAppointmentService,
    private _snackBar: MatSnackBar
  ) {
    this.appointmentForm = new FormGroup({
      doctorId: this.doctorId,
    });
  }

  ngOnInit(): void {
    this.patient = this.data.details[0];
    //console.log(this.patient);
    this.getDoctorsByStatus();
  }

  getDoctorsByStatus() {
    this.fixAppointmentService.getDoctorsByStatus(this.status).subscribe(
      (data: any) => {
        this.doctors = data.data;
        //console.log(this.doctors);
      },
      (error: any) => {
        //console.log(error.message);
        this._snackBar.open(error.message, 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  onClickFix() {
    if (this.doctorId.value === '') {
      this.fixAppointmentService
        .fixAppointment({
          patientId: this.patient._id,
          doctorId: this.doctorId.value,
        })
        .subscribe(
          (data: any) => {
            //alert(data.message);
            this._snackBar.open('Appointment fixed!!!', 'close', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          (error: any) => {
            //console.log(error.message);
            this._snackBar.open(error.message, 'close', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        );
      //console.log(this.submitted);
    } else {
      this._snackBar.open('Choose a doctor to fix appointment', 'close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
