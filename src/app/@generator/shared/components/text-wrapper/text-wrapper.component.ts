import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextConfig } from '../../models/text.config';
import { FormlyModule } from '@ngx-formly/core';
import { InjectableComponent } from '../../models/injectable.component';
import { DataRefProviderService } from '../../models/data-ref/data-ref-provider.service';
import { get } from 'lodash';
@Component({
  selector: 'app-text-wrapper',
  standalone: true,
  imports: [CommonModule, FormlyModule],
  templateUrl: './text-wrapper.component.html',
  styleUrls: ['./text-wrapper.component.scss'],
})
export class TextWrapperComponent implements OnInit, InjectableComponent {
  config: TextConfig;

  get label() {
    if(get(this.config, 'label.0') === '$') {
      return this.dataRefProviderService.getValueByKey(this.config.label);
    }
    return get(this.config, 'label')
  }
  constructor(private dataRefProviderService: DataRefProviderService) {}
  ngOnInit(): void {}
}
