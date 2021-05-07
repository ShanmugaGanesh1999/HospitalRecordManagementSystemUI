import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DoctorService } from './doctor.service';
import { MedicationComponent } from './medication/medication.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FinishedMedicationComponent } from './finished-medication/finished-medication.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  patientIdData: any = [];
  patientIdData1: any = [];
  patientIdDataArr: any = [];
  patientIdDataArr1: any = [];
  emailId: any;
  length = 0;
  length1 = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pagePosition = 0;
  pageSize1 = 5;
  pagePosition1 = 0;
  dataCount: any = 0;
  dataCount1: any = 0;
  dataCount2: any = 0;
  patientSearchForm: FormGroup;
  patientSearchForm1: FormGroup;
  searchInput = new FormControl('');
  searchInput1 = new FormControl('');
  searchTerm$ = new Subject<string>();
  searchTerm1$ = new Subject<string>();
  filled: any = false;
  count: any = 0;
  countArr: any = [];
  patientId1: any = [];
  showPatient: boolean = true;
  showPatient1: boolean = false;
  docName: any;
  docSpec: any;
  docDOP: any;
  docPhoneNo: any;
  docDash: boolean = true;
  docExp: any;
  patLen: any;
  patLen1: any;
  docDash1: any;

  constructor(
    private appService: AppService,
    private doctorService: DoctorService,
    private dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    let token = localStorage.getItem('token'),
      who = localStorage.getItem('who');
    if (!token || who !== 'Doctor') {
      this.router.navigate(['login']);
    }
    this.route.queryParams.subscribe((params: any) => {
      this.emailId = params['emailId'];
    });
    appService.logoutButton = true;
    appService.navHead = 'Doctor';
    this.patientSearchForm = new FormGroup({
      searchInput: this.searchInput,
    });
    this.patientSearchForm1 = new FormGroup({
      searchInput1: this.searchInput1,
    });
    if (this.emailId != undefined) {
      this.getDoctorIdByEmailId2(this.emailId);
      // this.getDoctorIdByEmailId1(this.emailId);
    }
    this.appService.loading = false;
  }

  ngOnInit(): void {
    this.searchEventListener(this.searchTerm$);
    this.searchEventListener1(this.searchTerm1$);
  }

  showPat() {
    this.showPatient1 = true;
    this.docDash = false;
    this.docDash1 = false;
    this.getDoctorIdByEmailId(this.emailId);
  }

  showPat1() {
    this.showPatient1 = false;
    this.docDash1 = false;
    this.pagePosition = 0;
    this.pageSize = 5;
    this.getDoctorIdByEmailId2(this.emailId);
  }

  showPat2() {
    this.docDash1 = true;
    this.showPatient1 = false;
    this.docDash = false;
    this.pagePosition = 0;
    this.pageSize1 = 5;
    this.getDoctorIdByEmailId1(this.emailId);
  }

  searchText = '';
  docArr = [];

  getDoctorIdByEmailId2(emailId: any) {
    this.appService.loading = true;
    this.doctorService.getDoctorIdByEmailId(emailId).subscribe(
      (data: any) => {
        this.docName = data.doctorData[0].doctorName.toUpperCase();
        this.docDOP = data.doctorData[0].DOP;
        this.docExp =
          new Date().getFullYear() - new Date(this.docDOP).getFullYear();
        this.docPhoneNo = data.doctorData[0].mobileNo;
        this.docSpec = data.doctorData[0].specialization;
        this.docArr = data.doctorId;
        this.doctorService.getPatientIdByDoctorId(data.doctorId).subscribe(
          (data: any) => {
            this.patLen = data.patientId.length;
          },
          (err) => {
            this.appService.loading = false;
          }
        );
        this.doctorService.getPatientIdByDoctorId1(data.doctorId).subscribe(
          (data: any) => {
            this.patLen1 = data.patientId.length;
          },
          (err) => {
            this.appService.loading = false;
          }
        );
        this.appService.loading = false;
      },
      (error: any) => {
        this.appService.loading = false;
        this.openSnackBar(error.message, 'Close');
      }
    );
  }

  getDoctorIdByEmailId(emailId: any) {
    this.appService.loading = true;
    this.doctorService.getDoctorIdByEmailId(emailId).subscribe(
      (data: any) => {
        this.docName = data.doctorData[0].doctorName.toUpperCase();
        this.docDOP = data.doctorData[0].DOP;
        this.docExp =
          new Date().getFullYear() - new Date(this.docDOP).getFullYear();
        this.docPhoneNo = data.doctorData[0].mobileNo;
        this.docSpec = data.doctorData[0].specialization;
        this.docArr = data.doctorId;
        var doctorId = data.doctorId;
        this.doctorService.getPatientIdByDoctorId(doctorId).subscribe(
          (data: any) => {
            var patientId = data.patientId;
            if (data.patientCount > 0) {
              if (this.dataCount <= data.patientCount) {
                if (this.pageSize % 5 == 0 && this.pagePosition != 0) {
                  this.dataCount = this.pageSize + this.pagePosition;
                  if (this.dataCount > data.patientCount) {
                    this.dataCount = data.patientCount;
                  }
                } else {
                  this.dataCount = this.pageSize;
                  if (this.dataCount > data.patientCount) {
                    this.dataCount = data.patientCount;
                  }
                }
              } else {
                this.dataCount = data.patientCount;
              }
              if (
                this.searchInput.value.length == 0 &&
                data.patientCount != 0
              ) {
                for (let i = this.pagePosition; i < this.dataCount; i++) {
                  this.doctorService
                    .getPatientsByPatientId(patientId[i])
                    .subscribe(
                      (data: any) => {
                        this.patientIdDataArr.push(data.data[0]);
                      },
                      (error: any) => {
                        this.openSnackBar('No patient found', 'Close');
                      }
                    );
                }
                this.patientIdData = this.patientIdDataArr;
                this.length = data.patientCount;
                this.patientIdDataArr.length = 0;
                this.searchInput.setValue('');
                this.appService.loading = false;
              } else {
                this.doctorService
                  .getAllPendingPatients({
                    doctorId: this.docArr,
                    searchText: this.searchInput.value,
                  })
                  .subscribe(
                    (data: any) => {
                      if (data.searchDataCount > 0) {
                        if (this.dataCount1 <= data.data.length) {
                          if (
                            this.pageSize % 5 == 0 &&
                            this.pagePosition != 0
                          ) {
                            this.dataCount1 = this.pageSize + this.pagePosition;
                            if (this.dataCount1 >= data.data.length) {
                              this.dataCount1 = data.data.length;
                            }
                          } else {
                            this.dataCount1 = this.pageSize;
                            if (this.dataCount1 > data.data.length) {
                              this.dataCount1 = data.data.length;
                            }
                          }
                        } else {
                          this.dataCount1 = data.data.length;
                        }
                        for (
                          let i = this.pagePosition;
                          i < this.dataCount1;
                          i++
                        ) {
                          setTimeout(() => {
                            this.patientIdDataArr.push(data.data[i]);
                          }, 20);
                        }
                        this.patientIdData = this.patientIdDataArr;
                        this.length = data.data.length;
                        this.patientIdDataArr.length = 0;
                        this.searchInput.setValue('');
                        this.appService.loading = false;
                      } else {
                        this.appService.loading = false;
                        this.openSnackBar('No patient assigned', 'Close');
                      }
                    },
                    (error: any) => {
                      this.appService.loading = false;
                      this.openSnackBar('No patient assigned', 'Close');
                    }
                  );
              }
            } else {
              this.appService.loading = false;
              this.openSnackBar('No patient assigned', 'Close');
            }
          },
          (error: any) => {
            this.appService.loading = false;
            this.openSnackBar('No patient assigned', 'Close');
          }
        );
      },
      (error: any) => {
        this.openSnackBar(error.message, 'Close');
      }
    );
  }

  onClickPaginator(event: any) {
    this.pagePosition = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.getDoctorIdByEmailId(this.emailId);
  }

  onClickPaginator1(event: any) {
    this.pagePosition1 = event.pageIndex * event.pageSize;
    this.pageSize1 = event.pageSize;
    this.getDoctorIdByEmailId1(this.emailId);
  }

  onClickAddPatientMedication(
    id: any,
    patientId: any,
    name: any,
    emailId: any,
    gender: any,
    dob: any
  ) {
    var data = {
      id: id,
      name: name,
      patientId: patientId,
      emailId: emailId,
      doctorName: this.docName,
      specialization: this.docSpec,
      mobileNo: this.docPhoneNo,
      gender: gender,
      dob: dob,
      docEmailId: this.emailId,
    };
    this.dialog.open(MedicationComponent, {
      data: data,
      panelClass: 'main-background',
      backdropClass: 'backdropBackground',
    });
  }
  medArr: any = [];
  onClickAddPatientMedication1(id: any) {
    this.doctorService.getAppointmentIdByPatientId(id).subscribe(
      (data: any) => {
        this.doctorService
          .getMedicationByAppointmentId(data.appointmentId[0]._id)
          .subscribe(
            (data: any) => {
              this.medArr.push(data.medication.prescription);
              this.medArr.push(data.medication.complication);
              this.dialog.open(FinishedMedicationComponent, {
                data: this.medArr,
                panelClass: 'main-background',
                backdropClass: 'backdropBackground',
              });
            },
            (error: any) => {
              this.openSnackBar('No medication data available', 'Close');
            }
          );
      },
      (error: any) => {
        this.openSnackBar(`No medication data available `, 'Close');
      }
    );
  }

  searchEventListener(searchTerms: Observable<string>) {
    searchTerms
      .pipe(debounceTime(400), distinctUntilChanged())
      .switchMap((term: any) => {
        try {
          this.getDoctorIdByEmailId(this.emailId);
          return term;
        } catch (error) {
          return null;
        }
      })
      .subscribe(
        (term: any) => {},
        (err: any) => {}
      );
  }

  searchEventListener1(searchTerms: Observable<string>) {
    searchTerms
      .pipe(debounceTime(400), distinctUntilChanged())
      .switchMap((term: any) => {
        try {
          this.getDoctorIdByEmailId1(this.emailId);
          return term;
        } catch (error) {
          return null;
        }
      })
      .subscribe(
        (term: any) => {},
        (err: any) => {}
      );
  }

  getDoctorIdByEmailId1(emailId: any) {
    this.appService.loading = true;
    this.doctorService.getDoctorIdByEmailId(emailId).subscribe(
      (data: any) => {
        this.docArr = data.doctorId;
        var doctorId = data.doctorId;
        this.doctorService.getPatientIdByDoctorId1(doctorId).subscribe(
          (data: any) => {
            console.log(data.patientId);
            var patientId = data.patientId;
            if (data.patientCount > 0) {
              if (this.dataCount <= data.patientCount) {
                if (this.pageSize1 % 5 == 0 && this.pagePosition1 != 0) {
                  this.dataCount = this.pageSize1 + this.pagePosition1;
                  if (this.dataCount > data.patientCount) {
                    this.dataCount = data.patientCount;
                  }
                } else {
                  this.dataCount = this.pageSize1;
                  if (this.dataCount > data.patientCount) {
                    this.dataCount = data.patientCount;
                  }
                }
              } else {
                this.dataCount = data.patientCount;
              }
              if (
                this.searchInput1.value.length == 0 &&
                data.patientCount != 0
              ) {
                for (let i = this.pagePosition1; i < this.dataCount; i++) {
                  this.doctorService
                    .getPatientsByPatientId(patientId[i])
                    .subscribe(
                      (data: any) => {
                        this.patientIdDataArr1.push(data.data[0]);
                      },
                      (error: any) => {
                        this.openSnackBar('No patient assigned', 'Close');
                      }
                    );
                }
                this.patientIdData1 = this.patientIdDataArr1;
                this.length1 = data.patientCount;
                this.patientIdDataArr1.length = 0;
                this.searchInput1.setValue('');
                this.appService.loading = false;
              } else {
                this.pagePosition1 = 0;
                this.pageSize1 = 5;
                this.doctorService
                  .getAllFinishedPatients({
                    doctorId: this.docArr,
                    searchText: this.searchInput1.value,
                  })
                  .subscribe(
                    (data: any) => {
                      if (data.searchDataCount > 0) {
                        if (this.dataCount2 <= data.data.length) {
                          if (
                            this.pageSize1 % 5 == 0 &&
                            this.pagePosition1 != 0
                          ) {
                            this.dataCount2 =
                              this.pageSize1 + this.pagePosition1;
                            if (this.dataCount2 >= data.data.length) {
                              this.dataCount2 = data.data.length;
                            }
                          } else {
                            this.dataCount2 = this.pageSize1;
                            if (this.dataCount2 > data.data.length) {
                              this.dataCount2 = data.data.length;
                            }
                          }
                        } else {
                          this.dataCount2 = data.data.length;
                        }
                        for (
                          let i = this.pagePosition1;
                          i < this.dataCount2;
                          i++
                        ) {
                          setTimeout(() => {
                            this.patientIdDataArr1.push(data.data[i]);
                          }, 20);
                        }
                        this.patientIdData1 = this.patientIdDataArr1;
                        this.length1 = data.data.length;
                        this.patientIdDataArr1.length = 0;
                        this.searchInput1.setValue('');
                        this.appService.loading = false;
                      } else {
                        this.appService.loading = false;
                        this.openSnackBar('No patient found', 'Close');
                      }
                    },
                    (error: any) => {
                      this.appService.loading = false;
                      this.openSnackBar('No patient assigned', 'Close');
                    }
                  );
              }
            } else {
              this.appService.loading = false;
              this.openSnackBar('No patient assigned', 'Close');
            }
          },
          (error: any) => {
            this.appService.loading = false;
            this.openSnackBar('No patient assigned', 'Close');
          }
        );
      },
      (error: any) => {
        this.openSnackBar(error.message, 'Close');
      }
    );
  }
  onClickCloseSearch1() {
    this.searchInput1.setValue('');
    this.getDoctorIdByEmailId1(this.emailId);
  }
  onClickCloseSearch() {
    this.searchInput.setValue('');
    this.getDoctorIdByEmailId(this.emailId);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
