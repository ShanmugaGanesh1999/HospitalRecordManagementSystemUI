import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';
import { ReceptionistService } from './receptionist.service';
import { AppService } from '../app.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css'],
})
export class ReceptionistComponent implements OnInit {
  panelOpenState = false;
  isEdit = false;
  patients: any = [];
  searchInput = new FormControl('');
  searchTerm$ = new Subject<string>();
  searchForm: FormGroup;
  length = 0;
  pageSize = 3;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];
  pagePosition = 0;

  constructor(
    private dialog: MatDialog,
    private receptionistService: ReceptionistService,
    private appService: AppService
  ) {
    appService.navHead = 'Receptionist';
    appService.logoutButton = true;
    this.searchForm = new FormGroup({
      searchInput: this.searchInput,
    });
    this.getAllPatients();
  }

  ngOnInit(): void {
    this.searchEventListener(this.searchTerm$);
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

  getAllPatients() {
    //console.log(this.searchInput.value);
    this.receptionistService
      .getAllPatients({
        searchText: this.searchInput.value ? this.searchInput.value : '',
        skip: this.pagePosition,
        limit: this.pageSize,
      })
      .subscribe(
        (data: any) => {
          this.patients = data.data;
          this.length = data.totalLength;
          //console.log(this.patients);
        },
        (error: any) => {
          //console.log(error.message);
          alert('No patient found');
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
          //console.log('term', term);
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
          //console.log('456', err);
          this.searchEventListener(this.searchTerm$);
        }
      );
  }

  onClickCloseSearch() {
    this.searchInput.setValue('');
    this.getAllPatients();
  }

  searchText = '';

  onClickPaginator(event: any) {
    // console.log('event', event);
    this.pagePosition = event.pageIndex * event.pageSize;
    this.pageSize = event.pageSize;
    this.getAllPatients();
  }
}
