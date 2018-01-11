let http = require('http');

function onRequest(request, response) {
    console.log(request.url);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello world!!");
    response.end();
}

http.createServer(onRequest).listen(8888);
console.log('Server is running...')