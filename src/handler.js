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

    console.log(allTheData);

    request.on('end', function() {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);

      fs.readFile(path.join(__dirname, '../src/posts.json'), function (error, file) {
        if (error) {
          console.log(error);
        };

        var blogposts = JSON.parse(file);
        var timeStamp = Date.now();

        blogposts[timeStamp] = convertedData.post;

        fs.writeFile(path.join(__dirname, '../src/posts.json'), JSON.stringify(blogposts), function(error) {
          if (error) {
            console.log(error);
          }

          response.writeHead(302, {'Location': '../index.html'});
          response.end();
      });
    });
  });

}  else if (endpoint === '/posts') {
    response.writeHead(200, {'Content-Type': 'text/javascript'});

    fs.readFile(path.join(__dirname, '../src/posts.json'), function (error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });

}  else {
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

module.exports = handler;
