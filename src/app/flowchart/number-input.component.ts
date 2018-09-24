import {Component, forwardRef, OnInit, Output, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: 'number-input.component.html',
  styleUrls: ['number-input.component.less'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberInputComponent),
    multi: true
  }]
})
export class NumberInputComponent implements ControlValueAccessor {
  @Output() valueChange =  new EventEmitter();
  private propagateChange: any = {};
  size = 0;
  set value(v: any) {
    if (v !== this.size) {
      this.size = v;
      this.propagateChange(this.size);
    }
  }

  get value() {
    return this.size;
  }
  sizeChange(v) {
    this.valueChange.emit(v);
  }

  writeValue(v: any) {
    if (v) {
      this.size = v;
    }
  }
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched() {}
}
