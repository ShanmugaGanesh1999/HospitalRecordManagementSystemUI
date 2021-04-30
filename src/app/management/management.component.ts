import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { AppService } from '../app.service';
import { MgtService } from './mgt.service';
import { ReceptionistService } from '../receptionist/receptionist.service';
import { PatientPreviousRecordComponent } from '../patient-previous-record/patient-previous-record.component';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  // dateCountArr = new MatTableDataSource<dateCountElement>([]);
  dateCountArr: dateCountElement[] = [];
  length = 0;
  lengthOfPatients = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pagePosition = 0;
  pageSize1 = 3;
  pageSizeOptions1: number[] = [3, 5, 10, 25, 100];
  pagePosition1 = 0;
  displayedColumns: string[] = ['date', 'count'];
  panelOpenState = false;
  patients: any = [];
  searchInput1 = new FormControl('');
  searchTerm1$ = new Subject<string>();
  searchForm1: FormGroup;

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
    private mgtService: MgtService,
    private receptionistService: ReceptionistService,
    private dialog: MatDialog
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
    this.searchForm1 = new FormGroup({
      searchInput1: this.searchInput1,
    });
    this.getAllPatients();
  }
  ngOnInit(): void {
    this.searchEventListener1(this.searchTerm1$);
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
    //console.log('event', event);
    this.pagePosition = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    //console.log(this.pagePosition, this.pageSize);
    this.getCount();
    this.getAllPatients();
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

  getAllPatients() {
    //console.log(this.searchInput1.value);
    this.receptionistService
      .getAllPatients({
        searchText1: this.searchInput1.value ? this.searchInput1.value : '',
        skip: this.pagePosition1,
        limit: this.pageSize1,
      })
      .subscribe(
        (data: any) => {
          this.patients = data.data;
          this.lengthOfPatients = data.totalLength;
          //console.log(this.lengthOfPatients);
        },
        (error: any) => {
          //console.log(error.message);
          this.openSnackBar('No patient found', 'Close');
        }
      );
  }

  searchEventListener1(searchTerms1: Observable<string>) {
    searchTerms1
      .pipe(debounceTime(400), distinctUntilChanged())
      .switchMap((term: any) => {
        try {
          console.log('term', term);
          this.getAllPatients();
          return term;
        } catch (error) {
          //console.log('123', error.message);
          return null;
        }
      })
      .subscribe(
        (term: any) => {
          //console.log(term);
        },
        (err: any) => {
          console.log('456', err);
          this.searchEventListener1(this.searchTerm1$);
        }
      );
  }

  searchText1 = '';

  onClickPaginator1(event: any) {
    //console.log('event', event);
    this.pagePosition1 = event.pageIndex * event.pageSize;
    this.pageSize1 = event.pageSize;
    //console.log(this.pagePosition, this.pageSize);
    this.getCount();
    this.getAllPatients();
  }

  onClickCloseSearch1() {
    this.searchInput1.setValue('');
    this.getAllPatients();
  }
  onClickPreviousDetails(patientId: any) {
    this.dialog.open(PatientPreviousRecordComponent, {
      data: {
        details: patientId,
      },
    });
  }
}

export interface dateCountElement {
  count: Number;
  date: Date;
}

function compare(a: Date | Number, b: Date | Number, isAsc: Boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
