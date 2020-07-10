'use strict';

//Constantes
const inputSearch = document.querySelector('.js-input'); //Input
const iconSearch = document.querySelector('.js-search'); //Icon de búsqueda
const title = document.querySelector('.js-title'); //Titulo Página que lleva al inicio
const header = document.querySelector('.js-header');
const mainCards = document.querySelector('.js-content'); //Main donde se pintan las tarjetas

//Función escuchadora del icono search
const listener = (ev) => {
  searchShow();
  changeClassInitial();
};

//Función que cambiar la clase del header
const changeClassInitial = () => {
  header.classList.remove('headerInitial');
  header.classList.add('header');
};

//Función que cambia la clase del header al inicio
const changeHeader = (ev) => {
  inputSearch.value = '';
  mainCards.innerHTML = '';
  header.classList.remove('header');
  header.classList.add('headerInitial');
};

//Array que guarda la búsqueda de las series
let shows = [];

//LLamada a la Api
function searchShow() {
  const valueInput = inputSearch.value;
  if (!valueInput) {
    mainCards.innerHTML =
      '<h2 class="error">No has introducido ninguna serie :-(</h2>';
  } else {
    fetch(`http://api.tvmaze.com/search/shows?q=${valueInput}`)
      .then((response) => response.json())
      .then((data) => {
        shows = data.map((show) => {
          //Guardamos con Map el campo Show que nos trae la Api
          return show.show;
        });
        printShows(shows);
      });
  }
}

//Pinta los datos en el main
const printShows = (shows) => {
  mainCards.innerHTML = '';
  for (const show of shows) {
    if (show.image !== null) {
      mainCards.innerHTML += `<article id="${show.id}"class="card__show js-cards"><img class="card__show--img" src="${show.image.medium}" alt="${show.name}"/><div class="content__boxTitle"><h3 class="card__show--title">${show.name}</h3></div> </article>`;
    } else {
      mainCards.innerHTML += `<article class="card__show js-cards"><img class="card__show--img" src="https://via.placeholder.com/260x310/ffffff/666666/?text=TVShows" alt="${show.name}"/><div class="content__boxTitle"><h3 class="card__show--title">${show.name}</h3></div> </article>`;
    }
  }
  listenerCards();
};

//Añadir a Favoritos
const listenerCards = () => {
  const cards = document.querySelectorAll('.js-cards');
  for (const card of cards) {
    card.addEventListener('click', addFavorite);
  }
};

//Array que guarda los favoritos
let favoritesShows = [];

const asideFavorite = document.querySelector('.js-asideFavorite');
const listFavorite = document.querySelector('.js-listFavorite');
//Función que añade a favoritos y cambia el color cuando lo añadimos o lo quita de favoritos cuando lo volvemos a pulsar
const addFavorite = (ev) => {
  const cardShow = ev.currentTarget;
  const cardShowId = parseInt(cardShow.id);
  const showElement = favoritesShows.find((show) => show.id === cardShowId);
  const showElementId = favoritesShows.findIndex(
    (show) => show.id === cardShowId
  );
  if (showElement === undefined) {
    cardShow.classList.add('card__favoriteAdd');
    for (const show of shows) {
      if (cardShowId === show.id) {
        favoritesShows.push(show);
        listFavorite.innerHTML += `<li class="favorite__list--card"><img class="favorite__card__img" src="${show.image.medium}" alt="${show.name}"/><h4 class="favorite__title__list">${show.name}</h4><i class="far fa-times-circle"></i>`;
        if (asideFavorite.classList.contains('hidden')) {
          asideFavorite.classList.remove('hidden', 'menuInitial');
          asideFavorite.classList.add('menu');
          mainCards.classList.remove('content_cards');
          mainCards.classList.add('content__cardsFavorite');
        }
        console.log('Me han añadadido en favoritos');
      }
    }
  } else {
    console.log('Me han quitado de favoritos');
    favoritesShows.splice(showElementId, 1);
    cardShow.classList.remove('card__favoriteAdd');
    listFavorite.innerHTML += '';
  }

  console.log(favoritesShows);
  saveLocalStorage();
  /*  printFavorite(ev); */
};

//LocalStorage

const saveLocalStorage = () => {
  localStorage.setItem('favorite', JSON.stringify(favoritesShows));
};


//Eventos escuchadores
iconSearch.addEventListener('click', listener);
title.addEventListener('click', changeHeader); //Evento que cambia el header al Initial

//Función que lee el localStorage y pinta los favoritos
const getFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('favorite'));
  console.log(data);
  if (data !== favoritesShows) {
    asideFavorite.classList.remove('hidden', 'menu');
    asideFavorite.classList.add('menuInitial');
    for (const favorite of data) {
      listFavorite.innerHTML += `<li class="favorite__list--card"><img class="favorite__card__img" src="${favorite.image.medium}" alt="${favorite.name}"/><h4 class="favorite__title__list">${favorite.name}</h4><i class="far fa-times-circle"></i>`;
    }
  }
};

getFromLocalStorage();
