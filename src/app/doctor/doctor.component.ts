import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent implements OnInit {
  constructor(private appService: AppService) {
    appService.logoutButton = true;
    appService.navHead = 'Doctor';
  }

  ngOnInit(): void {}
}
