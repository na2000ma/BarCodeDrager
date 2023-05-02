import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarCodeComponent } from './bar-code/bar-code.component';
import { SideBarComponent } from './bar-code/side-bar/side-bar.component';
import { NavBarComponent } from './bar-code/nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { FloorPipe } from './pipes/floor.pipe';
import { NgDirectionDirective } from './directives/ng-direction.directive';
import { AppLoaderComponent } from './loader/app-loader/app-loader.component';
import { PageService } from './bar-code/page.service';
export function loadData(pageService: PageService) {
  return () => pageService.loadData();
}
@NgModule({
  declarations: [
    AppComponent,
    BarCodeComponent,
    NavBarComponent,
    SideBarComponent,
    NavBarComponent,
    FloorPipe,
    NgDirectionDirective,
    AppLoaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    OverlayModule,
    PortalModule,
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
    PageService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadData,
      deps: [PageService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
