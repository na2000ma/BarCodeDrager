import { Component, OnInit, forwardRef } from '@angular/core';
import { InjectableComponent } from '../../models/injectable.component';
import { FormConfig } from '../../models/form.config';
import { CommonModule } from '@angular/common';
import { LayoutWrapperComponent } from '../../../components/layout-wrapper/layout-wrapper.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PropirtyMenuComponent } from 'src/app/@generator/components/propirty-menu/propirty-menu.component';
import { FormWrapperService } from 'src/app/@generator/services/form-wrapper.service';
import { FormGroupProvider } from './services/form-group-provider.service';
import { EventsName } from '../../models/events.names';
import { DataSetterHandler } from '../../models/handlers/data.setter.handler';
import { DataRefProviderService } from '../../models/data-ref/data-ref-provider.service';
import { get } from 'lodash';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss'],
  imports: [
    CommonModule,
    forwardRef(() => LayoutWrapperComponent),
    ReactiveFormsModule,
    PropirtyMenuComponent],
  providers: [
    {
      provide: FormGroupProvider,
      useClass: FormGroupProvider
    }
  ],
  standalone: true
})
export class FormWrapperComponent implements InjectableComponent, OnInit {
  config: FormConfig;
  formGroup: FormGroup;
  constructor(private formGroupProvider: FormGroupProvider) {
    this.formGroup = new FormGroup({});
    this.formGroupProvider.formGroup = this.formGroup;
  }
  ngOnInit(): void {
  }

  handleSubmit() {
    const submitHandler = get(this.config, ['events', EventsName.SUBMIT]);
    if (submitHandler) {
      submitHandler.handle({
        value: this.formGroup.value
      })
    }
  }

  handleChange(e) {
    new DataSetterHandler().handle({
      key: '$form',
      value: this.formGroup.value
    });
    // const changeHandler = get(this.config, ['events', EventsName.CHANGE]);
    // if (changeHandler) {
    //   changeHandler.handle({
    //     key: '$form',
    //     value: this.formGroup.value
    //   })
    // }
  }

}
