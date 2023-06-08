import { ButtonWrapperComponent } from "../components/button-wrapper/button-wrapper.component";
import { FormWrapperComponent } from "../components/form-wrapper/form-wrapper.component";
import { WrapperNames } from "./wrapper-names.enum";
import { TextWrapperComponent } from "../components/text-wrapper/text-wrapper.component";
import { WrapperInputComponent } from "../components/input-wrapper/wrapper-input.component";

export const WrapperMapper = {
  [WrapperNames.BUTTON_WRAPPER]: ButtonWrapperComponent,
  [WrapperNames.FORM_WRAPPER]: FormWrapperComponent,
  [WrapperNames.INPUT_WRAPPER]: WrapperInputComponent,
  [WrapperNames.TEXT_WRAPPER]: TextWrapperComponent
}
