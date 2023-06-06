import { actionsButtonsEnum } from './../../enums/actions-buttons.enum';
import { SubLayoutService } from './../../services/sub-layout.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { NodeCreator } from '../../models/node';
import { PropirtyMenuComponent } from '../propirty-menu/propirty-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { ActionsMenuComponent } from '../actions-menu/actions-menu.component';

@Component({
  selector: 'app-development-container',
  standalone: true,
  imports: [
    CommonModule,
    LayoutWrapperComponent,
    PropirtyMenuComponent,
    ActionsMenuComponent,
    MatIconModule,
  ],
  templateUrl: './development-container.component.html',
  styleUrls: ['./development-container.component.scss'],
})
export class DevelopmentContainerComponent implements OnInit {
  isProductView = false;
  config = this.subLayoutService.rootLayout;
  actionsMenuConfigs = [
    {
      name: actionsButtonsEnum.productionView,
      icon: 'visibility',
      handle: () => {
        this.isProductView = !this.isProductView;
      },
    },
    {
      name: actionsButtonsEnum.save,
      icon: 'save',
      handle: () => {},
    },
    {
      name: actionsButtonsEnum.cancel,
      icon: 'back',
      handle: () => {},
    },
  ];
  constructor(private subLayoutService: SubLayoutService) {}

  ngOnInit(): void {}
}
