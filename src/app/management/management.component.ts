import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { AppService } from '../app.service';
import { MgtService } from './mgt.service';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  // dateCountArr = new MatTableDataSource<dateCountElement>([]);
  dateCountArr: dateCountElement[] = [];
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
    private appService: AppService,
    private _snackBar: MatSnackBar,
    private mgtService: MgtService
  ) {
    appService.navHead = 'Management';
    appService.logoutButton = true;
    this.getCount();
    this.createDoctorForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      emailId: this.emailId,
      mobileNo: this.mobileNo,
      specialization: this.specialization,
      dop: this.dop,
    });
  }

  getCount() {
    this.appService.loading = true;
    this.mgtService
      .getAllCounts({
        skip: this.pagePosition,
        limit: this.pageSize,
      })
      .subscribe(
        (data: any) => {
          this.dateCountArr = data.data;
          this.length = data.count;
          this.appService.loading = false;
        },
        (err) => console.log(err)
      );
  }

  onSubmit() {
    this.appService.loading = true;
    this.nextStep();
    if (
      this.firstName.value &&
      this.emailId.value &&
      this.specialization.value &&
      this.mobileNo.value &&
      this.dop.value
    ) {
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
            this.openSnackBar(data.message, 'Close');
          },
          (err) => console.log(err)
        );
    } else {
      this.openSnackBar('Please enter doctor details', 'Close');
    }
    this.appService.loading = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  onClickPaginator(event: any) {
    console.log('event', event);
    this.pagePosition = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    console.log(this.pagePosition, this.pageSize);
    this.getCount();
  }
  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.nextStep();
    }
  }

  sortData(sort: Sort) {
    const data = this.dateCountArr.slice();
    if (!sort.active || sort.direction === '') {
      this.dateCountArr = data;
      return;
    }

    this.dateCountArr = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'date':
          return compare(a.date, b.date, isAsc);
        case 'count':
          return compare(a.count, b.count, isAsc);
        default:
          return 0;
      }
    });
  }
  refreshCount() {
    this.getCount();
    this.openSnackBar('Count refreshed', 'Close');
  }

  refreshDoctor() {
    window.location.reload();
  }

  ngOnInit(): void {}
}

export interface dateCountElement {
  count: Number;
  date: Date;
}

function compare(a: Date | Number, b: Date | Number, isAsc: Boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
