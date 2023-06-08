import { DevelpmentService } from './../../services/development.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { APIS } from 'src/app/config/driver.apis';
import { SubLayoutService } from '../../services/sub-layout.service';
import { NodeCreator } from '../../models/node';
import { get } from 'lodash';
import { map } from 'rxjs';

@Component({
  selector: 'app-production-container',
  standalone: true,
  templateUrl: './production-container.component.html',
  styleUrls: ['./production-container.component.scss'],
  imports: [CommonModule, LayoutWrapperComponent],
})
export class ProductionContainerComponent implements OnInit {
  rootLayout: any = {};
  rootLayout$;
  constructor(private develpmentService: DevelpmentService) {}
  ngOnInit(): void {
    this.rootLayout$ = this.develpmentService.getLayers(APIS.getLayers).pipe(
      map((res) => {
        if (res) {
          console.log(res);
          return NodeCreator(res);
        } else {
          return NodeCreator({
            propertyStyle: {
              width: '100%',
              height: '100%',
              padding: '1rem',
              justifyContent: 'unset',
              alignItems: 'unset',
            },
            type: 'col',
            children: [],
          });
        }
      })
    ).subscribe(data => this.rootLayout = data);

    //this.rootLayout$.subscribe((data) => (this.rootLayout = data));
  }
}
