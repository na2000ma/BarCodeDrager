import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-wrapper',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './content-wrapper.component.html',
  styleUrls: ['./content-wrapper.component.scss']
})
export class ContentWrapperComponent implements OnInit {
  @ViewChild('viewport', {read: ViewContainerRef, static: true})
  viewport: ViewContainerRef;

  @Input('component-name') componentRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    if(this.componentRef) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componentRef.component);
      const componentRef = this.viewport.createComponent(componentFactory);
      componentRef.instance['config'] = this.componentRef.config;
    }
  }
}
