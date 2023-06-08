import { _NodeData } from "../../models/node";
import { EventHandler } from "./events.names";

export interface  FormConfig {
    layout?: any;
    isFormWrapper?: boolean,
    events?: EventHandler,
  }
