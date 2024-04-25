'use strict';

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

const album = new Album({
    title: 'Fresh Cream',
    artist: 'Cream',
    year: 1966,
});

console.log(album.getTitle());