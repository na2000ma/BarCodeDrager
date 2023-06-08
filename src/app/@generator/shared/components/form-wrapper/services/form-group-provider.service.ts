import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable()
export class FormGroupProvider {
  formGroup: FormGroup;
  constructor() {
  }
}
