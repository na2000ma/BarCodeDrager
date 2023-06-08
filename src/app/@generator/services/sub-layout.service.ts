import { Injectable } from '@angular/core';
import { NodeCreator } from '../models/node';
import { DevelpmentService } from './development.service';
import { APIS } from 'src/app/config/driver.apis';
import { get } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SubLayoutService {
  rootLayout: any = NodeCreator({
    propertyStyle: {
      width: '100%',
      height: '100%',
      padding: '1rem',
      justifyContent: 'unset',
      alignItems: 'unset'
    },
    type: 'col',
    children: [],

  })
  subLayout: any
  constructor(private develpmentService: DevelpmentService) {
    // develpmentService.getLayers(APIS.getLayers).subscribe(data => {
    //   if(get(data, '_responseValue.body')){
    //     this.rootLayout = NodeCreator(get(data, '_responseValue.body'))
    //   }else{
    //     this.rootLayout = NodeCreator({
    //       propertyStyle: {
    //         width: '100%',
    //         height: '100%',
    //         padding: '1rem',
    //         justifyContent: 'unset',
    //         alignItems: 'unset'
    //       },
    //       type: 'col',
    //       children: [],
      
    //     })
    //   }
    // })
   }
}
