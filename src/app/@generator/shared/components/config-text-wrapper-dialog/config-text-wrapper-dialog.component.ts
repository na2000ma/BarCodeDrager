import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DefaultBuilder, LayoutBuilder } from '@sss/forms';
import { FormlyModule } from '@ngx-formly/core';
import { TextConfig } from '../../models/text.config';
import { get } from 'lodash';

@Component({
  selector: 'app-config-text-wrapper-dialog',
  standalone: true,
  imports: [CommonModule, FormlyModule, ReactiveFormsModule],
  templateUrl: './config-text-wrapper-dialog.component.html',
  styleUrls: ['./config-text-wrapper-dialog.component.scss'],
})
export class ConfigTextWrapperDialogComponent {
  fields: any;
  formGroup = new FormGroup({});
  model: any;
  constructor(
    public dialogRef: MatDialogRef<ConfigTextWrapperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fields = [
      LayoutBuilder.column([
        DefaultBuilder.textArea()
          .required(true)
          .key('value')
          .readonly(false)
          .label('Add Text')
          .value(),
      ]),
    ];
  }

  closeDialog() {
    this.dialogRef.close();
  }
  save() {
    let textConfig: TextConfig = {
      label: get(this.formGroup.value, 'value'),
    };
    this.dialogRef.close(textConfig);
    console.log(this.formGroup.value);
  }
}
