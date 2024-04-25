'use strict';

const albums = require('./albums.json');

function albumTitle(album) {
    return album['title'];
}

function albumArtist(album) {
    return album['artist'];
}

function albumYear(album) {
    return album['year'];
}

console.log(albumYear(albums['Ummagumma']));