import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  cities1: any;
  selectedCity1: any;
  test = 10;
  selectFont(v) {
    console.log(v);
  }
  ngOnInit() {
    if ($.support.boxModel) { // 是W3C盒子模型
     console.log('W3C盒子模型') ;
    } else { // 是IE盒子模型
     console.log('W3C盒IE子模型') ;
    }
    $( '#spinner' ).spinner();
    this.cities1 = [
      {label: 'Select City', value: null},
      {label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}},
      {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
      {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
      {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}},
      {label: 'Paris', value: {id: 5, name: 'Paris', code: 'PRS'}}
    ];
  }
}
