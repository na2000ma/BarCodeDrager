import { Component, Input, OnChanges, OnInit, forwardRef } from '@angular/core';
import { InjectableComponent } from '../../models/injectable.component';
import { FormConfig } from '../../models/form.config';
import { CommonModule } from '@angular/common';
import { LayoutWrapperComponent } from '../../../components/layout-wrapper/layout-wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonConfig } from '../../models/button.config';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss'],
  imports: [
    CommonModule,
    forwardRef(() => LayoutWrapperComponent),
    ReactiveFormsModule],
  standalone: true
})
export class FormWrapperComponent implements InjectableComponent, OnInit{
  config: FormConfig = {
    layout: {
      type: 'col',
      propertyStyle: {
        padding: '1rem',
      },
      children: [],
      content: []
    }
  };
  ngOnInit(): void {
    this.config = {
      layout: {
        type: 'col',
        propertyStyle: {
          padding: '1rem',
        },
        children: [],
        content: []
      }
    };
  }
}
