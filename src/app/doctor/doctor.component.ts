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

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  patientIdData: any = [];
  patientIdDataArr: any = [];
  patientIdDataArr1: any = [];
  emailId = 'sankavi11@gmail.com';
  length = 0;
  pageSize = 2;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pagePosition = 0;
  dataCount: any = 0;
  patientSearchForm: FormGroup;
  searchInput = new FormControl('');
  searchTerm$ = new Subject<string>();
  filled: any = false;
  count: any = 0;

  constructor(
    private appService: AppService,
    private doctorService: DoctorService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private receptionistService: ReceptionistService
  ) {
    appService.logoutButton = true;
    appService.navHead = 'Doctor';
    this.patientSearchForm = new FormGroup({
      searchInput: this.searchInput,
    });
    this.getDoctorIdByEmailId(this.emailId);
  }

  ngOnInit(): void {
    this.searchEventListener(this.searchTerm$);
  }

  searchText = '';

  getDoctorIdByEmailId(emailId: any) {
    this.doctorService.getDoctorIdByEmailId(emailId).subscribe(
      (data: any) => {
        var doctorId = data.doctorId;
        // console.log('doctorId', doctorId);
        this.doctorService
          .getAllPendingPatients({
            searchText: this.searchInput.value ? this.searchInput.value : '',
            skip: this.pagePosition,
            limit: this.pageSize,
            doctorId: doctorId,
          })
          .subscribe(
            (data: any) => {
              console.log(data.data);
              this.patientIdData = data.data;
            },
            (error: any) => {
              console.log(error.message);
            }
          );
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

  onClickAddPatientMedication(patientId: any) {
    this.dialog.open(MedicationComponent, {
      data: patientId,
      panelClass: 'main-background',
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
