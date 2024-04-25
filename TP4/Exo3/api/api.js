'use strict';

// import du module Express
let express = require('express');
const fetch = require('node-fetch');
const xmldom = require('xmldom').DOMParser;
const xpath = require('xpath');

let app = express();
// let HttpProxyAgent = require( 'http-proxy-agent' );

// // a passer en paramètre de vos appels à fetch pour que node puisse utiliser le proxy
// // a n'utiliser que si vous êtes sur le réseau de l'université !!!
// let options = {
//     // l'adresse du cache varie selon la connexion
//     // filaire : 'http://cache.ha.univ-nantes.fr:3128'
//     // eduroam : 'http://cache.etu.univ-nantes.fr:3128'
//     // univ-nantes : 'http://cache.wifi.univ-nantes.fr:3128'
//     agent: new HttpProxyAgent( 'http://cache.ha.univ-nantes.fr:3128' ),
// };

// export de notre application vers le serveur principal
module.exports = app;

app.get('/genres/', function (req, res) {
    fetch('http://ws.audioscrobbler.com/2.0/?method=tag.getTopTags&api_key=2c08f218f45c6f367a0f4d2b350bbffc')
        .catch(error => console.log(error))
        .then((response) => {
            if (!response.ok) console.error(response);
            else return response.text();
        })
        .then((response) => {
            let doc = new xmldom().parseFromString(response);
            let nodes = xpath.select('//tag/name/text()', doc);
            let promises = nodes.map((element) => {
                return fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=${element}&api_key=2c08f218f45c6f367a0f4d2b350bbffc`);
            });
            Promise.all(promises)
                .then((response) => {
                    let promises = response.map((element) => {
                        return element.text()
                            .then((response) => {
                                doc = new xmldom().parseFromString(response);
                                let genre_name = xpath.select('//tag/name/text()', doc)[0];
                                let description = xpath.select('//tag/wiki/summary/text()', doc)[0];
                                // console.log(`${genre_name} : ${description}\n\n`);
                                return {'id': genre_name.textContent, 'name': genre_name.textContent, 'description': description.textContent};
                            });
                    });
                    Promise.all(promises)
                        .then((response) => {
                            // console.log(JSON.stringify(response, null, 4));
                            res.json(response);
                        });
                });
        });


    console.log('[200] Api access to genres');
});