import {HomeComponent} from './home/home.component';
import {FlowchartComponent} from './flowchart/flowchart.component';
import {MyFlowchartComponent} from './flowchart/my-flowchart.component';
import {LoginComponent} from './login/login.component';
import {FullComponent} from './full.component';
import {FileListComponent} from './flowchart/filelist.component';

export const appRoutes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'full',
    component: FullComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'flowchart',
        component: FlowchartComponent
      },
      {
        path: 'myflowchart',
        component: MyFlowchartComponent
      },
      {
        path: 'filelist',
        component: FileListComponent
      }
    ]
  }
];
