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

  ngOnInit(): void {}
  appId: any = [];
  com: any = [];
  pres: any = [];
  onClickSave() {
    this.submitted = true;
    var patName = this.data.name;
    this.doctorService.getAppointmentIdByPatientId(this.data.id).subscribe(
      (data: any) => {
        this.appId.push(data.appointmentId[0]._id);
        this.com.push(this.complication.value);
        this.pres.push(this.prescription.value);
        var params = {
          appointmentId: data.appointmentId[0]._id,
          complication: this.complication.value,
          prescription: this.prescription.value,
        };
        this.doctorService.createMedication(params).subscribe(
          (data: any) => {
            var params = {
              patientId: this.data.patientId,
              name: this.data.name,
              emailId: this.data.emailId,
              doctorName: this.data.doctorName,
              specialization: this.data.specialization,
              mobileNo: this.data.mobileNo,
              complication: this.com[0],
              prescription: this.pres[0],
              gender: this.data.gender,
              dob: this.data.dob,
              docEmailId: this.data.docEmailId,
            };
            this.doctorService.sendPrescriptionByPatientId(params).subscribe(
              (data: any) => {
                if (data.message === 'Sent prescription mail successfully') {
                  var params1 = {
                    appointmentId: this.appId[0],
                    status: 'Finished',
                  };
                  this.doctorService.statusAppointmentById(params1).subscribe(
                    (data: any) => {
                      this.openSnackBar(
                        `Sent ${patName}'s prescription mail successfully `,
                        'Close'
                      );
                    },
                    (error: any) => {
                      this.openSnackBar('Error sending mail', 'Close');
                    }
                  );
                } else {
                  this.openSnackBar(
                    'Error updating appointment status',
                    'Close'
                  );
                }
              },
              (error: any) => {
                console.log(error.message);
              }
            );
          },
          (error: any) => {
            console.log(error);
          }
        );
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
