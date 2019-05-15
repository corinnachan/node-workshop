var http = require('http');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');

function handler(request, response) {
  var method = request.method;
  console.log(method);

  var endpoint = request.url;
  console.log(endpoint);

  if (endpoint === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});

    fs.readFile(path.join(__dirname, '../public/index.html'), function (error, file) {
      if (error) {
        console.log(error);
        return;
      }

      response.end(file);
    });
  }

  else if (endpoint === '/create/post') {
    var allTheData = '';
    request.on('data', function (chunkOfData) {
      allTheData += chunkOfData;
    });

    request.on('end', function() {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.writeHead(302, {'Location': '../index.html'});
      response.end();
    });
  }

  else {
      response.writeHead(200);

      fs.readFile(path.join(__dirname, '../public/') + endpoint, function (error, file) {
        if (error) {
          console.log(error);
          return;
        }

      response.end(file);
    });

    }
};

var server = http.createServer(handler);

server.listen(3000, function () {

  console.log('Server is listening on port 3000. Ready to accept requests!');

});

module.exports = handler;
