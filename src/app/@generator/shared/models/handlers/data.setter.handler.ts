import { Inject } from "@angular/core";
import { DataRefProviderService } from "../data-ref/data-ref-provider.service";
import { Handler } from "./handler";
import { AppInjector } from "src/app/app.module";

export class DataSetterHandler extends Handler {
  dataRefProviderService = AppInjector.get(DataRefProviderService);
  constructor() {
    super();
  }
  override handle(config: {
    key: string,
    value: any
  }) {
    this.dataRefProviderService.setValueByKey(config.key, config.value)
  }
}
