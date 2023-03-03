import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  inputText: string;
}

@Component({
  selector: 'app-textarea-dialog',
  templateUrl: './textarea-dialog.component.html',
  styleUrls: ['./textarea-dialog.component.scss']
})
export class TextareaDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TextareaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onClear() {
    this.data.inputText = '';
  }

}
