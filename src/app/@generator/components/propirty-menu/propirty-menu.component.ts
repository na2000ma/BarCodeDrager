import { ButtonWrapperComponent } from './../../shared/components/button-wrapper/button-wrapper.component';
import { _NodeData } from './../../models/node';

import { Subscription } from 'rxjs';
import { PropirtyMenuService } from './../../services/propirty-menu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { get, isFunction, omit } from 'lodash';
import { StringToFormCreater } from '../../models/string-to-form-creater.mapper';
import { FormCreaterIn } from '../../interfaces/form-creater.interface';
import { FormCreaterCon } from '../../models/form-creater-config.mapper';
import { FormTypesEnum } from '../../enums/configTypes.enum';

@Component({
  selector: 'app-propirty-menu',
  standalone: true,
  imports: [CommonModule, FormlyModule, ReactiveFormsModule],
  templateUrl: './propirty-menu.component.html',
  styleUrls: ['./propirty-menu.component.scss']
})
export class PropirtyMenuComponent implements OnInit, OnDestroy {
  title: string
  configForm: FormCreaterIn
  model: any;
  formGroup = new FormGroup({});
  hide = true;
  selectedNode;
  selectedType: FormTypesEnum
  subscription = new Subscription()
  constructor(private propirtyMenuService: PropirtyMenuService) {

  }
  ngOnInit(): void {
    this.subscription.add(
      this.propirtyMenuService.hide.subscribe(value => {
        this.hide = value;
      }));
    this.subscription.add(
      this.propirtyMenuService.selectedNode.subscribe(
        (node) => {
          this.selectedType = get(node, 'selectedType')
          this.selectedNode = get(node, 'node');
          if (!get(this.selectedNode, 'id'))
            return
          this.reset()
          this.init()
        }))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  init(){
    this.configForm = FormCreaterCon[StringToFormCreater[this.selectedType]]();
    this.model = this.initStylePropertyBeforViewIt(this.selectedNode)
  }
  onHide() {
    LayoutWrapperComponent._selectedId = -1;
    this.propirtyMenuService.hidePropirtyMenu();
  }
  show() {
    console.log(this.selectedNode);
  }
  initStylePropertyBeforViewIt(node: any) {
    let styleProperties: any;
    styleProperties = {...get(node, 'nodeData.propertyStyle')}
    return styleProperties;
  }
  reset() {
    this.model = {};
  }
  OnSave(){
    if(isFunction(this.configForm.onSave)){
      if(isFunction(this.configForm.initNodeBeforSaveIt)){
        this.propirtyMenuService.selectedNodeAfterChangeStyle.emit(this.configForm.initNodeBeforSaveIt(this.selectedNode, this.formGroup.value));
        // this.configForm.onSave(this.configForm.initNodeBeforSaveIt(this.selectedNode, this.formGroup.value))
      }else{
        this.propirtyMenuService.selectedNodeAfterChangeStyle.emit(this.configForm.onSave(this.formGroup.value))
        // this.configForm.onSave(this.formGroup.value)
      }
    }
  }
}
