import { FormlyFieldConfig, FormlyFieldProps, FormlyFormOptions } from "@ngx-formly/core";
import { BaseForm, DefaultBuilder, LayoutBuilder } from "@sss/forms";
import { FormField } from "@sss/forms/lib/models/form-field";

interface ButtonFormDef {
    name: () => FormField;
    width: () => FormField;
    height: () => FormField;
    padding: () => FormField
    backgroundColor: () => FormField;
    color: () => FormField
}

export class ButtonForm implements BaseForm {
    objLayoutBuilder: any[]
    static fields: ButtonFormDef = {
        name: () => DefaultBuilder.input()
            .key('name')
            .label('name')
            .placeholder(""),
        width: () => DefaultBuilder.input()
            .key('width')
            .label('width')
            .placeholder(""),
        height: () => DefaultBuilder.input()
            .key('height')
            .label('height')
            .placeholder(""),
        padding: () => DefaultBuilder.input()
            .key('padding')
            .label('padding')
            .placeholder(""),
        backgroundColor: () => DefaultBuilder.input()
            .key('backgroundColor')
            .label('backgroundColor')
            .placeholder(""),
            color: () => DefaultBuilder.input()
            .key('color')
            .label('color')
            .placeholder("")
    }
    options?: FormlyFormOptions;
    fields: FormlyFieldConfig<FormlyFieldProps & { [additionalProperties: string]: any; }>[] = [
        LayoutBuilder.row([
            LayoutBuilder.column([
                ButtonForm.fields.name().value(),
                ButtonForm.fields.padding().value()
            ])]),
        LayoutBuilder.row([
            LayoutBuilder.column([
                ButtonForm.fields.width().value(),
                ButtonForm.fields.height().value()
            ])
        ]),
        LayoutBuilder.row([
            LayoutBuilder.column([
                ButtonForm.fields.color().value()
            ])])
    ];
}
