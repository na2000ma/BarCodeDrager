import { SubLayoutService } from './../../services/sub-layout.service';
import { FormTypesEnum } from './../../enums/configTypes.enum';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentWrapperComponent } from '../content-wrapper/content-wrapper.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { PropirtyMenuService } from '../../services/propirty-menu.service';
import { NodeCreator, _NodeData } from '../../models/node';
import { Subscription, map } from 'rxjs';
import { cloneDeep, get } from 'lodash';
import { Router } from '@angular/router';
import { FormWrapperService } from '../../services/form-wrapper.service';
import { InputConfig } from '../../shared/models/input.config';
import { WrapperInputComponent } from '../../shared/components/input-wrapper/wrapper-input.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfigWrapperInputDialogComponent } from '../../shared/components/config-wrapper-input-dialog/config-wrapper-input-dialog.component';
import { FormWrapperComponent } from '../../shared/components/form-wrapper/form-wrapper.component';
import { ConfigTextWrapperDialogComponent } from '../../shared/components/config-text-wrapper-dialog/config-text-wrapper-dialog.component';
import { TextConfig } from '../../shared/models/text.config';
import { TextWrapperComponent } from '../../shared/components/text-wrapper/text-wrapper.component';
import { ConfigButtonConfigDialogComponent } from '../../shared/components/config-button-config-dialog/config-button-config-dialog.component';
import { ButtonWrapperComponent } from '../../shared/components/button-wrapper/button-wrapper.component';
import { ButtonConfig } from '../../shared/models/button.config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventsName } from '../../shared/models/events.names';
import { DataSetterHandler } from '../../shared/models/handlers/data.setter.handler';
import { WrapperNames } from '../../shared/models/wrapper-names.enum';
declare type _Node = any;
const _URL = 'http://localhost:3000/';

@Component({
  selector: 'app-layout-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    ContentWrapperComponent,
    MatMenuModule,
    WrapperInputComponent,
    MatDialogModule,
  ],
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss'],
})
export class LayoutWrapperComponent implements OnDestroy, OnInit {
  @Input('layer') layers: _Node;
  @Input('mode') isDevMode: boolean = false;
  @Input('isRoot') isRoot: boolean;
  @Input('subLayoutMode') subLayoutMode: boolean;
  @Input('isFormWrapper') isFormWrapper: boolean = false;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  itHasContent: boolean = false;
  static _selectedId;
  static _isProductView = false;
  @Input('isProductView') set setIsProductView(value) {
    LayoutWrapperComponent._isProductView = value;
  }
  subscription = new Subscription();
  contextMenuPosition = { x: '0px', y: '0px' };

  get selectedId() {
    return LayoutWrapperComponent._selectedId;
  }
  get isProductView() {
    return LayoutWrapperComponent._isProductView;
  }

  constructor(
    public propirtyMenuService: PropirtyMenuService,
    private subLayoutService: SubLayoutService,
    private formWrapperService: FormWrapperService,
    private router: Router,
    @Optional() private dialog: MatDialog,
    private http: HttpClient,
  ) { }
  ngOnInit(): void {
    this.subscription.add(
      this.propirtyMenuService.selectedNodeAfterChangeStyle.subscribe(
        (node: _Node) => {
          if (node && LayoutWrapperComponent._selectedId == this.layers.id) {
            this.layers.nodeData = get(node, 'nodeData');
          }
        }
      )
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if ((get(this.layers.nodeData, 'content') || []).length != 0) {
      this.itHasContent = true;
    } else {
      this.itHasContent = false;
    }
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
    LayoutWrapperComponent._selectedId = this.layers.id;
    this.propirtyMenuService.hidePropirtyMenu();
  }
  public setSelectedId() {
    LayoutWrapperComponent._selectedId =
      LayoutWrapperComponent._selectedId === this.layers.id
        ? -1
        : this.layers.id;
  }

  selectItem(event: MouseEvent) {

    event.preventDefault();
    event.stopPropagation();
    if (LayoutWrapperComponent._selectedId === this.layers.id) {
      this.propirtyMenuService.hidePropirtyMenu();
    } else {
      this.propirtyMenuService.showPropirtyMenu();
    }
    LayoutWrapperComponent._selectedId =
      LayoutWrapperComponent._selectedId === this.layers.id
        ? -1
        : this.layers.id;
    this.propirtyMenuService.selectedNode.emit({
      selectedType: FormTypesEnum.Layout,
      node: this.layers,
    });

  }

  addNode(nodeType: 'row' | 'col' = 'row', addingType = 'child') {
    if (addingType == 'child') {
      this.layers.append({
        type: nodeType,
        propertyStyle: {
          padding: '1rem',
        },
        children: [],
        content: [],
      });
    } else if (addingType == 'neighbour') {
      this.layers.parent.append({
        type: nodeType,
        propertyStyle: {
          padding: '1rem',
        },
        children: [],
        content: [],
      });
    }
  }

  deleteNode() {
    this.layers.delete();
  }

  get initStyleConfig() {
    return {
      height: this.layers?.nodeData?.propertyStyle?.height || '100%',
      width: this.layers?.nodeData?.propertyStyle?.width || '100%',
      padding: this.layers?.nodeData?.propertyStyle?.padding || '0px',
      justifyContent:
        this.layers?.nodeData?.propertyStyle?.justifyContent || 'unset',
      alignItems: this.layers?.nodeData?.propertyStyle?.alignItems || 'unset',
      backgroundColor:
        this.layers?.nodeData?.propertyStyle?.backgroundColor || 'unset',
      margin: this.layers?.nodeData?.propertyStyle?.margin || '0px',
    };
  }
  editAlone() {
    this.subLayoutService.subLayout = this.layers;
    this.router.navigate(['development-builder/sub-layout']);
  }
  addForm() {
    this.layers.append({
      children: [],
      content: [
        {
          component: WrapperNames.FORM_WRAPPER,
          config: {
            layout: NodeCreator({
              propertyStyle: {
                width: '100%',
                height: '100%',
                padding: '1rem',
                justifyContent: 'unset',
                alignItems: 'unset',
              },
              type: 'col',
              children: [],
              content: [],
            }),
            isFormWrapper: true
          },
          events: {
            [EventsName.CHANGE]: new DataSetterHandler()
          }
        }]
    })

    this.subLayoutService.subLayout = this.layers.nodeData.children[this.layers.nodeData.children.length - 1]
    this.router.navigate(['development-builder/sub-layout']);

  }
  addInput() {
    this.subscription.add(
      this.dialog
        .open(ConfigWrapperInputDialogComponent, {
          data: {
            title: 'Enter Config Input Wrapper',
          },
          width: '500px',
          height: '300px',
        })
        .afterClosed()
        .subscribe((config: InputConfig) => {
          if (config) {
            this.layers.append({
              children: [],
              propertyStyle: {
                width: '100%',
                height: 'fit-content',
              },
              content: [
                {
                  component: WrapperNames.INPUT_WRAPPER,
                  config: {
                    ...config,
                  },
                },
              ],
            });
          }
        })
    );
  }

  addText() {
    this.subscription.add(
      this.dialog
        .open(ConfigTextWrapperDialogComponent, {
          data: {
            title: 'Enter your text',
          },
          width: '500px',
          height: '300px',
        })
        .afterClosed()
        .subscribe((config: TextConfig) => {
          this.layers.addContent(WrapperNames.TEXT_WRAPPER, config);
        })
    );
  }

  addButton() {
    this.subscription.add(
      this.dialog
        .open(ConfigButtonConfigDialogComponent, {
          data: {
            title: 'Enter your button name',
          },
          width: '500px',
          height: '300px',
        })
        .afterClosed()
        .subscribe((config: ButtonConfig) => {
          if (config) {
            this.layers.append({
              propertyStyle: {
                width: '100%',
                height: 'fit-content',
              },
              content: [
                {
                  component: WrapperNames.BUTTON_WRAPPER,
                  config: {
                    ...config,
                  },
                },
              ],
            });
          }
        })
    );
  }
}
