import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutWrapperComponent } from "../layout-wrapper/layout-wrapper.component";

@Component({
    selector: 'app-production-container',
    standalone: true,
    templateUrl: './production-container.component.html',
    styleUrls: ['./production-container.component.scss'],
    imports: [CommonModule, LayoutWrapperComponent]
})
export class ProductionContainerComponent {
  config = {};
}
