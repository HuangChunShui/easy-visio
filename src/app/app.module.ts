import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';
import { appRoutes } from './app.routes';
import {HomeComponent} from './home/home.component';
import {HomeNavComponent} from './home/nav/nav.component';
import {FlowchartComponent} from './flowchart/flowchart.component';
import {FlowchartNavComponent} from './flowchart/nav/nav.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, HomeNavComponent, FlowchartComponent, FlowchartNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
