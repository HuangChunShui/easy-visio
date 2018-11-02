import {Component, forwardRef, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'modify-filename',
  templateUrl: 'modify-filename.component.html',
  styleUrls: ['modify-filename.component.less'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ModifyFilenameComponent),
    multi: true
  }]
})
export class ModifyFilenameComponent  {
  show = false;
  @Input()
  set showModal(v) {
    if (v) {
      this.show = true;
      $('#myModal').modal();
    }
  } false;
  @Output() filenameChange =  new EventEmitter();
  filename = '';
  save() {
    this.filenameChange.emit(this.filename);
  }
}
