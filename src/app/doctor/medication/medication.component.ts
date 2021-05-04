import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css'],
})
export class MedicationComponent implements OnInit {
  prescription = new FormControl('', [Validators.required]);
  complication = new FormControl('', [Validators.required]);
  addPatientMedicationForm: FormGroup;
  submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<MedicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addPatientMedicationForm = new FormGroup({
      prescription: this.prescription,
      complication: this.complication,
    });
  }

  // get f() {
  //   return this.addPatientMedicationForm.controls;
  // }

  ngOnInit(): void {}

  onClickSave() {
    // console.log(this.submitted, this.addPatientMedicationForm.invalid);
    this.submitted = true;
    // if (this.addPatientMedicationForm.invalid) {
    //   // alert('Please enter all details');
    //   return;
    // }
    console.log('patientId', this.data);
  }
}
