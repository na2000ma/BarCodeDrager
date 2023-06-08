import { cloneDeep, get } from "lodash";
import { FormWrapperComponent } from "../shared/components/form-wrapper/form-wrapper.component";
import { ButtonConfig } from '../shared/models/button.config';
import { FormConfig } from '../shared/models/form.config';
import { InjectableComponent } from '../shared/models/injectable.component';
import { InputConfig } from '../shared/models/input.config';
import { TextConfig } from '../shared/models/text.config';
import { WrapperNames } from "../shared/models/wrapper-names.enum";

export class _NodeData {
  propertyStyle?: {
    height?: number | string;
    width?: number | string;
    padding?: number | string;
    justifyContent?: string;
    alignItems?: string;
    flex?: number;
  };
  children?: _Node[] | _NodeData[];
  type?: 'col' | 'row';
  content?: {
    component?: any,
    config?: ButtonConfig | FormConfig | InputConfig | TextConfig
  }[];
  isFormWrapper?: boolean;
}

class _Node {
  nodeData: _NodeData;
  parent: _Node;
  level: number;
  id: number;
  constructor(nodeData: _NodeData, parent: _Node) {
    this.nodeData = nodeData;
    this.parent = parent;
    this.level = parent ? parent.level + 1 : 0;
    this.id = new Date().getTime() * Math.random();
  }
  append(node: _NodeData) {
    if (!this.nodeData.children) {
      this.nodeData.children = [NodeCreator(node, this)];
      return;
    }
    this.nodeData.children.push(NodeCreator(node, this));
  }

  delete() {
    if (!this.parent) return false;
    const itemIndex = this.parent.nodeData.children.indexOf(this);
    this.parent.nodeData.children.splice(itemIndex, 1);
    return true;
  }
  addContent(
    component: InjectableComponent,
    config: ButtonConfig | FormConfig | TextConfig | InputConfig = null
  ) {
    if (!this.nodeData.content) this.nodeData.content = [];
    this.nodeData.content.push({ component: component, config: config });
  }
  toNodeData(){
    const tempData = cloneDeep(this.nodeData);
    if(get(tempData, 'content')){
      if(tempData.content.length){
        if(tempData.content[0].component == WrapperNames.FORM_WRAPPER){
          tempData.content[0].config['layout'] = tempData.content[0].config['layout'].toNodeData()
        }
      }
    }
    tempData.children = tempData.children.map(item => {
      return item.toNodeData();
    })
    return tempData
  }
}

export function NodeCreator(node: _NodeData, parent?: _Node) {
  const createdNode = new _Node(node, parent);
  if(get(node, 'content')) {
    if(get(node, 'content.0.component') == WrapperNames.FORM_WRAPPER) {
      const formConfig = node.content[0].config;
      formConfig['layout'] = NodeCreator(formConfig['layout'])
    }
  }
  node.children = (node.children || []).map((childNode) =>
    NodeCreator(childNode, createdNode))
  return createdNode;
}
