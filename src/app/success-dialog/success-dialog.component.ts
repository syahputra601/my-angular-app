import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  // styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  title = this.data.title;
  message = this.data.message;

  close(): void{
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
