import {Component, DoCheck} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements DoCheck {
  constructor(public router: Router) {
  }
  isHomeActive = true;
  isFlowchartActive = false;
  ngDoCheck() {
    if (this.router.url.includes('home')) {
      this.isHomeActive = true;
      this.isFlowchartActive = false;
    }
    if (this.router.url.includes('flowchart')) {
      this.isFlowchartActive = true;
      this.isHomeActive = false;
    }
  }
}
