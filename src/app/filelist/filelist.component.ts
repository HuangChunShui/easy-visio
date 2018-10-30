import {Component, forwardRef, OnInit, Output, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FlowchartService} from '../services/flowchart.service';

@Component({
  templateUrl: 'filelist.component.html'
})
export class FileListComponent  implements OnInit{
  cols = [
    { field: 'name', header: 'name' },
    { field: 'create_at', header: 'create_at' },
    { field: 'modify_at', header: 'modify_at' }
  ];
  filelist = [];
  constructor(public flowchartService: FlowchartService) {}
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.flowchartService.getFlowcharts().then((res: any) => {
      this.filelist = JSON.parse(res);
    });
  }
/*  filelist: any = [{ name: 'file_1' , id: 1,  create_at: '201810271010', modify_at: '201810271111'},
    { name: 'file_2' , id: 2,  create_at: '201811281010', modify_at: '201811281111'}]*/;
  delete(id) {
    console.log('del:', id);
    this.flowchartService.delFlowchart(id).then( () => {
      this.getData();
    });
  }
  edit(id) {
    console.log('edit:', id);
  }
}
