var http = require('http');
var fs = require('fs');
var usersPath = __dirname + '/users/';
var url = require('url');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var parsedURL = url.parse(req.url, true);
  var store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    //handle all routes
    if (req.method === 'POST' && req.url === '/users') {
      var username = JSON.parse(store).username;
      fs.open(usersPath + username + '.json', 'wx', (err, fd) => {
        if (err) return console.log(err);
        fs.write(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            return res.end(`${username} created successfully`);
          });
        });
      });
    }
    if (req.method === 'GET' && parsedURL.pathname === '/users') {
      var username = parsedURL.query.username;
      fs.readFile(usersPath + username + '.json', (err, content) => {
        if (err) return console.log(err);
        res.setHeader('content-type', 'application/json');
        return res.end(content);
      });
    }
    if (req.method === 'PUT' && parsedURL.pathname === '/users') {
      var username = parsedURL.query.username;
      fs.open(usersPath + username + '.json', 'r+', (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
              return res.end(`${username} updated successfully`);
            });
          });
        });
      });
    }
    if (req.method === 'DELETE' && parsedURL.pathname === '/users') {
      var username = parsedURL.query.username;
      fs.unlink(usersPath + username + '.json', (err) => {
        if (err) return console.log(err);
        return res.end(`${username} successfully deleted`);
      });
    }
    res.statusCode = 404;
    res.end('Page Not Found');
  });
}

server.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});
