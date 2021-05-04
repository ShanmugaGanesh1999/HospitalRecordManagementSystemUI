import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-graph-analysis',
  templateUrl: './graph-analysis.component.html',
  styleUrls: ['./graph-analysis.component.css'],
})
export class GraphAnalysisComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GraphAnalysisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  selected = '';
  specialization = 'Specialization';
  legendPosition: string = 'below';
  cardColor: string = '#232837';
  value: string = 'Value';
  month = 'Month';
  single: any[] = [];

  multi: any[] = [];

  view: [number, number] = [1000, 400];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  onSelect(event: any) {
    this.openSnackBar(event.name, event.value);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1 * 1000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
    });
  }

  labelFormatting(c: any) {
    return `${c.label} Population`;
  }

  ngOnInit(): void {
    this.selected = this.data[0];
    this.single = this.data[1];
    this.multi = this.data[2];
  }
}
