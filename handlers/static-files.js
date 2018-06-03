const url = require('url');
const fs = require('fs');
const path = require('path');

let getContentType = (url) => {
    if(url.endsWith('.css')){
        return 'text/css';
    } else if(url.endsWith('.html')) {
        return 'text/html';        
    } else if(url.endsWith('.ico')) {
        return 'image/x-icon';
    } else if(url.endsWith('.js')) {
        return 'application/javascript';
    } else if(url.endsWith('.json')) {
        return 'application/json';
    }
};

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if(req.pathname.startsWith('/content/') && req.method === 'GET'){
        fs.readFile('.' + req.pathname, (err, data) => {
            if(err){
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('Resource not found!');
                console.log(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type': getContentType(req.pathname)
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};