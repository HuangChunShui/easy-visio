import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    if ($.support.boxModel) { // 是W3C盒子模型
     console.log('W3C盒子模型') ;
    } else { // 是IE盒子模型
     console.log('W3C盒IE子模型') ;
    }
  }
}
