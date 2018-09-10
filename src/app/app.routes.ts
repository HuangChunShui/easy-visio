import {HomeComponent} from './home/home.component';
import {FlowchartComponent} from './flowchart/flowchart.component';

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
];
