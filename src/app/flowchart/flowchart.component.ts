import {Component, NgZone, OnInit} from '@angular/core';
@Component({
  templateUrl: 'flowchart.component.html',
  styleUrls: ['flowchart.component.less']
})
export class FlowchartComponent implements OnInit {
  isFlowchartActive = true;
  nodes = [[], [], [], []];
  hollowCircle = {
    endpoint: ['Dot', { radius: 5 }],  // 端点的形状
    // connectorStyle: connectorPaintStyle,// 连接线的颜色，大小样式
    // connectorHoverStyle: connectorHoverStyle,
    paintStyle: {
      strokeWidth: 1,
      fill: 'blue',
      outlineStroke: 'white',
    },		// 端点的颜色样式
    anchor: 'AutoDefault',
    isSource: true,	// 是否可以拖动（作为连线起点）
    connector: 'Straight',
    // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
    isTarget: true,	// 是否可以放置（连线终点）
    maxConnections: -1,	// 设置连接点最多可以连接几条线
    connectorOverlays: [['Arrow', { width: 5, length: 5, location: 1 }]]
  };
  constructor( private zone: NgZone) {

  }
   ngOnInit() {
     $('#left .node').draggable({
       revert: 'invalid', // 当未被放置时，条目会还原回它的初始位置
       containment: 'document',
       helper: 'clone',
       scope: 'ss',
     });
     $('#right').droppable({
       scope: 'ss',
       drop:  (event, ui: any) => {
         this.CreateModel(ui, $('#right'));
       }
     });
   }

   CreateModel(ui, selector) {
     // 1.1 添加html模型
     const modelid = $(ui.draggable).attr('id').split('_')[1];
     const left = ui.offset.left - $(selector).offset().left + 'px';
     const top = ui.offset.top - $(selector).offset().top + 'px';
     const id  = this.uuid();
     this.nodes[parseInt(modelid, 10)].push({id : id, name: '', style: {'top': top , 'left': left}});
     this.zone.run(() => {});
     // jsPlumb.setContainer($("#divCenter"));
     // 1.2 添加连接点
     jsPlumb.addEndpoint(id, { anchor: 'Right'}, this.hollowCircle);
     jsPlumb.addEndpoint(id, { anchor: 'Left' }, this.hollowCircle);
     jsPlumb.addEndpoint(id, { anchor: 'Top' }, this.hollowCircle);
     jsPlumb.addEndpoint(id, { anchor: 'Bottom' }, this.hollowCircle);
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

  mouseover(id) {
    jsPlumb.deleteEveryEndpoint();
    jsPlumb.repaintEverything();
  }

   uuid() {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
     });
  }
}
