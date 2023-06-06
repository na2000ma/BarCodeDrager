import { ButtonForm } from "../form/button.form";
import { FormCreaterIn } from "../interfaces/form-creater.interface";

export class ButtonConf implements FormCreaterIn {
    title = 'Updating Button Config';
    form = new ButtonForm();
    onSave = (value: any) => {
        return value
    }
    initNodeBeforSaveIt: (node: any, value: any) => any;
}