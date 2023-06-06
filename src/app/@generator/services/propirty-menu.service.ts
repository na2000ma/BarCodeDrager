import { EventEmitter, Injectable } from '@angular/core';
import { FormTypesEnum } from '../enums/configTypes.enum';


@Injectable({
  providedIn: 'root'
})

export class PropirtyMenuService {
  hide = new EventEmitter<boolean>();
  selectedNode = new EventEmitter<{ selectedType: FormTypesEnum, node: any }>();
  selectedNodeAfterChangeStyle = new EventEmitter<any>();

  constructor() { }

  showPropirtyMenu() {
    this.hide.emit(false);
  }
  hidePropirtyMenu() {
    this.hide.emit(true);
  }
}
