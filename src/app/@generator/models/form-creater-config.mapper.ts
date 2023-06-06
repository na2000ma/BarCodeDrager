import { ButtonConf } from "../config-form-creator/button.conf";
import { LayoutStyleConf } from "../config-form-creator/property-style.conf";
import { FormTypesEnum } from "../enums/configTypes.enum";

export const FormCreaterCon = {
    [FormTypesEnum.Layout]: () => new LayoutStyleConf(),
    [FormTypesEnum.Button]: () => new ButtonConf(),
  }