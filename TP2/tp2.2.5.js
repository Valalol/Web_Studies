'use strict';

const albums_json = require('./albums.json');

function Album(album) {
    this.title = album.title;
    this.artist = album.artist;
    this.year = album.year;
}

Album.prototype.getTitle = function () {
    return this.title;
};

Album.prototype.getArtist = function () {
    return this.artist;
};

Album.prototype.getYear = function () {
    return this.year;
};

let albums_stored = Object.entries(albums_json)
    .map(([key, value]) => [key, new Album(value)])
    .map(([, value]) => ({[value.title]: value}));

albums_stored = Object.assign({}, ...albums_stored);
console.log(albums_stored);
