'use strict';

//Constantes
const inputSearch = document.querySelector('.js-input'); //Input
const iconSearch = document.querySelector('.js-search'); //Icon de búsqueda
const title = document.querySelector('.js-title'); //Titulo Página que lleva al inicio
const contentSearch = document.querySelector('js-contentSearch');
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
  changeHeaderMenuFavorites();
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

//Función que comprueba si el input está vacio o tiene texto y llama a la API
const searchShow = () => {
  const valueInput = inputSearch.value;
  if (!valueInput) {
    mainCards.innerHTML =
      '<div class="contain__error"><h2 class="error">¡No has introducido ninguna serie!</h2><p class="text__error">No enfades al gatete y busca una serie para hacerle feliz</p><img class="gif__cat" src="../images/cat-computer.gif" alt="gif gatete"/></div>';
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
    })
    .catch((error) => {
      mainCards.innerHTML =
        '<div class="contain__error"><h2 class="error">Algo acaba de fallar...</h2><p class="text__error">Comprueba tu conexión a internet</p><img class="gif__cat" src="../images/cat-error.gif" alt="gif gatete"/></div>';
    });
};

//Función que Pinta los datos en el main
const printShows = (shows) => {
  mainCards.innerHTML = '';
  for (const show of shows) {
    const showElement = favoritesShows.find(
      (favShow) => favShow.id === show.id
    ); //Devuelve undefined si no está en el Array de Favoritos
    //Ternarios para comprobar si la card a pintar está en favoritos
    const favColor = showElement === undefined ? '' : 'card__favoriteAdd';
    const favColorTitle = showElement === undefined ? '' : 'colorTitle';
    if (show.image !== null) {
      mainCards.innerHTML += `<article id="${show.id}"class="card__show js-cards ${favColor}"><img class="card__show--img" title="${show.name}" src="${show.image.medium}" alt="${show.name}"/><div class="content__boxTitle"><h3 class="card__show--title ${favColorTitle}">${show.name}</h3></div> </article>`;
    } else {
      mainCards.innerHTML += `<article id="${show.id}"class="card__show js-cards"><img class="card__show--img" title="${show.name}" src=${imgPlaceHolder} alt="${show.name}"/><div class="content__boxTitle"><h3 class="card__show--title ${favColorTitle}">${show.name}</h3></div> </article>`;
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
      listFavorite.innerHTML += `<li id="${favorite.id}"class="favorite__list--card"><img class="favorite__card__img" title="${favorite.name}" src="${favorite.image.medium}" alt="${favorite.name}"/><h4 class="favorite__title__list">${favorite.name}</h4><i class="far fa-times-circle js-buttonRemove" title="Eliminar serie de favoritos"></i>`;
    } else {
      listFavorite.innerHTML += `<li id="${favorite.id}"class="favorite__list--card"><img class="favorite__card__img" title="${favorite.name}" src="${imgPlaceHolder}" alt="${favorite.name}"/><h4 class="favorite__title__list">${favorite.name}</h4><i class="far fa-times-circle js-buttonRemove" title="Eliminar serie de favoritos"></i>`;
    }
  }
  listenersButtonFavorites();
  printShows(shows);
};

//LISTENERS CARDS SHOWS

const listenerCards = () => {
  const cards = document.querySelectorAll('.js-cards');
  for (const card of cards) {
    card.addEventListener('click', handleFavorites);
  }
};

//FUNCION LISTENER DE LAS CARDS QUE MUESTRAN LAS SERIES
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
    show.lastElementChild.firstChild.classList.remove('colorTitle');
  } else {
    show.classList.add('card__favoriteAdd');
    show.lastElementChild.firstChild.classList.add('colorTitle');
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
  printFavoritesLS();
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

const changeHeaderMenuFavorites = () => {
  if (asideFavorite.classList.contains('menuInitial')) {
    title.classList.remove('content__title');
    title.classList.add('title__MenuFavorites');
    contentSearch.classList.remove('content_search');
    contentSearch.classList.add('search__menuFavorites');
  }
};


//Eventos escuchadores
iconSearch.addEventListener('click', listener);
title.addEventListener('click', changeHeader);

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
