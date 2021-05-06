import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MgtService } from '../management/mgt.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  heading: String = '';
  description = new FormControl('', [Validators.required]);
  from = new FormControl('');
  to = new FormControl('');
  reportForm: FormGroup;
  constructor(
    private _snackBar: MatSnackBar,
    private mgtService: MgtService,
    public dialogRef: MatDialogRef<ContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.reportForm = new FormGroup({
      description: this.description,
      from: this.from,
      to: this.to,
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3 * 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  onClickSend() {
    let content = this.description.value,
      from = this.from.value,
      to = this.to.value;
    if (content != '') {
      this.mgtService
        .sendReport({
          from: from,
          to: to,
          heading: this.heading,
          description: content,
        })
        .subscribe(
          (data) => {
            console.log(data);
            this.openSnackBar('Mail sent to Developer team', 'Close');
          },
          (err) => console.log(err)
        );
    }
  }

  ngOnInit(): void {
    this.heading = this.data[0];
    this.from.setValue(this.data[1]);
    this.to.setValue('shanmuga.automail@gmail.com');
  }
}
