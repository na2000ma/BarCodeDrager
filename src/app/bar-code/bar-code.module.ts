import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarCodeComponent } from './bar-code.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FloorPipe } from './pipes/floor.pipe';
import { NgDirectionDirective } from '../directives/ng-direction.directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageService } from './page.service';
import { RouterModule, Routes } from '@angular/router';
export function loadData(pageService: PageService) {
  return () => pageService.loadData();
}
const routes: Routes = [
  {
    path: 'barCode',
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
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadData,
      deps: [PageService],
      multi: true,
    },
  ],
})
export class BarCodeModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
