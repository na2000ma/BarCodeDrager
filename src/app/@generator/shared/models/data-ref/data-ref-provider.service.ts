import { Injectable } from "@angular/core";
import { get, set } from "lodash";


@Injectable({
  providedIn: 'root'
})
export class DataRefProviderService {
  dataStoreKeys= {};
  constructor() {}

  addKey(key, defaultValue?: any) {
    set(this.dataStoreKeys, key, defaultValue);
  }

  getValueByKey(key, path: string = '') {
    return get(this.dataStoreKeys, key.split('.'));
  }

  setValueByKey(key, value, path: string = '') {
    set(this.dataStoreKeys, [key], value);
  }
}
