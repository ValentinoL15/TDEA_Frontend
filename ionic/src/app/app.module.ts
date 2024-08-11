import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';





@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule , IonicModule.forRoot(), AppRoutingModule, HttpClientModule, BrowserAnimationsModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy , }, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
