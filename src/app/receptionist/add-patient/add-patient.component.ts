import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddPatientService } from './add-patient.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { ReceptionistComponent } from '../receptionist.component';

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
  isEdit: any;

  constructor(
    private addPatientService: AddPatientService,
    public dialogRef: MatDialogRef<AddPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private appService: AppService,
    private receptionComponent: ReceptionistComponent
  ) {
    this.addPatientForm = new FormGroup({
      pname: this.pname,
      emailId: this.emailId,
      mobileNo: this.mobileNo,
      gender: this.gender,
      dob: this.dob,
    });
  }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    console.log(this.isEdit);
    if (this.isEdit === true) {
      this.pname.setValue(this.data.details.name);
      this.emailId.setValue(this.data.details.emailId);
      this.gender.setValue(this.data.details.gender);
      this.dob.setValue(this.data.details.dob);
      this.mobileNo.setValue(this.data.details.mobileNo);
    }
    this.data;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  getErrorMessage() {
    if (this.addPatientForm.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.emailId.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailId.hasError('email') ? 'Not a valid email' : '';
  }

  onClickSave() {
    this.appService.loading = true;
    if (this.isEdit) {
      if (
        this.pname.value === '' ||
        this.emailId.value === '' ||
        this.mobileNo.value === '' ||
        this.gender.value === '' ||
        this.dob.value === '' ||
        this.emailId.invalid ||
        this.mobileNo.invalid
      ) {
        this.openSnackBar('Enter proper details', 'Close');
      } else {
        this.addPatientService
          .updatePatient({
            id: this.data.details._id,
            pname: this.pname.value,
            emailId: this.emailId.value,
            mobileNo: this.mobileNo.value,
            gender: this.gender.value,
            dob: this.dob.value,
          })
          .subscribe(
            (data: any) => {
              this.openSnackBar('Patient details updated', 'Close');
              this.appService.loading = false;
              this.receptionComponent.refreshPatients();
            },
            (error: any) => {
              this.appService.loading = false;
              this.openSnackBar(error.message, 'Close');
            }
          );
        this.submitted = true;
      }
    } else {
      if (
        this.pname.value === '' ||
        this.emailId.value === '' ||
        this.mobileNo.value === '' ||
        this.gender.value === '' ||
        this.dob.value === '' ||
        this.emailId.invalid ||
        this.mobileNo.invalid
      ) {
        this.openSnackBar('Enter proper details', 'Close');
      } else {
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
              this.openSnackBar('Patient added', 'Close');
              this.appService.loading = false;
              this.receptionComponent.refreshPatients();
            },
            (error: any) => {
              this.appService.loading = false;
              this.openSnackBar('Something wrong! Patient Not added', 'Close');
            }
          );
        this.submitted = true;
        //console.log(this.submitted);
      }
    }
  }
}
