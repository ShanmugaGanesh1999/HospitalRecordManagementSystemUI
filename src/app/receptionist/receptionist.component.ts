import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';
import { ReceptionistService } from './receptionist.service';
import { FixAppointmentService } from './fix-appointment/fix-appointment.service';
import { AppService } from '../app.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MgtService } from '../management/mgt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css'],
})
export class ReceptionistComponent implements OnInit {
  panelOpenState = false;
  isEdit = false;
  patients: any = [];
  appointments: any = [];
  searchInput = new FormControl('');
  searchTerm$ = new Subject<string>();
  searchForm: FormGroup;
  length = 0;
  pageSize = 3;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];
  pagePosition = 0;
  searchInput0 = new FormControl('');
  searchTerm0$ = new Subject<string>();
  searchForm0: FormGroup;
  length0 = 0;
  pageSize0 = 3;
  pageSizeOptions0: number[] = [3, 5, 10, 25, 100];
  pagePosition0 = 0;

  constructor(
    private dialog: MatDialog,
    private receptionistService: ReceptionistService,
    private fixAppointmentService: FixAppointmentService,
    private appService: AppService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private mgtService: MgtService
  ) {
    let token = localStorage.getItem('token'),
      who = localStorage.getItem('who');
    if (!token || who !== 'Reception') {
      this.router.navigate(['login']);
    }
    appService.navHead = 'Receptionist';
    appService.logoutButton = true;
    this.searchForm = new FormGroup({
      searchInput: this.searchInput,
    });
    this.searchForm0 = new FormGroup({
      searchInput0: this.searchInput0,
    });
    this.getAllPatients();
    this.getAppointments();
  }

  ngOnInit(): void {
    this.searchEventListener(this.searchTerm$);
    this.searchEventListener0(this.searchTerm0$);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  refreshAppointment() {
    this.getAppointments();
    this.openSnackBar('Appointment data Refreshed', 'Close');
  }

  refreshPatients() {
    this.getAllPatients();
    this.openSnackBar('Patients data Refreshed', 'Close');
  }

  onClickAddPatient() {
    this.dialog.open(AddPatientComponent, {
      data: {
        details: [],
        isEdit: this.isEdit,
      },
    });
  }

  onClickSearchPatient() {
    this.dialog.open(SearchPatientComponent);
  }

  getAppointments() {
    this.mgtService
      .getAppointments({
        search: this.searchInput0.value ? this.searchInput0.value : '',
        status: 'Pending',
        skip: this.pagePosition0,
        limit: this.pageSize0,
      })
      .subscribe(
        (data: any) => {
          if (data.count > 0) {
            this.appointments = data.data;
            if (this.searchInput.value != '')
              this.openSnackBar(
                `Appointments found for "${this.searchInput.value}" :)`,
                'Close'
              );
            else {
              this.appService.loading = false;
            }
          } else {
            if (this.searchInput.value != '')
              this.openSnackBar(
                `Appointments not found for "${this.searchInput.value}" :(`,
                'Close'
              );
            else this.openSnackBar('Appointments not found :(', 'Close');
            this.appService.loading = false;
          }
          this.length0 = data.count;
        },
        (err) => console.log(err)
      );
  }

  getAllPatients() {
    this.receptionistService
      .getAllPatients({
        searchText1: this.searchInput.value ? this.searchInput.value : '',
        skip: this.pagePosition,
        limit: this.pageSize,
      })
      .subscribe(
        (data: any) => {
          this.patients = data.data;
          this.length = data.totalLength;
        },
        (error: any) => {
          //console.log(error.message);
          this.openSnackBar('No patient found', 'Close');
        }
      );
  }

  onClickEdit(patient: any) {
    this.dialog.open(AddPatientComponent, {
      data: {
        details: patient,
        isEdit: true,
      },
    });
  }

  searchEventListener(searchTerms: Observable<string>) {
    searchTerms
      .pipe(debounceTime(400), distinctUntilChanged())
      .switchMap((term: any) => {
        try {
          this.getAllPatients();
          return term;
        } catch (error) {
          return null;
        }
      })
      .subscribe(
        (term: any) => {},
        (err: any) => {
          this.searchEventListener(this.searchTerm$);
        }
      );
  }

  onClickCloseSearch() {
    this.searchInput.setValue('');
    this.getAllPatients();
  }

  searchText1 = '';

  onClickPaginator(event: any) {
    this.pagePosition = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.getAllPatients();
  }

  searchEventListener0(searchTerms0: Observable<string>) {
    searchTerms0
      .pipe(debounceTime(400), distinctUntilChanged())
      .switchMap((term: any) => {
        try {
          this.getAppointments();
          return term;
        } catch (error) {
          return null;
        }
      })
      .subscribe(
        (term: any) => {},
        (err: any) => {
          this.searchEventListener0(this.searchTerm0$);
        }
      );
  }

  onClickCloseSearch0() {
    this.searchInput0.setValue('');
    this.getAppointments();
  }

  searchText0 = '';

  onClickPaginator0(event: any) {
    this.pagePosition0 = event.pageIndex * event.pageSize;
    this.pageSize0 = event.pageSize;
    this.getAppointments();
  }

  onclickDeleteAppointment(appointId: any) {
    this.appService.loading = true;
    var state = 0;
    this.receptionistService.deleteAppointment(appointId).subscribe(
      (data: any) => {
        this.fixAppointmentService.updateCountByDate(state).subscribe(
          (data1: any) => {
            this.appService.loading = false;
            window.location.reload();
            this._snackBar.open(data.message, 'close', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          },
          (err: any) => {
            this.appService.loading = false;
            this._snackBar.open(
              'Unable to delete this appointment. Please try again',
              'close',
              {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
              }
            );
          }
        );
      },
      (error: any) => {
        this.appService.loading = false;
        this.openSnackBar(
          'Unable to delete this appointment. Please try again',
          'Close'
        );
      }
    );
  }
}
