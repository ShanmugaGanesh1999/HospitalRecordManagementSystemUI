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
  single: any[] = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
    {
      name: 'Italy',
      value: 4500000,
    },
    {
      name: 'Spain',
      value: 5730000,
    },
    {
      name: 'UK',
      value: 8200000,
    },
  ];
  view: [number, number] = [1000, 350];

  // options
  gradient: boolean = false;
  animations: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  onSelect(event: any) {
    this.openSnackBar(event.specialization, event.value);
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
    console.log(this.data);
  }
}
