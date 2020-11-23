import { BrowserModule } from '@angular/platform-browser';
import {CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule,  NgxUiLoaderHttpModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertModule } from './_alert';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { CommonsharedmoduleModule } from './commonsharedmodule/commonsharedmodule.module';


// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "rgba(0,0,0,0.1)",
  "bgsOpacity": 0.5,
  "bgsPosition": "center-center",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#fff",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "three-strings",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": false,
  "text": '',
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

declare global {
  

  interface Date {
    getMonthName(): string;
    getDayName():string;
    nextDrawDate():string;
    lastDrawDate():string;

  }
  interface Number{
    zero():any;
  }
  
}

let iconClasses = {
  error: ' toast-error',
  info: 'toast-info',
  success: 'toast-success',
  warning: 'toast-warning'
}

@NgModule({
  declarations: [
    AppComponent,
   
    // HeaderComponent,
    // FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AlertModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      iconClasses: iconClasses,
      closeButton: true,
      easing: 'ease-in',
      enableHtml: true,
      onActivateTick: true
    }),
    CommonsharedmoduleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
