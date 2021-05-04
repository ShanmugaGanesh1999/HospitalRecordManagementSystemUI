import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-finished-medication',
  templateUrl: './finished-medication.component.html',
  styleUrls: ['./finished-medication.component.css'],
})
export class FinishedMedicationComponent implements OnInit {
  prescription = new FormControl('');
  complication = new FormControl('');
  addPatientMedicationForm1: FormGroup;
  result: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<FinishedMedicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private doctorService: DoctorService,
    private _snackBar: MatSnackBar
  ) {
    this.addPatientMedicationForm1 = new FormGroup({
      prescription: this.prescription,
      complication: this.complication,
    });
    console.log(this.data[0]);
    this.prescription.setValue(this.data[0]);
    this.complication.setValue(this.data[1]);
  }
  ngOnInit(): void {}
}
