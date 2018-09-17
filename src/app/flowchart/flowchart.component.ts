import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import { hollowCircle } from './flowchart.conf';
import {UtilService} from '../services/util.service';
@Component({
  templateUrl: 'flowchart.component.html',
  styleUrls: ['flowchart.component.less']
})
export class FlowchartComponent implements OnInit {
  showMenu = false;
  mouse_location: any = {};
  cur_node: any = {id: '', model_id: '', style: { left: '', top: ''}};
  copy_node = {id: '', name: '', model_id: '', style: { left: '', top: '', width: '', height: ''}};
  right_menu_style = {left: '', top: ''};
  nodes = [];
  constructor( private zone: NgZone,
               public util: UtilService,
               public changeDetectorRef: ChangeDetectorRef) {

  }

  right_click_on_blank(e) {
    e.preventDefault();
    e.stopPropagation();    // stop global event
    this.mouse_location = {left: e.clientX, top: e.clientY}; // 相对于body位置
    this.displayMenu(e.clientX, e.clientY);
  }

  displayMenu(x, y) {
    this.right_menu_style = {left: x + 'px', top: y + 'px'};
    this.showMenu = true;
  }

  right_click_on_node(e, node) {
    e.preventDefault();
    e.stopPropagation();    // stop global event
    this.mouse_location = {left: e.clientX, top: e.clientY}; // 相对于body位置
    this.displayMenu(e.clientX, e.clientY);
    this.cur_node = JSON.parse(JSON.stringify(node));
    const width = $('#' + node.id).width() + 'px';
    const height = $('#' + node.id).height() + 'px';
    this.cur_node.width = width;
    this.cur_node.height = height;
  }

  menu_click(op_obj) {  // 菜单点击
    if (op_obj.op_type === 'delete') {
      this.deleteNode();
    }
    if (op_obj.op_type === 'copy') {
      this.copyNode();
    }
    if (op_obj.op_type === 'paste') {
      this.pasteNode(op_obj.ele);
    }
  }

  deleteNode() {
    jsPlumb.removeAllEndpoints($('#' + this.cur_node.id));
    this.nodes[this.cur_node.model_id] =  this.nodes[this.cur_node.model_id].filter(
      (e: any) =>  e.id !== this.cur_node.id);
    $('#' + this.cur_node.id).remove();
    jsPlumb.repaintEverything();
  }

  copyNode() {
    this.copy_node = {
      id : this.uuid(),
      name : '',
      model_id: this.cur_node.model_id,
      style: {left: '', top: '', width: '', height: ''}
    };
  }

  pasteNode(e) {
    this.showMenu = false;
    this.copy_node.id = this.uuid();
    const offset_left = $('#right').offset().left;
    const offset_top = $('#right').offset().top;
    this.copy_node.style.top = this.mouse_location.top - offset_top + 'px';
    this.copy_node.style.left = this.mouse_location.left - offset_left + 'px';
    this.copy_node.style.width = this.cur_node.width;
    this.copy_node.style.height = this.cur_node.height;
    this.nodes[this.copy_node.model_id].push(JSON.parse(JSON.stringify(this.copy_node)));
    this.changeDetectorRef.detectChanges();
    this.setNodeAtribute(this.copy_node.id);
  }

  ngOnInit() {
    window.onclick = (e) => {
      this.showMenu = false;
    };
    $('#left .model').draggable({
      revert: 'invalid', //  当未被放置时，条目会还原回它的初始位置
      containment: 'document',
      helper: 'clone',
      scope: 'r',
    });
    $('#right').droppable({
      scope: 'r',
      drop:  (event, ui: any) => {
        this.CreateModel(ui, $('#right'));
      }
    });
  }

  CreateModel(ui, selector) {
    const modelid = $(ui.draggable).attr('id').split('_')[1];
    const left = ui.offset.left - $(selector).offset().left + 'px';
    const top = ui.offset.top - $(selector).offset().top + 'px';
    const id  = this.uuid();
    this.nodes[parseInt(modelid, 10)] = [];
    this.nodes[parseInt(modelid, 10)].push({
      id : id,
      name: '',
      model_id: modelid,
      style: {'top': top , 'left': left}});
    this.zone.run(() => {});
    this.setNodeAtribute(id);
  }

  uuid() {
    return this.util.uuid();
  }

  setNodeAtribute(id) {
    // 设置属性之前node 必须已经存在
    // 设置node的连线端点
    jsPlumb.addEndpoints(id, [{ anchor: 'Right'}, { anchor: 'Left' }, { anchor: 'Top' }, { anchor: 'Bottom' }], hollowCircle);
    jsPlumb.draggable(id);
    // 设置node可拖拽
    $('#' + id).draggable({
      containment: 'parent',
      stop: function () {
        jsPlumb.repaintEverything();
      }
    });
    // 设置node可缩放
    $('#' + id).resizable({
      stop: function( event, e ) {
        jsPlumb.repaintEverything();
      }
    });
  }
}
