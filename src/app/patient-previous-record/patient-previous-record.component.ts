import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PatientPreviousRecordService } from './patient-previous-record.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../app.service';

@Component({
  selector: 'app-patient-previous-record',
  templateUrl: './patient-previous-record.component.html',
  styleUrls: ['./patient-previous-record.component.css'],
})
export class PatientPreviousRecordComponent implements OnInit {
  details: any;
  constructor(
    private patientPreviousRecordService: PatientPreviousRecordService,
    public dialogRef: MatDialogRef<PatientPreviousRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getDetails();
    }, 0);
  }

  getDetails() {
    this.appService.loading = true;
    this.patientPreviousRecordService.getDetails(this.data.details).subscribe(
      (data: any) => {
        this.appService.loading = false;
        this.details = data.data;
      },
      (error: any) => {
        this.appService.loading = false;
        this._snackBar.open('No record found', 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
