var http = require('http');
var qs = require('querystring');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  console.log(req.headers['content-type']);
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      var formData = qs.parse(store);
      res.end(JSON.stringify(formData));
    }
    if (req.headers['content-type'] === 'application/json') {
      res.end(store);
    }
  });
}

server.listen(9000, () => {
  console.log(`Server is listening on port 9000`);
});
