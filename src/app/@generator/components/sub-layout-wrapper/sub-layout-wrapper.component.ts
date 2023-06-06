import { SubLayoutService } from './../../services/sub-layout.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { PropirtyMenuComponent } from '../propirty-menu/propirty-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { ActionsMenuComponent } from '../actions-menu/actions-menu.component';
import { actionsButtonsEnum } from '../../enums/actions-buttons.enum';
import { Router } from '@angular/router';
import { cloneDeep, get, set } from 'lodash';

@Component({
  selector: 'app-sub-layout-wrapper',
  standalone: true,
  imports: [CommonModule,LayoutWrapperComponent,PropirtyMenuComponent,ActionsMenuComponent,MatIconModule],
  templateUrl: './sub-layout-wrapper.component.html',
  styleUrls: ['./sub-layout-wrapper.component.scss']
})
export class SubLayoutWrapperComponent implements OnInit{
  subLayout;
  lastValueSubLayout;
  rootLayout;
  subView=true;
  isProductView=false;
  actionsMenuConfigs=[

    {
      name:actionsButtonsEnum.productionView,
      icon:'visibility',
      handle:()=>{this.isProductView=!this.isProductView;}

    },
      {
        name:actionsButtonsEnum.save,
        icon:'save',
        handle:()=>{this.router.navigate(['development-builder'])}

      },
      {
        name:actionsButtonsEnum.cancel,
        icon:'back',
        handle:()=>{
          Object.keys(this.lastValueSubLayout).forEach((key)=>{
           set(this.subLayout,key,get(this.lastValueSubLayout,key))
          });
          this.router.navigate(['development-builder'])
        }
      },
      {
        name:actionsButtonsEnum.viewOrigin,
        icon:'',
        handle:()=>{
         this.subView=!this.subView;
         LayoutWrapperComponent._selectedId=this.subLayout.id
        }
      },
    ];


  constructor(private subLayoutService:SubLayoutService,private router:Router){

  }
  ngOnInit(): void {
      this.subLayout=this.subLayoutService.subLayout;
      this.rootLayout=this.subLayoutService.rootLayout;
      this.lastValueSubLayout=cloneDeep(this.subLayout);
  }

}
