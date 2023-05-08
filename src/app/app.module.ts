import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarCodeModule } from './bar-code/bar-code.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BarCodeModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
