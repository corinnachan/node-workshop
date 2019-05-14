var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var message = 'I am so happy to be part of the Node Girls workshop!';
var nodeMessage = 'This is the message for Node endpoint!';
var girlsMessage = 'This is the message for Girls endpoint!';

function handler (request, response) {

  var method = request.method;
  console.log(method);

  var endpoint = request.url;
  console.log(endpoint);

  if (endpoint === '/') {
    response.writeHead(200, {'Content-type': 'text/html'});
    fs.readFile(__dirname + '/public/index.html', function (error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else if (endpoint === '/node') {
      response.writeHead(200, {'Content-type': 'text/html'});
      response.write(nodeMessage);
      response.end();

  } else if (endpoint === '/girls') {
      response.writeHead(200, {'Content-type': 'text/html'});
      response.write(girlsMessage);
      response.end();

  } else if (endpoint === '/create-post'){
      var allTheData = '';
      request.on('data', function (chunkOfData) {

        allTheData += chunkOfData;
      });

      request.on('end', function () {

        var convertedData = querystring.parse(allTheData);
        console.log(convertedData);
        response.writeHead(302, {'Location': '/'})
        response.end();
      });
  }



  else {
    response.writeHead(200);
    fs.readFile(__dirname + '/public/' + endpoint, function (error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  }



}



var server = http.createServer(handler);

server.listen(3000, function () {
  console.log('Server is listening on port 3000. Ready to accept reqeusts!');
})
