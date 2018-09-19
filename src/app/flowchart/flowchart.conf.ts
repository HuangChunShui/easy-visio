/**
 * Created by root on 9/15/18.
 */
export let hollowCircle = {
  endpoint: ['Dot', { radius: 5 }],  // 端点的形状
  // connectorStyle: connectorPaintStyle,// 连接线的颜色，大小样式
  // connectorHoverStyle: connectorHoverStyle,
  paintStyle: {
    strokeWidth: 1,
    fill: 'blue',
    outlineStroke: 'white',
  },      // 端点的颜色样式
  anchor: 'AutoDefault',
  isSource: true,  // 是否可以拖动（作为连线起点）
  connector: 'Straight',
  // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
  isTarget: true,  // 是否可以放置（连线终点）
  maxConnections: -1,  // 设置连接点最多可以连接几条线
  connectorOverlays: [['Arrow', { width: 8, length: 8, location: 1 }]]
};


export let FONT_LIST = [{lable: '宋体', code : 'SimSun'},
  {lable: '楷体', code: 'KaiTi'},
  {lable: '仿宋', code: 'FangSong'},
  {lable: '新宋体', code: 'NSimSun'},
  {lable: 'Times New Roman', code: 'Times New Roman'},
  {lable: '微软雅黑', code: 'Microsoft YaHei'}];
