import {Component, forwardRef, OnInit, Output, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  templateUrl: 'filelist.component.html'
})
export class FileListComponent  {
  cols = [
    { field: 'vin', header: 'Vin' },
    { field: 'year', header: 'Year' },
    { field: 'brand', header: 'Brand' },
    { field: 'color', header: 'Color' }
  ];
  cars: any = [{ vin: 1 , year: 1,
    brand: 1,
    color: 1}];
}
