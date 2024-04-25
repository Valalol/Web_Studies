'use strict';

// import du module Express
let express = require('express');
let app = express();

// export de notre application vers le serveur principal
module.exports = app;

const db = require('./data/db.json');

app.get('/genres/', function (req, res) {
    // res.set({
    //     'Content-Type': 'application/json; charset=utf-8',
    // });
    // res.send(JSON.stringify(db.genres));
    res.json(db.genres);
    console.log('[200] Api access to genres');
});

app.get('/genres/:genre_id/artists/', function (req, res) {
    const genre = decodeURIComponent(req.params.genre_id);
    const artists = db.artists.filter(x => x.genreId === genre);
    if (artists.length) {
        res.json(artists);
        console.log(`[200] Api access to artists "${genre}"`);
    }
    else {
        res.status(404).send('Genre non trouvé. :(');
        console.log(`[404] Api access to artists "${genre}"`);
    }
});

