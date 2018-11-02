var restify = require('restify');

var server = restify.createServer({
  name: 'easyvisio',
  version: '1.0.0'
});

function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.get('/api/test', function (req, res, next) {
  res.send(200);
  return next();
});
FLOWCHARTS = [];
server.post('/api/session', function (req, res, next) {
  console.log(req.body);
  let request = JSON.parse(req.body);
  if(request.username === 'admin' && request.password === 'admin') {
    res.send(201,req.body);
  } else {
    res.send(400, {errorMsg: '请输入正确的用户名和密码'});
  }
  return next();
});

server.post('/api/flowcharts', function (req, res, next) {
  let request = JSON.parse(req.body);
  FLOWCHARTS.push({
    id: uuid(),
    name:request.name,
    content: request.data,
    create_at:  new Date().toLocaleTimeString(),
    modify_at:new Date().toLocaleTimeString()
  });
  res.send(201,req.body);
});

server.put('/api/flowcharts/:id', function (req, res, next) {
  let request = JSON.parse(req.body);
  FLOWCHARTS.forEach(f => {
    if(f.id === req.params.id) {
      f.modify_at = new Date().toLocaleTimeString();
      f.name = request.name;
      if(request.data) { f.content = request.data; }
      res.send(200,req.body);
      return
    }
  });
/*
  res.send(400, {errorMsg: '文件'+ req.name +'不存在'});
*/
});


server.get('/api/flowcharts', function (req, res, next) {
  res.send(200, JSON.stringify(FLOWCHARTS));
});

server.get('/api/flowcharts/:id', function (req, res, next) {
  let flowchart =  FLOWCHARTS.find(f=> f.id === req.params.id)
  res.send(200, JSON.stringify(flowchart));
});

server.del('/api/flowcharts/:id', function (req, res, next) {
  FLOWCHARTS =  FLOWCHARTS.filter(f=> f.id !== req.params.id)
  res.send(204);
});

server.listen(9999, function () {
  console.log('%s listening at %s', server.name, server.url);
});
