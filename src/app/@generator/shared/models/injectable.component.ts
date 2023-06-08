import { Component } from "@angular/core";
import { ButtonConfig } from "./button.config";
import { FormConfig } from "./form.config";
import { InputConfig } from "./input.config";
import { TextConfig } from "./text.config";

export interface InjectableComponent {
  config: ButtonConfig | FormConfig | InputConfig | TextConfig
}
