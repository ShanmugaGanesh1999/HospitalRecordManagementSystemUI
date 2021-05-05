import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { LoginService } from './login.service';
declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailId = new FormControl();
  password = new FormControl();
  hide: boolean = true;
  loginForm: FormGroup;
  email = new FormControl();
  forgotForm: FormGroup;
  otp = new FormControl();
  pass = new FormControl();
  rpass = new FormControl();
  resetForm: FormGroup;

  constructor(
    private router: Router,
    private appService: AppService,
    private loginService: LoginService,
    private _snackBar: MatSnackBar
  ) {
    appService.logoutButton = false;
    appService.navHead = 'Login';
    this.loginForm = new FormGroup({
      emailId: this.emailId,
      password: this.password,
    });

    this.forgotForm = new FormGroup({
      email: this.email,
    });

    this.resetForm = new FormGroup({
      otp: this.otp,
      pass: this.pass,
      rpass: this.rpass,
    });
  }

  ngOnInit(): void {
    $(document).ready(function (this: any) {
      setTimeout(this.closeLoginInfo, 10000);
    });
  }

  openLoginInfo() {
    $(document).ready(function () {
      $('.b-form').css('opacity', '0.01');
      $('.box-form').css('left', '-37%');
      $('.box-info').css('right', '-37%');
      $('.box-info1').css('left', '-35%');
    });
  }

  closeLoginInfo() {
    $(document).ready(function () {
      $('.b-form').css('opacity', '1');
      $('.box-form').css('left', '0%');
      $('.box-info').css('right', '0%');
      $('.box-info1').css('left', '0%');
    });
  }

  openLoginInfo1() {
    $(document).ready(function () {
      $('.b-form').css('opacity', '0.01');
      $('.box-info').css('right', '37%');
      $('.box-info1').css('left', '60%');
    });
  }

  closeLoginInfo1() {
    $(document).ready(function () {
      $('.b-form').css('opacity', '1');
      $('.box-form').css('left', '0%');
      $('.box-info').css('right', '0%');
      $('.box-info1').css('left', '0%');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  onClickLogin() {
    this.appService.loading = true;
    var emailId = this.emailId.value;
    var password = this.password.value;
    if (emailId && password) {
      this.loginService.loginApi(emailId, password).subscribe(
        (data: any) => {
          this.appService.loading = false;
          if (data.path !== undefined) {
            localStorage.setItem('who', data.path);
            localStorage.setItem('token', data.token);
            if (data.path === 'Management') {
              this.router.navigate(['management-page'], {
                queryParams: { emailId: emailId },
              });
            } else if (data.path === 'Doctor') {
              this.router.navigate(['doctor-page'], {
                queryParams: { emailId: emailId },
              });
            } else if (data.path === 'Reception') {
              this.router.navigate(['receptionist-page'], {
                queryParams: { emailId: emailId },
              });
            }
            this.openSnackBar('Logged in successfully', 'Close');
          } else {
            this.openSnackBar('Logging failed', 'Close');
          }
        },
        (error: any) => {
          this.appService.loading = false;
          this.openSnackBar('Enter valid email id and password', 'Close');
        }
      );
    } else {
      this.appService.loading = false;
      this.openSnackBar('Enter email id and password', 'Close');
    }
  }

  sendOtp() {
    this.appService.loading = true;
    let email = this.email.value;
    if (email) {
      this.loginService.forgotPwd(email).subscribe(
        (data: any) => {
          localStorage.setItem('email', email);
          this.appService.loading = false;
          this.openLoginInfo1();
          this.openSnackBar(`OTP has been sent to your mail:${email}`, 'Close');
        },
        (err: any) => {
          this.appService.loading = false;
          this.openSnackBar('Please enter valid email', 'Close');
        }
      );
    } else {
      this.appService.loading = false;
      this.openSnackBar('Please enter email', 'Close');
    }
  }

  onClickSet() {
    this.appService.loading = true;
    let otp = this.otp.value;
    let pwd = this.pass.value;
    let cpass = this.rpass.value;
    if (otp && pwd && cpass) {
      if (pwd === cpass && otp.length === 6) {
        this.loginService.otpVerify(otp).subscribe(
          (data: any) => {
            if (data.verification == 1) {
              let mail = localStorage.getItem('email');
              this.loginService.resetPwd(mail, cpass).subscribe(
                (data: any) => {
                  this.appService.loading = false;
                  this.openSnackBar(
                    'Your account password is Updated!',
                    'Close'
                  );
                  localStorage.clear();
                  this.closeLoginInfo1();
                },
                (err: any) => {
                  this.openSnackBar(err.message, 'Close');
                  this.appService.loading = false;
                }
              );
            } else {
              this.appService.loading = false;
              this.openSnackBar('Account password not updated!', 'Close');
              this.closeLoginInfo1();
            }
          },
          (err: any) => {
            this.appService.loading = false;
            this.openSnackBar(
              'OTP has been expired. Please try again later',
              'Close'
            );
            this.closeLoginInfo1();
          }
        );
      } else {
        this.appService.loading = false;
        this.openSnackBar(
          'Passwords not equal / Wrong OTP - Check and enter',
          'Close'
        );
      }
    }
  }
}
