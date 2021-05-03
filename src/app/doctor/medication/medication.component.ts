import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorService } from '../doctor.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private doctorService: DoctorService,
    private _snackBar: MatSnackBar
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
    // console.log(
    //   'id',
    //   this.data.id,
    //   'patientId',
    //   this.data.patientId,
    //   'name',
    //   this.data.name,
    //   'emailId',
    //   this.data.emailId
    // );
    var patName = this.data.name;
    var patName = this.data.patientId;
    var patName = this.data.emailId;
    this.doctorService.getAppointmentIdByPatientId(this.data.id).subscribe(
      (data: any) => {
        console.log(
          data.appointmentId[0]._id,
          this.prescription.value,
          this.complication.value
        );
        var params = {
          appointmentId: data.appointmentId[0]._id,
          complication: this.complication.value,
          prescription: this.prescription.value,
        };
        this.doctorService.createMedication(params).subscribe(
          (data: any) => {
            // console.log(data.data);
            var params1 = {
              appointmentId: data.data.appointmentId,
              status: 'Finished',
            };
            this.doctorService.statusAppointmentById(params1).subscribe(
              (data: any) => {
                // console.log(data.data);
                this.doctorService.statusAppointmentById(params1).subscribe(
                  (data: any) => {
                    // console.log(data.data);

                    this.openSnackBar(
                      `Sent ${patName}'s prescription mail successfully `,
                      'Close'
                    );

                    // this.patientIdDataArr.push(data.data[0]);
                  },
                  (error: any) => {
                    console.log(error);
                  }
                );
                this.openSnackBar(
                  `Sent ${patName}'s prescription mail successfully `,
                  'Close'
                );

                // this.patientIdDataArr.push(data.data[0]);
              },
              (error: any) => {
                console.log(error);
              }
            );
            // this.patientIdDataArr.push(data.data[0]);
          },
          (error: any) => {
            console.log(error);
          }
        );
        // this.patientIdDataArr.push(data.data[0]);
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }
}
