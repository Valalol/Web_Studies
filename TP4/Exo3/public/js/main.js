'use strict';
/* eslint-env browser, es6 */

// Pas besoin d'évenement window.onload puisqu'on utilise l'attribut defer
// lorsque l'on charge notre script

function loadGenres() {
    fetch('api/genres')
        .catch(error => console.log(error))
        .then((response) => {
            if (!response.ok) console.error(response);
            else return response.json();
        })
        .then((data) => {
            const select = document.querySelector('select');
            select.addEventListener('change', async function () {
                // console.log(this.value);
                await loadArtists(data.find((genre) => genre.id === this.value));
            });
            let option;
            data.forEach((genre) => {
                option = document.createElement('option');
                option.text = genre.name;
                option.value = genre.id;
                select.add(option);
            });

            loadArtists(data.find((genre) => genre.id === select.value));
        });
}

async function loadArtists(genre) {
    // console.log(genre);
    document.querySelector('#main h2').textContent = 'Top ' + genre.id + ' artist';
    document.querySelector('#main > p').innerHTML = genre.description;

    const response = await fetch('api/genres/' + genre.id + '/artists');
    const artists = await response.json();
    let h3;
    let a;
    let img;
    let li;
    const ul = document.querySelector('#main ul');
    ul.innerHTML = '';

    artists.forEach((artist) => {
        // console.log(artist);
        li = document.createElement('li');

        a = document.createElement('a');
        h3 = document.createElement('h3');
        h3.textContent = artist.name;
        a.addEventListener('click', function (event) {
            artistSelected(event);
        });

        a.href = '#';
        a.id = artist.id;
        a.appendChild(h3);
        li.appendChild(a);

        img = document.createElement('img');
        img.src = artist.photo;
        li.appendChild(img);

        ul.appendChild(li);
    });
}


async function artistSelected(event) {
    const response = await fetch('api/artists/' + event.target.parentElement.id + '/albums');
    const albums = await response.json();
    console.log(albums);

    const body = document.querySelector('body');
    const aside = document.querySelector('#albums');

    document.querySelector('#albums button').addEventListener('click', function () {
        closeAside();
    });

    const table_body = document.querySelector('#albums table tbody');
    table_body.innerHTML = '';

    let tr;
    let img_td;
    let img;
    let title_td;
    let playcount_td;

    albums.forEach((album) => {
        tr = document.createElement('tr');

        img_td = document.createElement('td');
        img = document.createElement('img');
        img.src = album.cover;
        img_td.appendChild(img);
        tr.appendChild(img_td);

        title_td = document.createElement('td');
        title_td.textContent = album.title;
        tr.appendChild(title_td);

        playcount_td = document.createElement('td');
        playcount_td.textContent = album.playcount;
        tr.appendChild(playcount_td);

        table_body.appendChild(tr);
    });

    aside.style.visibility = 'visible';
    aside.style.opacity = 1;
    aside.style.transition = 'visibility 0s, opacity 0.5s';
    aside.style.top = self.innerHeight / 2 - aside.clientHeight / 2 + 'px';
    aside.style.left = body.clientWidth / 2 - aside.clientWidth / 2 + 'px';
}

function closeAside() {
    const aside = document.querySelector('#albums');
    aside.style.visibility = 'hidden';
    aside.style.opacity = 0;
    aside.style.transition = 'visibility 0.5s, opacity 0.5s';
}

loadGenres();