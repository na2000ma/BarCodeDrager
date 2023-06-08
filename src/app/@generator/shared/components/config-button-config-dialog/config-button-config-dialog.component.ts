import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { DefaultBuilder, LayoutBuilder } from '@sss/forms';
import { get } from 'lodash';
import { ButtonConfig } from '../../models/button.config';

@Component({
  selector: 'app-config-button-config-dialog',
  standalone: true,
  imports: [CommonModule, FormlyModule, ReactiveFormsModule],
  templateUrl: './config-button-config-dialog.component.html',
  styleUrls: ['./config-button-config-dialog.component.scss'],
})
export class ConfigButtonConfigDialogComponent {
  fields: any;
  formGroup = new FormGroup({});
  model: any;

  constructor(
    public dialogRef: MatDialogRef<ConfigButtonConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    let BUTTON_TYPE = [
      { type: 'Button', id: 1 },
      { type: 'Submit', id: 2 },
      { type: 'Reset', id: 3 },
    ];
    this.fields = [
      LayoutBuilder.column([
        DefaultBuilder.input()
          .required(true)
          .key('button')
          .readonly(false)
          .label('Add Button')
          .value(),
      ]),
      LayoutBuilder.column([
        DefaultBuilder.select()
          .required(true)
          .key('type')
          .readonly(false)
          .label('type')
          .options(BUTTON_TYPE)
          .displayProp('type')
          .keyProp('id')
          .value(),
      ]),
    ];
  }
  closeDialog() {
    this.dialogRef.close();
  }
  save() {
    let buttonConfig: ButtonConfig = {
      label: get(this.formGroup.value, 'button'),
      type: get(this.formGroup.value, 'type'),
    };
    this.dialogRef.close(buttonConfig);
    console.log(this.formGroup.value);
  }
}
