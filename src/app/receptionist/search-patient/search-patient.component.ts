import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchPatientService } from './search-patient.service';
import { MatDialog } from '@angular/material/dialog';
import { FixAppointmentComponent } from '../fix-appointment/fix-appointment.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.css'],
})
export class SearchPatientComponent implements OnInit {
  pId = new FormControl('');
  patient: any;
  patientIdForm: FormGroup;

  constructor(
    private searchPatientService: SearchPatientService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.patientIdForm = new FormGroup({
      pId: this.pId,
    });
  }
  ngOnInit(): void {}

  onClickSearch() {
    //console.log(this.pId.value);
    this.searchPatientService.getPatientDetails(this.pId.value).subscribe(
      (data: any) => {
        this.patient = data.data;
        //console.log(this.patient);
        this.dialog.open(FixAppointmentComponent, {
          data: {
            details: this.patient,
          },
          panelClass: 'main-background',
        });
      },
      (error: any) => {
        //console.log(error.message);
        this._snackBar.open('No Patient with this ID', 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
