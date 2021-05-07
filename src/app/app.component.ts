import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { AppService } from './app.service';
import { ContactComponent } from './contact/contact.component';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'hospital-mgt';
  curDateTime: any;
  curPgLink: string = '';
  constructor(
    private router: Router,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private clipboardService: ClipboardService,
    public appService: AppService
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3 * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: Event) {
    if (localStorage.getItem('who') !== 'Anonymous') this.logout();
    return true;
  }
  logout() {
    this.loginService.logout().subscribe(
      (data: any) => {
        this.openSnackBar(data.message, 'Close');
        localStorage.clear();
        this.openSnackBar('Logged out successfully', 'Close');
        this.router.navigate(['login']);
      },
      (err) => {
        this.openSnackBar(`Can't logout`, 'Close');
      }
    );
  }
  onClick(action: any) {
    let text;
    if (action === 1) {
      text = 'Feedback';
    } else if (action === 2) {
      text = 'Report';
    }
    this.dialog.open(ContactComponent, {
      data: [text, localStorage.getItem('who')],
      width: '52%',
      height: '80%',
    });
    this.openSnackBar('Opening dialog for ' + text, 'Close');
  }

  copyContent() {
    this.clipboardService.copyFromContent(this.curPgLink);
    this.openSnackBar('Current URL has been Copied into Clipboard', 'Close');
  }

  ngOnInit(): void {
    this.curPgLink = window.location.href;
    this.curDateTime = new Date();
  }
}
