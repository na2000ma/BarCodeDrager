import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[ngDirection]',
})
export class NgDirectionDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
  @Input() set ngDirection(obs: Observable<any>) {
    this.viewContainer.createEmbeddedView(this.templateRef);
    obs.subscribe(() => {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    });
  }
}
