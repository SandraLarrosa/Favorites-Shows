'use strict';

//Constantes
const inputSearch = document.querySelector('.js-input'); //Input
const iconSearch = document.querySelector('.js-search'); //Icon de búsqueda
const title = document.querySelector('.js-title'); //Titulo Página que lleva al inicio
const header = document.querySelector('.js-header');
const asideFavorite = document.querySelector('.js-asideFavorite'); //Aside de los favoritos
const mainCards = document.querySelector('.js-content'); //Main donde se pintan las tarjetas
const imgPlaceHolder =
  'https://via.placeholder.com/260x310/ffffff/666666/?text=TVShows';

let shows = []; //Array que guarda la búsqueda de las series
let favoritesShows = []; //Array que guarda los favoritos

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

//LLamada a la Api
const searchShow = () => {
  const valueInput = inputSearch.value;
  if (!valueInput) {
    mainCards.innerHTML =
      '<div class="contain__error"><h2 class="error">¡No has introducido ninguna serie!</h2><p class="text__error">No enfades al gatete y busca una serie para hacerle feliz</p><img class="gif__cat" src="https://media.giphy.com/media/c8NspwwVxwAiA/giphy.gif" alt="gif gatete"/></div>';
  } else {
    conectApi();
  }
};

//Función que llama a la Api
const conectApi = () => {
  const valueInput = inputSearch.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${valueInput}`)
    .then((response) => response.json())
    .then((data) => {
      shows = data.map((show) => {
        //Guardamos con Map el campo Show que nos trae la Api
        return show.show;
      });
      printShows(shows);
    });
};

//Función que Pinta los datos en el main
const printShows = (shows) => {
  mainCards.innerHTML = '';
  for (const show of shows) {
    const showElement = favoritesShows.find(
      (favShow) => favShow.id === show.id
    ); //Devuelve undefined si no está en el Array de Favoritos
    const favColor = showElement === undefined ? '' : 'card__favoriteAdd'; //Ternario para comprobar si la card a pintar está en favoritos
    if (show.image !== null) {
      mainCards.innerHTML += `<article id="${show.id}"class="card__show js-cards ${favColor}"><img class="card__show--img" src="${show.image.medium}" alt="${show.name}"/><div class="content__boxTitle"><h3 class="card__show--title">${show.name}</h3></div> </article>`;
    } else {
      mainCards.innerHTML += `<article id="${show.id}"class="card__show js-cards"><img class="card__show--img" src=${imgPlaceHolder} alt="${show.name}"/><div class="content__boxTitle"><h3 class="card__show--title">${show.name}</h3></div> </article>`;
    }
  }
  listenerCards();
};

//Función que pinta los favoritos en el aside
const printFavorites = () => {
  const listFavorite = document.querySelector('.js-listFavorite');
  listFavorite.innerHTML = '';
  for (const favorite of favoritesShows) {
    if (favorite.image !== null) {
      listFavorite.innerHTML += `<li id="${favorite.id}"class="favorite__list--card"><img class="favorite__card__img" src="${favorite.image.medium}" alt="${favorite.name}"/><h4 class="favorite__title__list">${favorite.name}</h4><i class="far fa-times-circle js-buttonRemove"></i>`;
    } else {
      listFavorite.innerHTML += `<li id="${favorite.id}"class="favorite__list--card"><img class="favorite__card__img" src="${imgPlaceHolder}" alt="${favorite.name}"/><h4 class="favorite__title__list">${favorite.name}</h4><i class="far fa-times-circle js-buttonRemove"></i>`;
    }
  }
  listenersButtonFavorites();
  /* printShows(shows); */
};

//LISTENERS CARDS SHOWS

const listenerCards = () => {
  const cards = document.querySelectorAll('.js-cards');
  for (const card of cards) {
    card.addEventListener('click', handleFavorites);
  }
};

//FUNCION LISTENER DEL BUSCADOR
const handleFavorites = (ev) => {
  addFavorite(ev);
  changeColorCard(ev);
  printFavorites();
  listenersButtonFavorites();
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
      }
    }
  } else {
    favoritesShows.splice(showElementId, 1);
  }
  saveLocalStorage();
};

//Función que pinta las cards si están en favoritos. Cambiando estilos a la card y al main
const changeColorCard = (ev) => {
  const show = ev.currentTarget;
  const showId = parseInt(show.id);
  const showElement = favoritesShows.find((show) => show.id === showId);

  if (showElement === undefined) {
    show.classList.remove('card__favoriteAdd');
  } else {
    show.classList.add('card__favoriteAdd');
    asideFavorite.classList.remove('hidden');
    mainCards.classList.remove('content_cards');
    mainCards.classList.add('content__cardsFavorite');
  }
  printFavoritesLS();
};

//Función que pinta los favoritos al principio
const printFavoritesLS = () => {
  if (favoritesShows.length > 0) {
    asideFavorite.classList.remove('hidden');
    mainCards.classList.remove('content_cards');
    mainCards.classList.add('content__cardsFavorite');
  } else {
    asideFavorite.classList.add('hidden');
    mainCards.classList.add('content_cards');
    mainCards.classList.remove('content__cardsFavorite');
  }
  printFavorites();
};

//FUNCION PARA ELIMINAR TODOS LOS FAVORITOS A LA VEZ
const buttonRemoveAll = document.querySelector('.js-buttonRemoveAll');

const removeAllFavorites = () => {
  localStorage.removeItem('favorite');
  asideFavorite.classList.add('hidden', 'menu');
  mainCards.classList.add('content_cards');
  mainCards.classList.remove('content__cardsFavorite');

  favoritesShows = [];
};

buttonRemoveAll.addEventListener('click', removeAllFavorites);

//FUNCION PARA ELIMINAR INDIVIDUALMENTE LOS ELEMENTOS DE LA LISTA DE FAVORITOS
const removeFavorite = (ev) => {
  const buttonClick = ev.currentTarget;
  const buttonParentId = parseInt(buttonClick.parentElement.id);
  const favElementId = favoritesShows.findIndex(
    (fav) => fav.id === buttonParentId
  );
  favoritesShows.splice(favElementId, 1);
  printFavorites();
  saveLocalStorage();
  printFavoritesLS();
};

const listenersButtonFavorites = () => {
  const buttonsRemove = document.querySelectorAll('.js-buttonRemove');
  for (const button of buttonsRemove) {
    button.addEventListener('click', removeFavorite);
  }
};

/* LOCALSTORAGE */
//Guarda datos de favoritos en LS
const saveLocalStorage = () => {
  localStorage.setItem('favorite', JSON.stringify(favoritesShows));
};

//Función que lee el localStorage y Pinta Los favoritos en Pantalla
const getFromLocalStorage = () => {
  favoritesShows = JSON.parse(localStorage.getItem('favorite'));
  if (favoritesShows === null) {
    favoritesShows = [];
  }
  printFavoritesLS();
};

//Tecla Intro del teclado para buscar

const inputKey = (ev) => {
  if (event.keyCode == 13) {
    listener(ev);
  }
};

inputSearch.addEventListener('keyup', inputKey);

//Funciones al inicio
getFromLocalStorage(); //Trae los datos del LocalStorage al cargar la página
listenersButtonFavorites();

//Eventos escuchadores
iconSearch.addEventListener('click', listener);
title.addEventListener('click', changeHeader);
