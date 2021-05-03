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
import { ReceptionistService } from '../receptionist/receptionist.service';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  patientIdData: any = [];
  patientIdDataArr: any = [];
  patientIdDataArr1: any = [];
  emailId = 'sankavi.rs@mailfence.com';
  length = 0;
  pageSize = 2;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pagePosition = 0;
  pageSize1 = 2;
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
    private _snackBar: MatSnackBar
  ) {
    appService.logoutButton = true;
    appService.navHead = 'Doctor';
    this.patientSearchForm = new FormGroup({
      searchInput: this.searchInput,
    });
    this.patientSearchForm1 = new FormGroup({
      searchInput1: this.searchInput1,
    });
    this.getDoctorIdByEmailId(this.emailId);
    this.getDoctorIdByEmailId1(this.emailId);
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
    // console.log('a');
    this.docDash = true;
    this.showPatient1 = false;
    this.docDash1 = false;
    this.pagePosition = 0;
    this.pageSize = 2;
    // this.searchInput.setValue('');
    this.getDoctorIdByEmailId(this.emailId);
  }

  showPat2() {
    // console.log('a');
    this.docDash1 = true;
    this.showPatient1 = false;
    this.docDash = false;
    // this.searchInput1.setValue('');

    this.getDoctorIdByEmailId1(this.emailId);
  }

  searchText = '';
  docArr = [];
  getDoctorIdByEmailId(emailId: any) {
    this.appService.loading = true;
    this.doctorService.getDoctorIdByEmailId(emailId).subscribe(
      (data: any) => {
        // console.log(data.doctorData);
        // console.log(data.doctorData[0].doctorName);
        this.docName = data.doctorData[0].doctorName.toUpperCase();
        this.docDOP = data.doctorData[0].DOP;
        // console.log(new Date(this.docDOP).getFullYear());
        this.docExp =
          new Date().getFullYear() - new Date(this.docDOP).getFullYear();
        this.docPhoneNo = data.doctorData[0].mobileNo;
        this.docSpec = data.doctorData[0].specialization;
        this.docArr = data.doctorId;
        var doctorId = data.doctorId;
        this.doctorService.getPatientIdByDoctorId(doctorId).subscribe(
          (data: any) => {
            var patientId = data.patientId;
            this.patLen = data.patientId.length;
            // console.log('patientId', patientId);
            // console.log('patientId count', data.patientCount);
            // console.log('pagePosition', this.pagePosition);
            // console.log('pageSize', this.pageSize);
            if (data.patientCount > 0) {
              if (this.dataCount <= data.patientCount) {
                if (this.pageSize % 2 == 0 && this.pagePosition != 0) {
                  this.dataCount = this.pageSize + this.pagePosition;
                  if (this.dataCount > data.patientCount) {
                    this.dataCount = data.patientCount;
                  }
                } else {
                  this.dataCount = this.pageSize;
                  if (this.dataCount > data.patientCount) {
                    this.dataCount = data.patientCount;
                  }
                  // console.log('dataCount', this.dataCount);
                }
              } else {
                this.dataCount = data.patientCount;
              }
              // console.log('pagePosition', this.pagePosition);
              // console.log('pageSize', this.dataCount);
              if (this.searchInput.value.length == 0) {
                for (let i = this.pagePosition; i < this.dataCount; i++) {
                  // console.log(i);
                  this.doctorService
                    .getPatientsByPatientId(patientId[i])
                    .subscribe(
                      (data: any) => {
                        // console.log(data.data);
                        this.patientIdDataArr.push(data.data[0]);
                      },
                      (error: any) => {
                        console.log(error.message);
                      }
                    );
                }
                this.patientIdData = this.patientIdDataArr;
                this.length = data.patientCount;
                this.patientIdDataArr.length = 0;
                this.appService.loading = false;
              } else {
                // this.appService.loading = true;
                // console.log(this.docArr);
                // for (let i = 0; i < data.patientId.length; i++) {
                //   this.patientId1[i] = data.patientId[i].parseInt();
                // }
                // console.log(this.searchInput.value.length);
                // console.log(this.searchInput.value.);
                this.doctorService
                  .getAllPendingPatients({
                    doctorId: this.docArr,
                    searchText: this.searchInput.value,
                  })
                  .subscribe(
                    (data: any) => {
                      console.log(data.searchDataCount);
                      if (data.searchDataCount > 0) {
                        if (this.dataCount1 <= data.data.length) {
                          if (
                            this.pageSize % 2 == 0 &&
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
                            // console.log('dataCount', this.dataCount);
                          }
                        } else {
                          this.dataCount1 = data.data.length;
                        }
                        // console.log('pagePosition', this.pagePosition);
                        // console.log('dataCount1', this.dataCount1);
                        for (
                          let i = this.pagePosition;
                          i < this.dataCount1;
                          i++
                        ) {
                          // console.log(data.data[i]);
                          setTimeout(() => {
                            this.patientIdDataArr1.push(data.data[i]);
                          }, 20);
                          // console.log(this.patientIdDataArr1);
                        }
                        // console.log(
                        //   'patientIdDataArr1',
                        //   this.patientIdDataArr1
                        // );
                        this.patientIdData = this.patientIdDataArr1;
                        this.length = data.data.length;
                        this.patientIdDataArr1.length = 0;
                        this.appService.loading = false;
                      } else {
                        this.appService.loading = false;
                        this.openSnackBar('No patient found', 'Close');
                      }
                    },
                    (error: any) => {
                      this.appService.loading = false;
                      this.openSnackBar('No patient found', 'Close');
                    }
                  );
              }
              // console.log('patientData', this.patientIdDataArr);
            } else {
              this.appService.loading = false;
              this.openSnackBar('No patient assigned', 'Close');
            }
          },
          (error: any) => {
            this.appService.loading = false;
            //console.log(error.message);
            this.openSnackBar('No patient found', 'Close');
          }
        );
        // console.log('doctorId', doctorId);
        // this.doctorService
        //   .getAllPendingPatients({
        //     searchText: this.searchInput.value ? this.searchInput.value : '',
        //     skip: this.pagePosition,
        //     limit: this.pageSize,
        //     doctorId: doctorId,
        //   })
        //   .subscribe(
        //     (data: any) => {
        //       console.log(data.data);
        //       this.patientIdData = data.data;
        //     },
        //     (error: any) => {
        //       console.log(error.message);
        //     }
        //   );
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }

  onClickPaginator(event: any) {
    console.log('event', event);
    this.pagePosition = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.getDoctorIdByEmailId(this.emailId);
    // console.log(this.pagePosition, this.pageSize, event.pageSize);
  }

  onClickPaginator1(event: any) {
    console.log('event', event);
    this.pagePosition1 = event.pageIndex * event.pageSize;
    this.pageSize1 = event.pageSize;
    this.getDoctorIdByEmailId1(this.emailId);
    // console.log(this.pagePosition, this.pageSize, event.pageSize);
  }

  onClickAddPatientMedication(
    id: any,
    patientId: any,
    name: any,
    emailId: any
  ) {
    console.log(id, name, patientId, emailId);
    var data = {
      id: id,
      name: name,
      patientId: patientId,
      emailId: emailId,
    };
    this.dialog.open(MedicationComponent, {
      data: data,
      panelClass: 'main-background',
      backdropClass: 'backdropBackground',
    });
  }

  searchEventListener(searchTerms: Observable<string>) {
    searchTerms
      .pipe(debounceTime(400), distinctUntilChanged())
      .switchMap((term: any) => {
        try {
          console.log('term', term);
          this.getDoctorIdByEmailId(this.emailId);
          return term;
        } catch (error) {
          console.log(error.message);
          return null;
        }
      })
      .subscribe(
        (term: any) => {
          // console.log(term);
          // this.pagePosition = 0;
          // this.pageSize = 1;
          // this.getAllCandidates();
        },
        (err: any) => {
          console.log(err.message);
        }
      );
  }

  searchEventListener1(searchTerms: Observable<string>) {
    searchTerms
      .pipe(debounceTime(400), distinctUntilChanged())
      .switchMap((term: any) => {
        try {
          console.log('term', term);
          this.getDoctorIdByEmailId1(this.emailId);
          return term;
        } catch (error) {
          console.log(error.message);
          return null;
        }
      })
      .subscribe(
        (term: any) => {
          // console.log(term);
          // this.pagePosition = 0;
          // this.pageSize = 1;
          // this.getAllCandidates();
        },
        (err: any) => {
          console.log(err.message);
        }
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
            this.patLen1 = data.patientId.length;
            var patientId = data.patientId;
            // this.patLen = data.patientId.length;
            // console.log('patientId', patientId);
            // console.log('patientId count', data.patientCount);
            // console.log('pagePosition', this.pagePosition);
            // console.log('pageSize', this.pageSize);
            if (data.patientCount > 0) {
              if (this.dataCount <= data.patientCount) {
                if (this.pageSize1 % 2 == 0 && this.pagePosition1 != 0) {
                  this.dataCount = this.pageSize1 + this.pagePosition1;
                  if (this.dataCount > data.patientCount) {
                    this.dataCount = data.patientCount;
                  }
                } else {
                  this.dataCount = this.pageSize1;
                  if (this.dataCount > data.patientCount) {
                    this.dataCount = data.patientCount;
                  }
                  // console.log('dataCount', this.dataCount);
                }
              } else {
                this.dataCount = data.patientCount;
              }
              // console.log('pagePosition', this.pagePosition);
              // console.log('pageSize', this.dataCount);
              if (this.searchInput1.value.length == 0) {
                for (let i = this.pagePosition1; i < this.dataCount; i++) {
                  // console.log(i);
                  this.doctorService
                    .getPatientsByPatientId(patientId[i])
                    .subscribe(
                      (data: any) => {
                        // console.log(data.data);
                        this.patientIdDataArr.push(data.data[0]);
                      },
                      (error: any) => {
                        console.log(error.message);
                      }
                    );
                }
                this.patientIdData = this.patientIdDataArr;
                this.length = data.patientCount;
                this.patientIdDataArr.length = 0;
                this.appService.loading = false;
              } else {
                this.pagePosition1 = 0;
                this.pageSize1 = 2;
                // this.appService.loading = true;
                // console.log(this.docArr);
                // for (let i = 0; i < data.patientId.length; i++) {
                //   this.patientId1[i] = data.patientId[i].parseInt();
                // }
                // console.log(this.searchInput1.value.length);
                // console.log(this.searchInput1.value);
                this.doctorService
                  .getAllFinishedPatients({
                    doctorId: this.docArr,
                    searchText: this.searchInput1.value,
                  })
                  .subscribe(
                    (data: any) => {
                      // console.log(data.searchDataCount);
                      if (data.searchDataCount > 0) {
                        if (this.dataCount2 <= data.data.length) {
                          if (
                            this.pageSize1 % 2 == 0 &&
                            this.pagePosition1 != 0
                          ) {
                            this.dataCount2 =
                              this.pageSize + this.pagePosition1;
                            if (this.dataCount2 >= data.data.length) {
                              this.dataCount2 = data.data.length;
                            }
                          } else {
                            this.dataCount2 = this.pageSize1;
                            if (this.dataCount2 > data.data.length) {
                              this.dataCount2 = data.data.length;
                            }
                            // console.log('dataCount', this.dataCount);
                          }
                        } else {
                          this.dataCount2 = data.data.length;
                        }
                        // console.log('pagePosition', this.pagePosition);
                        // console.log('dataCount1', this.dataCount1);
                        for (
                          let i = this.pagePosition1;
                          i < this.dataCount2;
                          i++
                        ) {
                          // console.log(data.data[i]);
                          setTimeout(() => {
                            this.patientIdDataArr1.push(data.data[i]);
                          }, 20);
                          // console.log(this.patientIdDataArr1);
                        }
                        // console.log(
                        //   'patientIdDataArr1',
                        //   this.patientIdDataArr1
                        // );
                        this.patientIdData = this.patientIdDataArr1;
                        this.length = data.data.length;
                        this.patientIdDataArr1.length = 0;
                        this.appService.loading = false;
                      } else {
                        this.appService.loading = false;
                        this.openSnackBar('No patient found', 'Close');
                      }
                    },
                    (error: any) => {
                      this.appService.loading = false;
                      this.openSnackBar('No patient found', 'Close');
                    }
                  );
              }
              // console.log('patientData', this.patientIdDataArr);
            } else {
              this.appService.loading = false;
              this.openSnackBar('No patient assigned', 'Close');
            }
          },
          (error: any) => {
            //console.log(error.message);
            this.appService.loading = false;
            this.openSnackBar('No patient found', 'Close');
          }
        );
        // console.log('doctorId', doctorId);
        // this.doctorService
        //   .getAllPendingPatients({
        //     searchText: this.searchInput.value ? this.searchInput.value : '',
        //     skip: this.pagePosition,
        //     limit: this.pageSize,
        //     doctorId: doctorId,
        //   })
        //   .subscribe(
        //     (data: any) => {
        //       console.log(data.data);
        //       this.patientIdData = data.data;
        //     },
        //     (error: any) => {
        //       console.log(error.message);
        //     }
        //   );
      },
      (error: any) => {
        console.log(error.message);
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

// console.log(i);
// this.doctorService.getAllPatients().subscribe(
//   (data: any) => {
//     // console.log(data.data);
//     for (let i = 0; i < data.data.length; i++) {
//       // console.log(
//       //   data.data[i].name.toLowerCase(),
//       //   this.searchInput.value.toLowerCase()
//       // );
//       if (
//         data.data[i].name
//           .toLowerCase()
//           .includes(this.searchInput.value.toLowerCase())
//       ) {
//         // console.log(data.data[i]);
//         this.patientIdDataArr1.push(data.data[i]);
//         console.log(this.patientIdDataArr1);
//         this.count += 1;
//       }
//       // this.getDoctorIdByEmailId(this.emailId);
//     }
//     this.patientIdData = this.patientIdDataArr1;
//     console.log(this.patientIdData);
//     if (this.count > 0) {
//       this.length = this.count;
//       this.count = 0;
//       this.patientIdDataArr1.length = 0;
//     } else {
//       this.length = patientPendingCount;
//       console.log(this.length);
//       this.openSnackBar('No patient found', 'Close');
//       this.onClickCloseSearch();
//     }
//   },
//   (error: any) => {
//     console.log(error.message);
//   }
// );

//  var patientId = data.patientId;
//  // console.log('patientId', patientId);
//  // console.log('patientId count', data.patientCount);
//  // console.log('pagePosition', this.pagePosition);
//  // console.log('pageSize', this.pageSize);
//  if (data.patientCount > 0) {
//    if (this.dataCount <= data.patientCount) {
//      if (this.pageSize % 2 == 0 && this.pagePosition != 0) {
//        this.dataCount = this.pageSize + this.pagePosition;
//        if (this.dataCount > data.patientCount) {
//          this.dataCount = data.patientCount;
//        }
//      } else {
//        this.dataCount = this.pageSize;
//        if (this.dataCount > data.patientCount) {
//          this.dataCount = data.patientCount;
//        }
//        // console.log('dataCount', this.dataCount);
//      }
//    } else {
//      this.dataCount = data.patientCount;
//      // console.log('dataCount', this.dataCount);
//    }
//    // console.log('pagePosition', this.pagePosition);
//    // console.log('pageSize', this.dataCount);
//    if (this.searchInput.value == '') {
//      for (let i = this.pagePosition; i < this.dataCount; i++) {
//        // console.log(i);
//        this.doctorService.getPatientsByPatientId(patientId[i]).subscribe(
//          (data: any) => {
//            // console.log(data.data);
//            this.patientIdDataArr.push(data.data[0]);
//          },
//          (error: any) => {
//            console.log(error.message);
//          }
//        );
//      }
//      this.patientIdData = this.patientIdDataArr;
//      this.length = data.patientCount;
//      this.patientIdDataArr.length = 0;
//    } else {
//      console.log(data.doctorId);
//      this.doctorService
//        .getAllPendingPatients({
//          searchText: this.searchInput.value,
//          skip: this.pagePosition,
//          limit: this.pageSize,
//        })
//        .subscribe(
//          (data: any) => {
//            // console.log(data.data);
//            for (let i = 0; i < data.totalLength; i++) {
//              this.patientIdDataArr1.push(data.data[i].patients);
//            }
//            this.patientIdData = this.patientIdDataArr1;
//            this.length = data.totalLength;
//            this.patientIdDataArr1.length = 0;
//          },
//          (error: any) => {
//            console.log(error.message);
//          }
//        );
//    }
//    // console.log('patientData', this.patientIdDataArr);
//  } else {
//    alert('No patients assigned');
//  }
