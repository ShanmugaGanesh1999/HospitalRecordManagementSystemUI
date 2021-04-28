import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { MgtService } from './mgt.service';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  dateCountArr = new MatTableDataSource<dateCountElement>([]);
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pagePosition = 0;
  displayedColumns: string[] = ['date', 'count'];

  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  createDoctorForm: FormGroup;
  firstName = new FormControl('');
  lastName = new FormControl('');
  emailId = new FormControl('');
  mobileNo = new FormControl('');
  specialization = new FormControl('');
  dop = new FormControl('');

  constructor(
    private router: Router,
    private appService: AppService,
    private _snackBar: MatSnackBar,
    private mgtService: MgtService
  ) {
    appService.navHead = 'Management';
    appService.logoutButton = true;
    appService.loading = true;
    mgtService.getAllCounts().subscribe(
      (data: any) => {
        this.dateCountArr = new MatTableDataSource<dateCountElement>(data.data);
        this.length = data.totalLength;
        appService.loading = false;
      },
      (err) => console.log(err)
    );
    this.createDoctorForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      emailId: this.emailId,
      mobileNo: this.mobileNo,
      specialization: this.specialization,
      dop: this.dop,
    });
  }

  onSubmit() {
    this.appService.loading = true;
    this.nextStep();
    this.mgtService
      .createDoctor({
        fullName: this.firstName.value + ' ' + this.lastName.value,
        emailId: this.emailId.value,
        specialization: this.specialization.value,
        mobileNo: this.mobileNo.value,
        dop: this.dop.value,
      })
      .subscribe(
        (data: any) => {
          this.appService.loading = false;
          this.openSnackBar('Doctor created successfully', 'Close');
        },
        (err) => console.log(err)
      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.nextStep();
    }
  }
  ngOnInit(): void {}
}

export interface dateCountElement {
  count: Number;
  date: Date;
}
