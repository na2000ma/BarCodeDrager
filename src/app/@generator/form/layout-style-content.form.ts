import { FormlyFieldConfig, FormlyFieldProps, FormlyFormOptions } from "@ngx-formly/core";
import { BaseForm, DefaultBuilder, LayoutBuilder } from "@sss/forms";
import { FormField } from "@sss/forms/lib/models/form-field";

interface NodeStyleFormDef {
  width: () => FormField;
  height: () => FormField;
  padding: () => FormField;
  margin: () => FormField
  backgroundColor: () => FormField;
  addContent: () => FormField
}
const content = [
  {key: 'button', value: 'button'},
  {key: 'form', value: 'form'},
  {key: 'grid', value: 'grid'}
]
export class LayoutStyleConfForm implements BaseForm {
  objLayoutBuilder: any[]
  static fields: NodeStyleFormDef = {
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
      margin: () => DefaultBuilder.input()
      .key('margin')
      .label('margin')
      .placeholder(""),
      backgroundColor: () => DefaultBuilder.input()
      .key('backgroundColor')
      .label('backgroundColor')
      .placeholder(""),
      addContent: () => DefaultBuilder.select()
      .key('content')
      .keyProp('key')
      .displayProp('value')
      .enableClearButton(true)
      .options(content)
  }
      options?: FormlyFormOptions;
      fields: FormlyFieldConfig<FormlyFieldProps & { [additionalProperties: string]: any; }>[] = [
        LayoutBuilder.row([
          LayoutBuilder.column([
            LayoutStyleConfForm.fields.width().value(),
            LayoutStyleConfForm.fields.height().value()
          ])]),
          LayoutBuilder.row([
          LayoutBuilder.column([
            LayoutStyleConfForm.fields.padding().value(),
            LayoutStyleConfForm.fields.margin().value()
          ])
        ]),
        LayoutBuilder.row([
          LayoutBuilder.column([
            LayoutStyleConfForm.fields.backgroundColor().value(),
            LayoutStyleConfForm.fields.addContent().value()
          ])
        ])
      ];
  }
