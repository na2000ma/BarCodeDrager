import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { InputConfig } from '../../models/input.config';
import { InjectableComponent } from '../../models/injectable.component';
import { DefaultBuilder } from '@sss/forms';
import { FormGroupProvider } from '../form-wrapper/services/form-group-provider.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wrapper-input',
  standalone: true,
  imports: [CommonModule, FormlyModule],
  templateUrl: './wrapper-input.component.html',
  styleUrls: ['./wrapper-input.component.scss']
})
export class WrapperInputComponent implements OnInit, InjectableComponent {
  set config(value: InputConfig) {
        this.fields = [
          DefaultBuilder.input()
            .required(value.required || false)
            .key(value.key)
            .readonly(value.readonly || false)
            .label(value.label || '')
            .placeholder(value.placeholder || '')
            .value()
    ]
  }
  fields: FormlyFieldConfig[]
  model:any;
  formGroup: FormGroup;
  constructor(private formGroupProvider: FormGroupProvider){
    this.formGroup = this.formGroupProvider.formGroup;
  }
  ngOnInit(): void {
  }
}
