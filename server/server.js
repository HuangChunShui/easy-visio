var restify = require('restify');

var server = restify.createServer({
  name: 'easyvisio',
  version: '1.0.0'
});
/*server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());*/

server.get('/api/test', function (req, res, next) {
  res.send(200);
  return next();
});

server.listen(9999, function () {
  console.log('%s listening at %s', server.name, server.url);
});
