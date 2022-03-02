var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  console.log(req, res);
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    console.log(store);
  });
  res.write(store);
}

server.listen(3456, () => {
  console.log(`Server is listening on 3456 port`);
});
