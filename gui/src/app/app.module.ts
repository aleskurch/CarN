import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from "./shared/components/header/header.module";
import { StateModule } from './state/state.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StateModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
