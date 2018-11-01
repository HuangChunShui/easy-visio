import {Component, DoCheck} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.less']
})
export class FullComponent implements DoCheck {
  constructor(public router: Router) {
  }
  isFileListActive = false
  isHomeActive = true;
  isFlowchartActive = false;
  isMyFlowchartActive = false;
  items = [
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
      items: [
        {label: 'Delete', icon: 'pi pi-fw pi-trash'},
        {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
      ]
    }
  ];
  ngDoCheck() {
    if (this.router.url.includes('home')) {
      this.isHomeActive = true;
      this.isFlowchartActive = false;
      this.isMyFlowchartActive  = false;
      this.isFileListActive = false;
      return;
    }
    if (this.router.url.includes('myflowchart')) {
      this.isHomeActive = false;
      this.isFlowchartActive = false;
      this.isMyFlowchartActive  = true;
      this.isFileListActive = false;
      return;
    }
    if (this.router.url.includes('flowchart')) {
      this.isFlowchartActive = true;
      this.isHomeActive = false;
      this.isMyFlowchartActive  = false;
      this.isFileListActive = false;
      return;
    }
    if (this.router.url.includes('filelist')) {
      this.isFileListActive = true;
      this.isFlowchartActive = false;
      this.isHomeActive = false;
      this.isMyFlowchartActive  = false;
      return;
    }
  }
  logout() {
    this.router.navigateByUrl('/login');
  }
}
