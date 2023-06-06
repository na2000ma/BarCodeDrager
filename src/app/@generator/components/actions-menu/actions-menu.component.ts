import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsMenuConfig } from '../../models/actions-menu-config.model';
import { MatIconModule } from '@angular/material/icon';
import { isFunction } from 'lodash';

@Component({
  selector: 'app-actions-menu',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.scss']
})
export class ActionsMenuComponent implements OnInit{
  @Input('Actions') actionsConfigs:ActionsMenuConfig[];
  isOpen=false;
  close=true;
  n;
  open(e:Event){
    e.stopPropagation();
    this.close=!this.close;
    if(this.isOpen){

      setTimeout(()=>{this.isOpen=!this.isOpen;},500)
    }

    else
    this.isOpen=!this.isOpen;
  }
  ngOnInit(): void {
      this.n=this.actionsConfigs.length
  }
  handleClick(e:Event,config){
    e.stopPropagation()
    if(isFunction(config.handle)){
      config.handle()
    }
  }

}
