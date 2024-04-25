'use strict';

var http = require('http'); // import du module http
var server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        const url = request.url.split('?');
        const path = url[0];
        const args = url[1];
        const body = `<!DOCTYPE html>
            <html>
            <head>
            <meta charset="utf-8">
            <title>Bonjour</title>
            </head>
            
            <body>
            <p>Analyse de votre requête:</p>
            <p>Vous accédez à l'url: ${path}</p>
            <p>La chaine de requête est: ${args}</p>
            </body>
            </html>`;

        response.writeHead(200, {
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'text/html',
        });
        response.write(body);
    }
    else {
        response.writeHead(501);
    }
    response.end(); // on envoie la réponse
}).listen(8080);
console.log('Serveur lancé sur le port 8080...');

