import { get } from "lodash";
import { LayoutStyleConfForm } from "../form/layout-style-content.form";
import { FormCreaterIn } from "../interfaces/form-creater.interface";

export class LayoutStyleConf implements FormCreaterIn {
    title = 'Updating Property Style';
    form = new LayoutStyleConfForm();
    onSave = (value: any) => {
      return value
    }
    initNodeBeforSaveIt = (node: any, value: any) => {
        let obj = {
            ...node,
            nodeData: {
              ...get(node, 'nodeData'),
              propertyStyle: {
                ...get(node, 'nodeData.propertyStyle'),
                ...value
              }
            }
          }
          return obj
    }
}