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
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-fix-appointment',
  templateUrl: './fix-appointment.component.html',
  styleUrls: ['./fix-appointment.component.css'],
})
export class FixAppointmentComponent implements OnInit {
  patient: any;
  activeDetails: any = [];
  doctors: any = [];
  status = 'Active';
  doctorId = new FormControl();
  appointmentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FixAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fixAppointmentService: FixAppointmentService,
    private _snackBar: MatSnackBar,
    private appService: AppService
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
        this.activeDetails = data.data;
        for (let i = 0; i < this.activeDetails.length; i++) {
          if (
            this.activeDetails[i].doctorName !== 'Management' &&
            this.activeDetails[i].doctorName !== 'Receptionist'
          ) {
            this.doctors.push(this.activeDetails[i]);
          }
        }
      },
      (error: any) => {
        this._snackBar.open(error.message, 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  onClickFix() {
    this.appService.loading = true;
    var state = 1;
    if (!this.doctorId.invalid) {
      this.fixAppointmentService
        .fixAppointment({
          patientId: this.patient._id,
          doctorId: this.doctorId.value,
        })
        .subscribe(
          (data: any) => {
            this.fixAppointmentService.updateCountByDate(state).subscribe(
              (data1: any) => {
                this.appService.loading = false;
                window.location.reload();
                this._snackBar.open('Appointment fixed!!!', 'close', {
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
              },
              (err: any) => {
                this.appService.loading = false;
                this._snackBar.open(
                  'Something went wrong. Appointment not fixed',
                  'close',
                  {
                    duration: 5000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                  }
                );
              }
            );
          },
          (error: any) => {
            this.appService.loading = false;
            this._snackBar.open(error.message, 'close', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        );
    } else {
      this._snackBar.open('Choose a doctor to fix appointment', 'close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
}
