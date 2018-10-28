import {Component, forwardRef, OnInit, Output, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  templateUrl: 'filelist.component.html'
})
export class FileListComponent  {
  cols = [
    { field: 'name', header: 'name' },
    { field: 'create_at', header: 'create_at' },
    { field: 'modify_at', header: 'modify_at' }
  ];
  filelist: any = [{ name: 'file_1' , id: 1,  create_at: '201810271010', modify_at: '201810271111'},
    { name: 'file_2' , id: 2,  create_at: '201811281010', modify_at: '201811281111'}];
  delete(id) {
    console.log('delete:', id);
  }
  edit(id) {
    console.log('edit:', id);
  }
}
