import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddPatientService } from './add-patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css'],
})
export class AddPatientComponent implements OnInit {
  submitted: boolean = false;
  pname = new FormControl('');
  emailId = new FormControl('', [Validators.required, Validators.email]);
  mobileNo = new FormControl('');
  gender = new FormControl();
  dob = new FormControl();
  saveBtn: boolean = true;
  addPatientForm: FormGroup;

  constructor(private addPatientService: AddPatientService) {
    this.addPatientForm = new FormGroup({
      pname: this.pname,
      emailId: this.emailId,
      mobileNo: this.mobileNo,
      gender: this.gender,
      dob: this.dob,
    });
  }

  get f() {
    return this.addPatientForm.controls;
  }

  onClickSave() {
    this.addPatientService
      .addPatient({
        pname: this.pname.value,
        emailId: this.emailId.value,
        mobileNo: this.mobileNo.value,
        gender: this.gender.value,
        dob: this.dob.value,
      })
      .subscribe(
        (data: any) => {
          alert('Patient added');
          this.submitted = true;
        },
        (error: any) => {
          console.log(error.message);
        }
      );
    console.log(this.submitted);
  }

  ngOnInit(): void {}
}
