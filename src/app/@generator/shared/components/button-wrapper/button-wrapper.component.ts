import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InjectableComponent } from 'src/app/@generator/shared/models/injectable.component';
import { ButtonConfig } from '../../models/button.config';

@Component({
  selector: 'app-button-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-wrapper.component.html',
  styleUrls: ['./button-wrapper.component.scss']
})
export class ButtonWrapperComponent implements InjectableComponent {
  config!: ButtonConfig;
  constructor() {
    // super();
  }
}
