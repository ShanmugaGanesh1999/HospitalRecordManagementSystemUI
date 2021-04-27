import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private appService: AppService) {
    appService.logoutButton = false;
    appService.navHead = 'Login';
  }

  ngOnInit(): void {}
  openReceptionist() {
    this.router.navigate(['receptionist-page']);
  }
}
