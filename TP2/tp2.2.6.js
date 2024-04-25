'use strict';

function Album(album) {
    this.title = album.title;
    this.artist = Artist.prototype.addAlbum(album.artist, this);
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


function Artist(artistName) {
    this.name = artistName;
    this.albums = [];
}

Artist.prototype.list = [];
Artist.prototype.withName = function (name) {
    const artist = Artist.prototype.list.find(x => x.name === name);
    return artist;
};

Artist.prototype.addAlbum = function (artistName, album) {
    let artist = Artist.prototype.withName(artistName);

    if (!artist) {
        artist = new Artist(artistName);
        Artist.prototype.list.push(artist);
    }
    artist.albums.push(album);
    return artist;
};

const albums_json = require('./albums.json');

let albums_stored = Object.entries(albums_json)
    .map(([key, value]) => [key, new Album(value)])
    .map(([, value]) => ({[value.title]: value}));

albums_stored = Object.assign({}, ...albums_stored);
console.log(albums_stored);
