import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css'],
})
export class ReceptionistComponent implements OnInit {
  constructor(private appService: AppService) {
    appService.navHead = 'Receptionist';
    appService.logoutButton = true;
  }

  ngOnInit(): void {}
}
