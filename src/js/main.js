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

//Función que Pinta los datos en el main
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

//Función que pinta los favoritos en el aside
const printFavorites = () => {
  const listFavorite = document.querySelector('.js-listFavorite');
  listFavorite.innerHTML = '';
  for (const favorite of favoritesShows) {
    listFavorite.innerHTML += `<li class="favorite__list--card"><img class="favorite__card__img" src="${favorite.image.medium}" alt="${favorite.name}"/><h4 class="favorite__title__list">${favorite.name}</h4><i class="far fa-times-circle"></i>`;
  }
};

//LISTENERS CARDS SHOWS
const listenerCards = () => {
  const cards = document.querySelectorAll('.js-cards');
  for (const card of cards) {
    card.addEventListener('click', handleFavorites);
  }
};

/* FAVORITOS */
//Array que guarda los favoritos
let favoritesShows = [];

const asideFavorite = document.querySelector('.js-asideFavorite');

//FUNCION LISTENER
const handleFavorites = (ev) => {
  addFavorite(ev);
  changeColorCard(ev);
  printFavorites();
};

//Función que añade a favoritos el elemento seleccionado y lo quita
const addFavorite = (ev) => {
  const show = ev.currentTarget;
  const showId = parseInt(show.id);
  const showElement = favoritesShows.find((show) => show.id === showId);
  const showElementId = favoritesShows.findIndex((show) => show.id === showId);

  if (showElement === undefined) {
    for (const show of shows) {
      if (showId === show.id) {
        favoritesShows.push(show);
        console.log(`Me han añadadido ${show.name}`);
      }
    }
  } else {
    favoritesShows.splice(showElementId, 1);
    console.log(`Me han eliminado ${show.name}`);
  }
  console.log(favoritesShows);
  saveLocalStorage();
};

//Función que cambiar el color de la card Show
const changeColorCard = (ev) => {
  if (favorite.classList.contains('card__favoriteAdd')) {
    show.classList.remove('card__favoriteAdd');
  } else {
    show.classList.add('card__favoriteAdd');
    asideFavorite.classList.remove('hidden', 'menu');
    mainCards.classList.remove('content_cards');
    mainCards.classList.add('content__cardsFavorite');
  }
};

const printFavoritesLS = () => {
  if (favoritesShows.length > 0) {
    asideFavorite.classList.remove('hidden', 'menu');
    mainCards.classList.remove('content_cards');
    mainCards.classList.add('content__cardsFavorite');
    printFavorites();
  }
};

//LocalStorage
const saveLocalStorage = () => {
  localStorage.setItem('favorite', JSON.stringify(favoritesShows));
};

//Función que lee el localStorage
const getFromLocalStorage = () => {
  favoritesShows = JSON.parse(localStorage.getItem('favorite'));
  if (favoritesShows === null) {
    favoritesShows = [];
  }
  printFavoritesLS();
};

//Funciones al inicio
getFromLocalStorage();

//Eventos escuchadores
iconSearch.addEventListener('click', listener);
title.addEventListener('click', changeHeader);
