import { EventHandler } from "./events.names";

export interface  InputConfig {
    readonly: boolean;
    required: boolean;
    key: string;
    label: string;
    placeholder: string;
    events?: EventHandler;
  }
