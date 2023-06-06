import { Injectable } from '@angular/core';
import { NodeCreator } from '../models/node';

@Injectable({
  providedIn: 'root'
})
export class SubLayoutService {

  constructor() { }
  subLayout;
  rootLayout=NodeCreator({
    propertyStyle: {
      width: '100%',
      height: '100%',
      padding: '1rem',
      justifyContent: 'unset',
      alignItems: 'unset'
    },
    type: 'col',
    children: [],

  });;
}
