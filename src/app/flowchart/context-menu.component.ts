import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
@Component({
  templateUrl: 'context-menu.component.html',
  selector: 'app-context-menu',
  styleUrls: ['context-menu.component.less']
})
export class ContextMenuComponent implements OnInit {
  @Input() custom_style = {top: 0, left: 0};
  @Output() operate = new EventEmitter();
  constructor( ) {
  }
   ngOnInit() {

   }

   click(op_type) {
     this.operate.emit(op_type);
   }

}
