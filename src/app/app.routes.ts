import {HomeComponent} from './home/home.component';
import {FlowchartComponent} from './flowchart/flowchart.component';
import {MyFlowchartComponent} from './flowchart/my-flowchart.component';

export const appRoutes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
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
];
