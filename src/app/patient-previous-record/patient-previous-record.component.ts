import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PatientPreviousRecordService } from './patient-previous-record.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.patientPreviousRecordService.getDetails(this.data.details).subscribe(
      (data: any) => {
        this.details = data.data;
        console.log(this.details);
      },
      (error: any) => {
        console.log(error.message);
        this._snackBar.open('No record found', 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
