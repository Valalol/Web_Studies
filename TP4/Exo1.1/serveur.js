'use strict';

var http = require('http'); // import du module http
var server = http.createServer(function (request, response) {
    response.writeHead(200); // code de statut HTTP
    response.write('Bonjour tout le monde !'); // contenu de la réponse
    response.end(); // on envoie la réponse
}).listen(8080);
console.log('Serveur lancé sur le port 8080...');

