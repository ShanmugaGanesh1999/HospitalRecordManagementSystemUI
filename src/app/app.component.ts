import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'hospital-mgt';
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    public appService: AppService
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  logout() {
    this.openSnackBar('Logout successful', 'Close');
    localStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {}
}
