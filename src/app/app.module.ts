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
import {ContextMenuComponent} from './flowchart/context-menu.component';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, HomeNavComponent, FlowchartComponent, FlowchartNavComponent, ContextMenuComponent
  ],
  imports: [
    BrowserModule,
    DropdownModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
