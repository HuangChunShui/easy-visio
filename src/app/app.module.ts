import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
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
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ColorPickerModule} from 'primeng/colorpicker';
import {SpinnerModule} from 'primeng/spinner';
import {SelectButtonModule} from 'primeng/selectbutton';
import {NumberInputComponent} from './flowchart/number-input.component';
import {TooltipModule} from 'primeng/tooltip';
import {CheckboxModule} from 'primeng/checkbox';
import {MyFlowchartComponent} from './flowchart/my-flowchart.component';
import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {LoginComponent} from './login/login.component';
import {FullComponent} from './full.component';
import {FileListComponent} from './filelist/filelist.component';
import {FileListNavComponent} from './filelist/nav/nav.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MessagesModule} from 'primeng/messages';
import {MenubarModule} from 'primeng/menubar';
@NgModule({
  declarations: [
    AppComponent, HomeComponent, HomeNavComponent, FlowchartComponent, FlowchartNavComponent, ContextMenuComponent,
    NumberInputComponent, MyFlowchartComponent, LoginComponent, FullComponent, FileListComponent, FileListNavComponent
  ],
  imports: [
    HttpClientModule,
    TableModule,
    BrowserModule,
    DropdownModule, InputTextModule, ButtonModule, ColorPickerModule, SpinnerModule, SelectButtonModule, TooltipModule, CheckboxModule,
    BrowserAnimationsModule, SplitButtonModule, MessagesModule, MenubarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
