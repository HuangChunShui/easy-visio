import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import { hollowCircle, FONT_LIST, LINE_STYLE_OPTION } from './flowchart.conf';
import {UtilService} from '../services/util.service';
@Component({
  templateUrl: 'flowchart.component.html',
  styleUrls: ['flowchart.component.less']
})
export class FlowchartComponent implements OnInit, AfterViewInit {
  models = [{id: 0, name: 'radius'},
    {id: 1, name: 'rect'},
    {id: 2, name: 'rect1'},
    {id: 3, name: 'circle'},
    {id: 4, name: 'square'},
    {id: 5, name: 'parallelogra'}];
  showMenu = false;
  mouse_location: any = {};
  cur_node: any = {id: '', model_id: '', style: { left: '', top: ''}};
  copy_node = {id: '', name: '', model_id: '', location: { left: '', top: '', width: '', height: ''},  style: { width: '', height: ''}};
  right_menu_style = {left: '', top: ''};
  nodes = [];
  fontlist = FONT_LIST;
  LINE_STYLE = {lable: '直线', code : 'Straight'};
  line_style_option = LINE_STYLE_OPTION;
  FONT_FAMILY: any = {lable: '宋体', code : 'SimSun'};
  FONT_SIZE = 20;  // 默认字体大小
  FONT_STYLE = 'normal';
  FONT_WEIGHT = 'normal';
  TEXT_DECORATION = 'none';
  FONT_COLOR = '#000';
  BACKGOUND_COLOR = '#fff';
  selectedNode: any = {};
  showSetFontColor = false;
  showSetBackGroudColor = false;
  constructor( private zone: NgZone,
               public util: UtilService,
               public changeDetectorRef: ChangeDetectorRef) {

  }

  selectFont(font) {
    if (!this.selectedNode.font) {
      this.selectedNode.font = {};
    }
    this.selectedNode.font['font-family'] = font.code;
  }

  setFontSize(size) {
    if (!this.selectedNode.font) {
      this.selectedNode.font = {};
    }
    this.selectedNode.font['font-size'] = size + 'px';

  }

  setBold() {
    if (!this.selectedNode.font) {
      this.selectedNode.font = {};
    }
    this.selectedNode.font['font-weight'] = 'bold';
  }

  setFontStyle() {
    if (!this.selectedNode.font) {
      this.selectedNode.font = {};
    }
    this.selectedNode.font['font-style'] = 'italic';
  }

  setUnderline() {
    if (!this.selectedNode.font) {
      this.selectedNode.font = {};
    }
    this.selectedNode.font['text-decoration'] = 'underline';
  }

  setFontColor(o) {
    this.showSetFontColor = false;
    if (!this.selectedNode.font) {
      this.selectedNode.font = {};
    }
    this.selectedNode.font.color = o.value;
  }
  setBackGroudColor(o) {
    this.showSetBackGroudColor = false;
    this.selectedNode.style['background-color'] = o.value; // 设置背景色用
  }

  clickInput(node) {
    this.selectedNode = node;
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
    this.copy_node = JSON.parse(JSON.stringify(this.cur_node));
    // this.copy_node.id = this.uuid();
  }

  pasteNode(e) {
    this.showMenu = false;
    this.copy_node.id = this.uuid();
    const offset_left = $('#right').offset().left;
    const offset_top = $('#right').offset().top;
    this.copy_node.location.top = this.mouse_location.top - offset_top + 'px';
    this.copy_node.location.left = this.mouse_location.left - offset_left + 'px';
    this.copy_node.location.width = $('#' + this.cur_node.id).width() + 'px';
    this.copy_node.location.height = $('#' + this.cur_node.id).height() + 'px';
    this.copy_node.style.width = $('#shape_' + this.cur_node.id).width() + 'px';
    this.copy_node.style.height = $('#shape_' + this.cur_node.id).height() + 'px';
    this.nodes[this.copy_node.model_id].push(JSON.parse(JSON.stringify(this.copy_node)));
    this.changeDetectorRef.detectChanges();
    this.setNodeAtribute(this.copy_node.id);
  }
  ngAfterViewInit() {
    $('#left .model_container').draggable({
      revert: 'invalid', //  当未被放置时，条目会还原回它的初始位置
      containment: 'document',
      helper: 'clone',
      scope: 'r',
    });
  }
  ngOnInit() {
    $('#right').droppable({
      scope: 'r',
      drop:  (event, ui: any) => {
        this.CreateModel(ui, $('#right'));
      }
    });
    window.onclick = (e) => {
      this.showMenu = false;
    };
/*    jsPlumb.bind('connection', function (connInfo, originalEvent) {
    });*/
  }

  selectLineStyle(l: any) {
    hollowCircle.connector[0] = l.code;
  }

  CreateModel(ui, selector) {
    const modelid = $(ui.draggable).attr('id').split('_')[1];
    const left = ui.offset.left - $(selector).offset().left + 'px';
    const top = ui.offset.top - $(selector).offset().top + 'px';
    const id  = this.uuid();
    if (!this.nodes[parseInt(modelid, 10)]) {    // 只初始化一次，否则重复放同一个元素会有异常
      this.nodes[parseInt(modelid, 10)] = [];
    }
    this.nodes[parseInt(modelid, 10)].push({
      id : id,
      name: '',
      model_id: modelid,
      font: {
        'font-size': this.FONT_SIZE + 'px',
        'font-family': this.FONT_FAMILY.code,
        'color': this.FONT_COLOR,
        'text-decoration': this.TEXT_DECORATION,
        'font-weight': this.FONT_WEIGHT,
        'font-style': this.FONT_STYLE
      },
      location: {'top': top , 'left': left},
      // style: {'top': top , 'left': left, 'background': this.BACKGOUND_COLOR}});
    style: {'background': this.BACKGOUND_COLOR}});
    this.zone.run(() => {});
    this.setNodeAtribute(id);
  }

  uuid() {
    return this.util.uuid();
  }

/***设置node属性，设置属性之前node 必须已经存在
 * 1. 为node增加自动连线的端点（endpoint）; *
 * 2. 设置node为可拖拽
 * 3. 设置node为可缩放
 * ****/
  setNodeAtribute(id) {
    jsPlumb.addEndpoints(id, [{ anchor: 'Right'}, { anchor: 'Left' }, { anchor: 'Top' }, { anchor: 'Bottom' }], hollowCircle);
    jsPlumb.draggable(id, {
      grid: [10, 10]
    });
    /****
     * 当光标在 draggable 上指定部分时才允许拖拽。使用 handle 选项来指定用于拖拽对象的元素（或元素组）的 jQuery 选择器
     * 当光标在 draggable 内指定元素（或元素组）上时不允许拖拽。使用 cancel选项来指定取消拖拽功能的 jQuery 选择器
     * **/
    $('#' + id).draggable({
      // cancel: '.title',
      grid: [10, 10],
      containment: $('#right'),
      stop: function () {
        jsPlumb.repaintEverything();
      },
      start: function () {
        jsPlumb.repaintEverything();
      },
      drag:  (event, _ui) => {
        jsPlumb.repaintEverything();
      }
    });
    $('#' + id).resizable({
      aspectRatio: true, // 保持纵横比
      autoHide : true, // 隐藏缩放手柄
      stop: function( event, e ) {
        jsPlumb.repaintEverything();
      }
    });
  }
}
