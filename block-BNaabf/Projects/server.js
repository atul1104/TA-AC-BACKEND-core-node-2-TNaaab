var http = require('http');

var server = http.createServer(handleRequest);
var qs = require('querystring');
var fs = require('fs');

function handleRequest(req, res) {
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.method === 'GET' && req.url === '/form') {
      res.setHeader('content-type', 'text/html');
      fs.createReadStream('./form.html').pipe(res);
    }
    if (req.method === 'POST' && req.url === '/form') {
      var parsedData = qs.parse(store);
      res.setHeader('content-type', 'text/html');
      res.write(`<h3>${parsedData.name}</h3>`);
      res.write(`<p>${parsedData.email}</p>`);
      res.write(`<p>${parsedData.age}</p>`);
      res.end();
    }
  });
}

server.listen(5678, () => {
  console.log(`Server is listening on port 5678`);
});
