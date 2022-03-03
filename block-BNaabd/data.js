var http = require('http');
var querystring = require('querystring');
var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  console.log(req, res);
  var dataFormat = (req.headers = ['content-type']);
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (dataFormat === 'application/json') {
      var parsedData = JSON.parse(store);
      res.end(store);
    }
    if (dataFormat === 'application/x-www-form-urlencoded') {
      var parsedData = querystring.parse(store);
      res.end(JSON.stringify(parsedData));
    }
  });
}

server.listen(7000, () => {
  console.log(`Server is listening on port 7000`);
});
