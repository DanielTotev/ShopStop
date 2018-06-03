const url = require('url');
const fs = require('fs');
const path = require('path');
const filePath = `./views/home/index.html`;


module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if(req.pathname === '/' && req.method === 'GET'){
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err){
                console.log(err);
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else { 
        return true;
    }
};