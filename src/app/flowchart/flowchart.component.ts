import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import { hollowCircle } from './flowchart.conf';
@Component({
  templateUrl: 'flowchart.component.html',
  styleUrls: ['flowchart.component.less']
})
export class FlowchartComponent implements OnInit {
  showMenu = false;
  cur_node: any = {id: '', model_id: '', style: { left: '', top: ''}};
  copy_node = {id: '', name: '', model_id: '', style: { left: '', top: ''}};
  right_menu_style = {left: '', top: ''};
  nodes = [[], [], [], []];
  constructor( private zone: NgZone, public changeDetectorRef: ChangeDetectorRef) {

  }

  right_click(e, node) {   // 右键， 触发显示菜单
    e.preventDefault();
    e.stopPropagation();    // stop global event
    if (!node) {  //   paste
      this.cur_node.style.left = e.clientX - 225 + 'px';
      this.cur_node.style.top = e.clientY  - 60 + 'px';
    } else {     // copy delete
      this.cur_node = JSON.parse(JSON.stringify(node));
      const width = $('#' + node.id).width() + 'px';
      const height = $('#' + node.id).height() + 'px';
      this.cur_node.style.width = width;
      this.cur_node.style.height = height;
    }
    this.right_menu_style = {left: e.clientX + 'px', top: e.clientY + 'px'};
    this.showMenu = true;
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
      style: this.cur_node.style
    };
  }

  pasteNode(e) {
    this.showMenu = false;
    // this.right_menu_style.left = parseInt(this.right_menu_style.left.split('px')[0], 10) - 225 + 'px';
    // this.right_menu_style.top = parseInt(this.right_menu_style.top.split('px')[0], 10) - 60 + 'px';
    this.copy_node.style = this.cur_node.style;
    this.nodes[this.copy_node.model_id].push(this.copy_node);
    this.changeDetectorRef.detectChanges();
    const id = this.copy_node.id;
    jsPlumb.addEndpoint(id, { anchor: 'Right'}, hollowCircle);
    jsPlumb.addEndpoint(id, { anchor: 'Left' }, hollowCircle);
    jsPlumb.addEndpoint(id, { anchor: 'Top' }, hollowCircle);
    jsPlumb.addEndpoint(id, { anchor: 'Bottom' }, hollowCircle);
    jsPlumb.draggable(id);

    // 1.3 ?????draggable?resizable
    $('#' + id).draggable({
      containment: 'parent',
      start: function () {
        jsPlumb.repaintEverything();
      },
      drag:  (event, _ui) => {
        jsPlumb.repaintEverything();
      },
      stop: function () {
        jsPlumb.repaintEverything();
      }
    });

    $('#' + id).resizable({
      stop: function( event, ui) {
        jsPlumb.repaintEverything();
      }
    });
  }

  ngOnInit() {
    window.onclick = (e) => {
      // this.right_menu_style = {};
      // this.cur_node = {id: '', model_id: '', style: {top: '', left: ''}};
      this.showMenu = false;
    };
    $('#left .node').draggable({
      revert: 'invalid', //  当未被放置时，条目会还原回它的初始位置
      containment: 'document',
      helper: 'clone',
      scope: 'ss',
    });
    $('#right').droppable({
      scope: 'ss',
      drop:  (event, ui: any) => {
        this.CreateModel(ui, $('#right'));
      }
    });
  }

  CreateModel(ui, selector) {
    // 1.1 添加html模型
    const modelid = $(ui.draggable).attr('id').split('_')[1];
    const left = ui.offset.left - $(selector).offset().left + 'px';
    const top = ui.offset.top - $(selector).offset().top + 'px';
    const id  = this.uuid();
    this.nodes[parseInt(modelid, 10)].push({
      id : id,
      name: '',
      model_id: modelid,
      style: {'top': top , 'left': left}});
    this.zone.run(() => {});
    // jsPlumb.setContainer($("#divCenter"));
    // 1.2 添加连接点
    jsPlumb.addEndpoint(id, { anchor: 'Right'}, hollowCircle);
    jsPlumb.addEndpoint(id, { anchor: 'Left' }, hollowCircle);
    jsPlumb.addEndpoint(id, { anchor: 'Top' }, hollowCircle);
    jsPlumb.addEndpoint(id, { anchor: 'Bottom' }, hollowCircle);
    jsPlumb.draggable(id);

    // 1.3 注册实体可draggable和resizable
    $('#' + id).draggable({
      containment: 'parent',
      start: function () {
        jsPlumb.repaintEverything();
      },
      drag:  (event, _ui) => {
        jsPlumb.repaintEverything();
      },
      stop: function () {
        jsPlumb.repaintEverything();
      }
    });

    $('#' + id).resizable({
      stop: function( event, e ) {
        jsPlumb.repaintEverything();
      }
    });
  }

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
