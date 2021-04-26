import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private appService: AppService,
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
  }

  onSubmit() {
    this.nextStep();
  }

  ngOnInit(): void {}
}

export interface dateCountElement {
  count: Number;
  date: Date;
}
