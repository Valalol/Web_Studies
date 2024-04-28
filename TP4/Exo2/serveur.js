// TP Créé par Valentin ESNAULT Grp3

'use strict';

var express = require('express'); // on charge ExpressJS
var api = require('./api/api');
var app = express();    // on récupère notre application

app.use(
    '/',
    express.static('./public/'),
);

app.use(
    '/api',
    api,
);


// Création du serveur web pour notre application sur le port 8080
const server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Application lancée à l\'adresse suivante http://%s:%s', host, port);
});