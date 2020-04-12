const http = require('http');
const port = 3000;

const fs = require('fs');

const server = http.createServer(function(req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    fs.readFile('index.html', function(error, data) {
        if(error) {
            res.writeHead(404);
            res.write('Error!')
        } else {
            res.write(data);
        }        
        res.end();
    })
})

server.listen(port, function(err) {
    if(err) {
        console.log('error', err);
    } else {
        console.log('server is running in port:'+ port);
    }
})