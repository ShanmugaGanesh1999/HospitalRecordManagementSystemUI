import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { AppService } from '../app.service';
import { MgtService } from './mgt.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ReceptionistService } from '../receptionist/receptionist.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { MatDialog } from '@angular/material/dialog';
import { PatientPreviousRecordComponent } from '../patient-previous-record/patient-previous-record.component';
import { GraphAnalysisComponent } from './graph-analysis/graph-analysis.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ManagementComponent implements OnInit {
  selected = '';
  dateCountArr: dateCountElement[] = [];
  length = 0;
  lengthOfPatients = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pagePosition = 0;
  pageSize1 = 5;
  pageSizeOptions1: number[] = [5, 10, 25, 100];
  pagePosition1 = 0;
  displayedColumns: string[] = ['date', 'count'];
  panelOpenState = false;
  patients: any = [];
  searchInput1 = new FormControl('');
  searchInput = new FormControl('');
  searchTerm1$ = new Subject<string>();
  searchTerm$ = new Subject<string>();
  searchForm1: FormGroup;
  searchForm: FormGroup;

  color: string = 'rgb(240, 163, 19)';

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

  dataAppSource = new MatTableDataSource<AppointmentElement>([]);
  columnsToDisplay = ['patientId', 'patientName', 'doctorName'];
  expandedElement: AppointmentElement | null = null;

  length0 = 0;
  pageSize0 = 5;
  pageSizeOptions0: number[] = [5, 10, 25, 100];
  pagePosition0 = 0;
  single: any[] = [];
  multi: any[] = [];
  constructor(
    private appService: AppService,
    private _snackBar: MatSnackBar,
    private mgtService: MgtService,
    private router: Router,
    private receptionistService: ReceptionistService,
    private dialog: MatDialog
  ) {
    let token = localStorage.getItem('token'),
      who = localStorage.getItem('who');
    if (!token || who !== 'Management') {
      this.router.navigate(['login']);
    }
    appService.navHead = 'Management';
    appService.logoutButton = true;
    this.getCount();
    this.getAppointments();
    this.searchForm = new FormGroup({
      searchInput: this.searchInput,
    });
    this.refreshGraph();
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
  getAppointments() {
    this.appService.loading = true;
    this.mgtService
      .getAppointments({
        search: this.searchInput.value ? this.searchInput.value : '',
        status: 'Finished',
        skip: this.pagePosition0,
        limit: this.pageSize0,
      })
      .subscribe(
        (data: any) => {
          // console.log(data);
          if (data.count > 0) {
            this.dataAppSource = new MatTableDataSource<AppointmentElement>(
              data.data
            );
            if (this.searchInput.value != '')
              this.openSnackBar(
                `Appointments found for "${this.searchInput.value}" :)`,
                'Close'
              );
            else this.openSnackBar('Appointments found :)', 'Close');
          } else {
            this.dataAppSource = new MatTableDataSource<AppointmentElement>();
            if (this.searchInput.value != '')
              this.openSnackBar(
                `Appointments not found for "${this.searchInput.value}" :(`,
                'Close'
              );
            else this.openSnackBar('Appointments not found :(', 'Close');
          }
          this.length0 = data.count;
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
    // console.log('event', event);
    this.pagePosition = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.getCount();
  }

  onClickPaginator0(event: any) {
    // console.log('event', event);
    this.pagePosition0 = event.pageIndex * event.pageSize;
    this.pageSize0 = event.pageSize;
    this.getAppointments();
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

  refreshAppointment() {
    this.getAppointments();
    this.openSnackBar('Appointment refreshed', 'Close');
  }
  refreshGraph() {
    this.mgtService.getGraphData({ data: 'single' }).subscribe(
      (data: any) => {
        this.single = data.data;
      },
      (err) => console.log(err)
    );
    this.mgtService.getGraphData({ data: 'multi' }).subscribe(
      (data: any) => {
        this.multi = data.data;
        this.openSnackBar('Graphical Data Refreshed', 'Close');
      },
      (err) => console.log(err)
    );
  }
  refreshReceptionistPwd() {
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
    this.appService.loading = true;
    this.receptionistService
      .getAllPatients({
        searchText1: this.searchInput1.value ? this.searchInput1.value : '',
        skip: this.pagePosition1,
        limit: this.pageSize1,
      })
      .subscribe(
        (data: any) => {
          this.appService.loading = false;
          this.patients = data.data;
          this.lengthOfPatients = data.totalLength;
        },
        (error: any) => {
          this.appService.loading = false;
          this.openSnackBar('No patient found', 'Close');
        }
      );
  }

  searchEventListener1(searchTerms1: Observable<string>) {
    searchTerms1
      .pipe(debounceTime(400), distinctUntilChanged())
      .switchMap((term: any) => {
        try {
          // console.log('term', term);
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
          console.log(term);
        },
        (err: any) => {
          console.log('456', err);
          this.searchEventListener1(this.searchTerm1$);
        }
      );
  }

  searchEventListener(searchTerms: Observable<string>) {
    searchTerms
      .pipe(debounceTime(400), distinctUntilChanged())
      .switchMap((term: any) => {
        try {
          // console.log('term', term);
          this.getAppointments();
          console.log('term', term);
          return term;
        } catch (error) {
          //console.log('123', error.message);
          return null;
        }
      })
      .subscribe(
        (term: any) => {
          console.log(term);
        },
        (err: any) => {
          console.log('456', err);
          this.searchEventListener(this.searchTerm$);
        }
      );
  }

  onClickCloseSearch() {
    this.searchInput.setValue('');
    this.getAppointments();
  }

  searchText = '';

  ngOnInit(): void {
    this.searchEventListener(this.searchTerm$);
    this.searchEventListener1(this.searchTerm1$);
    this.getAppointments();
    this.getAllPatients();
  }

  searchText1 = '';

  onClickPaginator1(event: any) {
    //console.log('event', event);
    this.pagePosition1 = event.pageIndex * event.pageSize;
    this.pageSize1 = event.pageSize;
    this.getAllPatients();
  }

  onClickCloseSearch1() {
    this.searchInput1.setValue('');
    this.getAllPatients();
  }

  viewGraph() {
    if (this.selected !== '') {
      this.dialog.open(GraphAnalysisComponent, {
        data: [this.selected, this.single, this.multi],
        height: '90%',
        width: '100%',
      });
      this.openSnackBar(
        'Viewing graphical analysis of ' + this.selected,
        'Close'
      );
    } else this.openSnackBar('Enter perticular graph to view', 'Close');
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
export interface AppointmentElement {
  patientId: Number;
  patientName: String;
  docotrName: String;
  patientEmailId: String;
  patientAge: Number;
  doctorEmailId: String;
  patientGender: String;
  doctorSpecialization: String;
  doctorExperience: Number;
}
