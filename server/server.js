var restify = require('restify');

var server = restify.createServer({
  name: 'easyvisio',
  version: '1.0.0'
});
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.get('/api/test', function (req, res, next) {
  res.send(200);
  return next();
});

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
server.listen(9999, function () {
  console.log('%s listening at %s', server.name, server.url);
});
