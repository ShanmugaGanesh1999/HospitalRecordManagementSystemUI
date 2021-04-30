import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { DoctorService } from './doctor.service';
import { MedicationComponent } from './medication/medication.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  patientIdData: any = [];
  patientIdDataArr: any = [];
  emailId = 'sankavi11@gmail.com';
  length = 0;
  pageSize = 2;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pagePosition = 0;
  dataCount: any = 0;
  patientSearchForm: FormGroup;
  searchInput = new FormControl('');
  searchTerm$ = new Subject<string>();

  constructor(
    private appService: AppService,
    private doctorService: DoctorService,
    private dialog: MatDialog
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

  getDoctorIdByEmailId(emailId: any) {
    this.doctorService.getDoctorIdByEmailId(emailId).subscribe(
      (data: any) => {
        var doctorId = data.doctorId;
        // console.log('doctorId', doctorId);
        this.doctorService.getPatientIdByDoctorId(doctorId).subscribe(
          (data: any) => {
            var patientId = data.patientId;
            console.log('patientId', patientId);
            console.log('patientId count', data.patientCount);
            console.log('pagePosition', this.pagePosition);
            console.log('pageSize', this.pageSize);
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
                  console.log('dataCount', this.dataCount);
                }
              } else {
                this.dataCount = data.patientCount;
                console.log('dataCount', this.dataCount);
              }
              console.log('pagePosition', this.pagePosition);
              console.log('pageSize', this.dataCount);
              for (let i = this.pagePosition; i < this.dataCount; i++) {
                // console.log(i);
                this.doctorService
                  .getPatientsByPatientId(patientId[i])
                  .subscribe(
                    (data: any) => {
                      console.log(data.data);
                      this.patientIdDataArr.push(data.data[0]);
                    },
                    (error: any) => {
                      console.log(error.message);
                    }
                  );
              }
              // console.log('patientData', this.patientIdDataArr);
              this.patientIdData = this.patientIdDataArr;
              this.length = data.patientCount;
              this.patientIdDataArr.length = 0;
            } else {
              alert('No patients assigned');
            }
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
    console.log(this.pagePosition, this.pageSize, event.pageSize);
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
          // this.getDoctorIdByEmailId(this.emailId);
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
}
