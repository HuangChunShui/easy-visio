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
}
