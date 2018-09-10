import {Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    jsPlumb.ready(function() {
      const DragFlow = function() {
        const connectorPaintStyle = {
            lineWidth: 4,
            strokeStyle: '#61B7CF',
            joinstyle: 'round',
            outlineColor: '#0e0e7d',
            outlineWidth: 2
          },
          connectorHoverStyle = {
            lineWidth: 4,
            strokeStyle: '#216477',
            outlineWidth: 2,
            outlineColor: '#000'
          },
          endpointHoverStyle = {
            fillStyle: '#470024',
            strokeStyle: '#216477'
          },
          sourceEndpoint = {
            endpoint: 'Dot',
            paintStyle: {
              strokeStyle: '#7AB02C',
              stroke: '#470024',
              strokeWidth: 2,
              fillStyle: '#000',
              radius: 7,
              lineWidth: 3
            },
            isSource: true,

            connector: ['Flowchart', { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
            // connectorStyle: connectorPaintStyle,
            hoverPaintStyle: endpointHoverStyle,
            connectorHoverStyle: connectorHoverStyle,
            dragOptions: {},
            // overlays: [
            //     ['Label', {
            //         location: [0.5, 1.5],
            //         label: 'Drag',
            //         cssClass: 'endpointSourceLabel'
            //     }]
            // ]
          },
          targetEndpoint = {
            endpoint: 'Dot',
            paintStyle: {
              strokeStyle: '#7AB02C',
              stroke: '#000',
              strokeWidth: 2,
              fillStyle: '#000',
              radius: 7,
              lineWidth: 3
            },
            isTarget: true,
            connector: ['Flowchart', { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
            hoverPaintStyle: endpointHoverStyle,
            connectorHoverStyle: connectorHoverStyle,
          };
        // 初始化，返回流程图的对象
        this.init = function(_id) {
          const _instance = jsPlumb.getInstance({
            DragOptions: {
              cursor: 'pointer',
              zIndex: 1000
            },
            ConnectionOverlays: [
              ['Arrow', { location: 1 }],
              ['Label', {
                location: 0.1,
                id: 'label',
                cssClass: 'aLabel'
              }]
            ],
            ReattachConnections: true,
            deleteEndpointsOnDetach: false,
            Container: 'flowchart-demo'
          });

          _instance.doWhileSuspended(function() {
            _instance.draggable(jsPlumb.getSelector('.flowchart-demo .window'), { grid: [20, 20] });
          });

          _instance.bind('click', function(conn, originalEvent) {
            if (confirm('Delete connection from ' + conn.sourceId + ' to ' + conn.targetId + '?')) {
              // 官网文档太不靠谱了！！！！，这是源码暴露的方法，
              // 官网文档那个detach不能用！！！！源码都没有暴露这个方法好吗！！！！
              _instance.deleteConnection(conn);
            }
          });

          _instance.bind('connection', function(info) {
            info.connection.getOverlay('label').setLabel(info.connection.id);
            // 当连接成功后，将箭头上的label改为连接ID
          });

          _instance.bind('connectionDrag', function(connection) {
            console.log('connection ' + connection.id + ' is being dragged. suspendedElement is ',
              connection.suspendedElement, ' of type ', connection.suspendedElementType);
          });

          _instance.bind('connectionDragStop', function(connection) {
            console.log('connection ' + connection.id + ' was dragged');
          });

          _instance.bind('connectionMoved', function(params) {
            console.log('connection ' + params.connection.id + ' was moved');
          });

          // 立即生效
          _instance.fire('jsPlumbDemoNodeAdded', _instance);

          return _instance;

        };
        /**
         * [addEndpoint 添加端点]
         * @param {[type]} _instance      [流程图对象，必传]
         * @param {[type]} id            [目标块id 可以是字符串或者id数组，必传]
         * @param {[type]} _sourceAnchors [起点位置，数组，可不传]
         * @param {[type]} _targetAnchors [终点位置，数组，可不传]
         */
        this.addEndpoint = function(_instance, id, _sourceAnchors, _targetAnchors) {
          if (!_sourceAnchors) {
            _sourceAnchors = ['Top', 'Bottom'];
          }
          if (!_targetAnchors) {
            _targetAnchors = ['Left', 'Right'];
          }

          const deal = function(cur_id) {
            for (let i = 0; i < _sourceAnchors.length; i++) {
              const sourceUUID = cur_id + _sourceAnchors[i];
              _instance.addEndpoint(cur_id, sourceEndpoint, { anchor: _sourceAnchors[i], uuid: sourceUUID });
            }
            for (let j = 0; j < _targetAnchors.length; j++) {
              const targetUUID = cur_id + _targetAnchors[j];
              _instance.addEndpoint(cur_id, targetEndpoint, { anchor: _targetAnchors[j], uuid: targetUUID });
            }
          }

          if (typeof id === 'string') {
            deal(id);
          } else if (typeof id === 'object') {
            $.each(id, function(i, _id) {
              deal(_id);
            });
          }

        };
        this.connect = function(_instance, _uuids) {
          _instance.connect({ uuids: _uuids, editable: true });
        };
      };

      const instance = new DragFlow();
      const instanceInit = instance.init();
      instance.addEndpoint(instanceInit, ['flowchartWindow1', 'flowchartWindow2']);
      instance.addEndpoint(instanceInit, 'flowchartWindow3');
      instance.connect(instanceInit, ['flowchartWindow3Bottom', 'flowchartWindow1Left']);
    });

  }
}
