import { Component } from "@angular/core";
import { ButtonConfig } from "./button.config";
import { FormConfig } from "./form.config";

export interface InjectableComponent {
  config: ButtonConfig | FormConfig
}
