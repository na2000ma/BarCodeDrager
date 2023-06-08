import { Handler } from "./handlers/handler";

export enum EventsName {
  SUBMIT= 'submit',
  CLICK='click',
  CHANGE='change'
}

export interface EventHandler {
  [EventsName.SUBMIT]?: Handler,
  [EventsName.CLICK]?: Handler,
  [EventsName.CHANGE]?: Handler
}
