import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'hospital-mgt';
  constructor(
    private router: Router,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    public appService: AppService
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3 * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  logout() {
    this.loginService.logout(localStorage.getItem('token')).subscribe(
      (data: any) => {
        this.openSnackBar(data.message, 'Close');
        localStorage.clear();
        this.router.navigate(['login']);
      },
      (err) => {
        if (
          err.message ===
          'Http failure response for http://localhost:3000/common/logout: 401 Unauthorized'
        )
          this.openSnackBar('Logged out successfully', 'Close');
        localStorage.clear();
        this.router.navigate(['login']);
      }
    );
  }

  ngOnInit(): void {}
}
