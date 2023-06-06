import { ButtonConfig } from "../shared/models/button.config";
import { FormConfig } from "../shared/models/form.config";
import { InjectableComponent } from "../shared/models/injectable.component";

export class _NodeData {
  propertyStyle?: {
    height?: number | string;
    width?: number | string;
    padding?: number | string;
    justifyContent?: string;
    alignItems?: string
    flex?: number;
  }
  children?: _Node[] | _NodeData[];
  type?: 'col' | 'row';
  content?: {
    component?: InjectableComponent,
    config?: ButtonConfig | FormConfig
  }[];
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
    this.id = new Date().getTime();
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
  addForm(form: InjectableComponent) {
    let config: FormConfig = {
      layout: this.nodeData
    }
    this.addContent(form, config)
  }
  private addContent(component: InjectableComponent = null, config: ButtonConfig | FormConfig = null) {
    if (!this.nodeData.content)
      this.nodeData.content = []
    this.nodeData.content.push({ component: component, config: config })
  }
}

export function NodeCreator(node: _NodeData, parent?: _Node) {
  const createdNode = new _Node(node, parent)
  node.children = node.children.map((childNode) =>
    NodeCreator(childNode, parent)
  );
  return createdNode;
}
