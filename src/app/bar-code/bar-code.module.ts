import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarCodeComponent } from './bar-code.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FloorPipe } from './pipes/floor.pipe';
import { NgDirectionDirective } from '../directives/ng-direction.directive';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ReactiveFormsModule } from '@angular/forms';
import { PageService } from './page.service';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../app.module';
export function loadData(pageService: PageService) {
  return () => pageService.loadData();
}
const routes: Routes = [
  {
    path: '',
    component: BarCodeComponent
  }
];
@NgModule({
  declarations: [
    BarCodeComponent,
    NavBarComponent,
    SideBarComponent,
    NavBarComponent,
    FloorPipe,
    NgDirectionDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OverlayModule,
    PortalModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
})
export class BarCodeModule {}

