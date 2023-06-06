import { BaseForm } from "@sss/forms";
declare type _Node = any;
export interface FormCreaterIn {
    form: BaseForm;
    title: string;
    onSave: (value) => void;
    initNodeBeforSaveIt: (node: _Node, value: any) => void
  }