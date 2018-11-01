import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  cities1: any;
  selectedCity1: any;
  test = 10;
  showGrid = true;
  cols = [];
  display = true;
  cars: any = [{ vin: 1 , year: 1,
  brand: 1,
  color: 1}];
  selectFont(v) {
    console.log(v);
  }

  ngOnInit() {
    this.cols = [
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
    ];
    if ($.support.boxModel) { // 是W3C盒子模型
     console.log('W3C盒子模型') ;
    } else { // 是IE盒子模型
     console.log('W3C盒IE子模型') ;
    }
    setTimeout(()=> {
      $("#myModal").modal();
    },2000)
  }
}
