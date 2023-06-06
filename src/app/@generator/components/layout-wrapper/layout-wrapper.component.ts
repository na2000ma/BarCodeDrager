import { SubLayoutService } from './../../services/sub-layout.service';
import { FormTypesEnum } from './../../enums/configTypes.enum';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from '../content-wrapper/content-wrapper.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { PropirtyMenuService } from '../../services/propirty-menu.service';
import { _NodeData } from '../../models/node';
import { Subscription } from 'rxjs';
import { get } from 'lodash';
import { Router } from '@angular/router';
import { FormWrapperComponent } from '../../shared/components/form-wrapper/form-wrapper.component';
declare type _Node = any;
@Component({
  selector: 'app-layout-wrapper',
  standalone: true,
  imports: [CommonModule, ContentWrapperComponent, MatMenuModule],
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss'],
})
export class LayoutWrapperComponent implements OnDestroy, OnInit {
  @Input('layer') layers: _Node;
  @Input('mode') isDevMode: boolean = false;
  @Input('isRoot') isRoot: boolean;
  @Input('subLayoutMode') subLayoutMode:boolean;
  @Input('isFormWrapper') isFormWrapper: boolean = false;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  static _selectedId;
  static _isProductView = false;
  @Input('isProductView') set setIsProductView(value) {
    LayoutWrapperComponent._isProductView = value;
  }
  subscription = new Subscription()
  contextMenuPosition = { x: '0px', y: '0px' };

  get selectedId() {
    return LayoutWrapperComponent._selectedId
  }
  get isProductView() {
    return LayoutWrapperComponent._isProductView
  }

  constructor(public propirtyMenuService: PropirtyMenuService,
    private subLayoutService: SubLayoutService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.subscription.add(
      this.propirtyMenuService.selectedNodeAfterChangeStyle.subscribe(
        (node: _Node) => {
          if (node && LayoutWrapperComponent._selectedId == this.layers.id) {
            this.layers.nodeData = get(node, 'nodeData')
          }
        }
      )
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
    LayoutWrapperComponent._selectedId = this.layers.id;
    this.propirtyMenuService.hidePropirtyMenu();
  }
  public setSelectedId() {
    LayoutWrapperComponent._selectedId = LayoutWrapperComponent._selectedId === this.layers.id ? -1 : this.layers.id;
  }

  selectItem(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (LayoutWrapperComponent._selectedId === this.layers.id) {
      this.propirtyMenuService.hidePropirtyMenu()
    } else {
      this.propirtyMenuService.showPropirtyMenu()
    }
    LayoutWrapperComponent._selectedId = LayoutWrapperComponent._selectedId === this.layers.id ? -1 : this.layers.id;
    this.propirtyMenuService.selectedNode.emit({ selectedType: FormTypesEnum.Layout, node: this.layers });
  }

  addNode(nodeType: 'row' | 'col' = 'row', addingType = 'child') {
    if (addingType == 'child') {
      this.layers.append({
        type: nodeType,
        propertyStyle: {
          padding: '1rem',
        },
        children: [],
        content: []
      });
    } else if (addingType == 'neighbour') {
      this.layers.parent.append({
        type: nodeType,
        propertyStyle: {
          padding: '1rem',
        },
        children: [],
        content: []
      });
    }

  }

  deleteNode() {
    this.layers.delete();
  }
  addForm() {
    this.router.navigateByUrl('development-builder/form-builder')
    this.layers.addForm( FormWrapperComponent )
  }
  get initStyleConfig() {
    return {
      height: this.layers?.nodeData?.propertyStyle?.height || '100%',
      width: this.layers?.nodeData?.propertyStyle?.width || '100%',
      padding: this.layers?.nodeData?.propertyStyle?.padding || '0px',
      justifyContent: this.layers?.nodeData?.propertyStyle?.justifyContent || 'unset',
      alignItems: this.layers?.nodeData?.propertyStyle?.alignItems || 'unset',
      backgroundColor: this.layers?.nodeData?.propertyStyle?.backgroundColor || 'unset',
      margin: this.layers?.nodeData?.propertyStyle?.margin || '0px',
    }
  }
  editAlone() {
    this.subLayoutService.subLayout = this.layers;
    this.router.navigate(['development-builder/sub-layout']);
  }
  addInput(){

  }

}
