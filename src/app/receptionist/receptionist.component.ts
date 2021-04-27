import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ReceptionistService } from './receptionist.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css'],
})
export class ReceptionistComponent implements OnInit {
  panelOpenState = false;
  patients: any = [];

  constructor(
    private dialog: MatDialog,
    private receptionistService: ReceptionistService
  ) {}

  ngOnInit(): void {
    this.getAllPatients();
  }
  onClickAddPatient() {
    this.dialog.open(AddPatientComponent);
  }

  getAllPatients() {
    this.receptionistService.getAllPatients().subscribe(
      (data: any) => {
        this.patients = data.data;
        console.log(this.patients);
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }
}
