import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DefaultBuilder, LayoutBuilder } from '@sss/forms';
import { FormlyModule } from '@ngx-formly/core';
import { InputConfig } from '../../models/input.config';
import { get } from 'lodash';
@Component({
  selector: 'app-config-wrapper-input-dialog',
  standalone: true,
  imports: [CommonModule, FormlyModule, ReactiveFormsModule],
  templateUrl: './config-wrapper-input-dialog.component.html',
  styleUrls: ['./config-wrapper-input-dialog.component.scss']
})
export class ConfigWrapperInputDialogComponent {
  fields: any
  formGroup = new FormGroup({})
  model: any
  constructor(public dialogRef: MatDialogRef<ConfigWrapperInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.fields = [
      LayoutBuilder.row([
        LayoutBuilder.column([
          DefaultBuilder.input()
          .required(true)
          .key('label')
          .readonly(false)
          .label('Label')
          .value(),
        ]),
        LayoutBuilder.column([
          DefaultBuilder.input()
          .required(true)
          .key('key')
          .readonly(false)
          .label('key')
          .value(),
        ])
      ]),
      LayoutBuilder.row([
        LayoutBuilder.column([
          DefaultBuilder.input()
          .required(false)
          .key('placeholder')
          .readonly(false)
          .label('placeholder')
          .value(),
        ]),
        LayoutBuilder.column([])
      ]),
      LayoutBuilder.row([
        LayoutBuilder.column([
          DefaultBuilder.checkBox()
          .key('readonly')
          .required(false)
          .readonly(false)
          .label('readonly')
          .defaultValue(false)
          .value(),
        ]),
        LayoutBuilder.column([
          DefaultBuilder.checkBox()
          .key('required')
          .required(false)
          .readonly(false)
          .label('required')
          .defaultValue(false)
          .value(),
        ])
      ])
    ]
  }

  closeDialog(){
    this.dialogRef.close()
  }
  save(){
    let inputConfig: InputConfig = {
      required: get(this.formGroup.value, 'required') || false,
      readonly: get(this.formGroup.value, 'readonly') || false,
      key: get(this.formGroup.value, 'key'),
      label: get(this.formGroup.value, 'label'),
      placeholder: get(this.formGroup.value, 'placeholder') || ''
    }
    this.dialogRef.close(inputConfig)
  }
}
