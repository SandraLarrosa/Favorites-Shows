'use strict';

//Constantes
const inputSearch = document.querySelector('.js-input'); //Input
const iconSearch = document.querySelector('.js-search'); //Icon de búsqueda
const title = document.querySelector('.js-title'); //Titulo Página que lleva al inicio
const header = document.querySelector('.js-header');
const asideFavorite = document.querySelector('.js-asideFavorite'); //Aside de los favoritos
const mainCards = document.querySelector('.js-content'); //Main donde se pintan las tarjetas
const emptyImageURL = 'https://via.placeholder.com/260x310/ffffff/666666/?text=TVShows';
const emptySearchCatImg = 'https://media.giphy.com/media/c8NspwwVxwAiA/giphy.gif';
const errorSearchCatImg = 'https://media.giphy.com/media/xT9IgIc0lryrxvqVGM/giphy.gif';

let showsList = []; //Array que guarda la búsqueda de las series
let favoritesShowsList = []; //Array que guarda los favoritos

//Función escuchadora del icono search
const initiateSearch = () => {
  changeHeaderStyle();
  searchShow();
};

//Función que cambiar la clase del header
const changeHeaderStyle = () => {
  header.classList.remove('headerInitial');
  header.classList.add('header');
};

//Función que comprueba si el input está vacio o tiene texto y llama a la API
const searchShow = () => {
  const valueSearchInput = inputSearch.value;
  if (!valueSearchInput) {
    mainCards.innerHTML =
      `<div class="contain__error"><h2 class="error">¡No has introducido ninguna serie!</h2><p class="text__error">No enfades al gatete y busca una serie para hacerle feliz</p><img class="gif__cat" src="${emptySearchCatImg}" alt="gif gatete"/></div>`;
  } else {
    searchOnApi(valueSearchInput);
  }
};

//Función que llama a la Api
const searchOnApi = (searchValue) => {
  fetch(`http://api.tvmaze.com/search/shows?q=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      showsList = data.map((showData) => showData.show); //Guardamos con Map el campo Show que nos trae la Api
      printShows(showsList);
    })
    .catch((error) => {
      mainCards.innerHTML =
      `<div class="contain__error"><h2 class="error">Algo acaba de fallar...</h2><p class="text__error">Estamos trabajando en ello, no desesperes</p><img class="gif__cat" src="${errorSearchCatImg}" alt="gif gatete"/></div>`;
    });
};

//Función que Pinta los datos en el main
const printShows = (showsList) => {
  mainCards.innerHTML = '';
  for (const show of showsList) {
    const showElement = favoritesShowsList.find(
      (favShow) => favShow.id === show.id
    );

    //Devuelve undefined si no está en el Array de Favoritos
    //Ternarios para comprobar si la card a pintar está en favoritos
    const favColor = showElement === undefined ? '' : 'card__favoriteAdd';
    const favColorTitle = showElement === undefined ? '' : 'colorTitle';
    if (show.image !== null) {
      mainCards.innerHTML += `<article id="${show.id}"class="card__show js-cards ${favColor}"><img class="card__show--img" title="${show.name}" src="${show.image.medium}" alt="${show.name}"/><div class="content__boxTitle"><h3 class="card__show--title ${favColorTitle}">${show.name}</h3></div> </article>`;
    } else {
      mainCards.innerHTML += `<article id="${show.id}"class="card__show js-cards ${favColor}"><img class="card__show--img" title="${show.name}" src=${emptyImageURL} alt="${show.name}"/><div class="content__boxTitle"><h3 class="card__show--title ${favColorTitle}">${show.name}</h3></div> </article>`;
    }
  }
  addCardsEventListeners();
};

//LISTENERS CARDS SHOWS
const addCardsEventListeners = () => {
  const cardList = document.querySelectorAll('.js-cards');
  for (const card of cardList) {
    card.addEventListener('click', handleFavorites);
  }
};

//FUNCION LISTENER DE LAS CARDS QUE MUESTRAN LAS SERIES
const handleFavorites = (ev) => {
  addOrRemoveFavoriteList(ev);
  changeColorCard(ev);
  printFavoritesAsideMenu();
};

//Función que añade a favoritos el elemento seleccionado y lo quita
const addOrRemoveFavoriteList = (ev) => {
  const showCard = ev.currentTarget;
  const showCardId = parseInt(showCard.id);
  const favoriteShowElement = favoritesShowsList.find((favShow) => favShow.id === showCardId);

  if (favoriteShowElement === undefined) {
    const showToFavorite = showsList.find((show) => show.id === showCardId);
    favoritesShowsList.push(showToFavorite);
  } else {
    const favoriteShowIndex = favoritesShowsList.findIndex((favShow) => favShow.id === showCardId);
    favoritesShowsList.splice(favoriteShowIndex, 1);
  }

  saveFavoritesOnLocalStorage();
};

//Función que pinta los favoritos en el aside
const printFavoritesCards = () => {
  const listFavorite = document.querySelector('.js-listFavorite');
  listFavorite.innerHTML = '';
  for (const favorite of favoritesShowsList) {
    if (favorite.image !== null) {
      listFavorite.innerHTML += `<li id="${favorite.id}"class="favorite__list--card"><img class="favorite__card__img" title="${favorite.name}" src="${favorite.image.medium}" alt="${favorite.name}"/><h4 class="favorite__title__list">${favorite.name}</h4><i class="far fa-times-circle js-buttonRemove" title="Eliminar serie de favoritos"></i>`;
    } else {
      listFavorite.innerHTML += `<li id="${favorite.id}"class="favorite__list--card"><img class="favorite__card__img" title="${favorite.name}" src="${emptyImageURL}" alt="${favorite.name}"/><h4 class="favorite__title__list">${favorite.name}</h4><i class="far fa-times-circle js-buttonRemove" title="Eliminar serie de favoritos"></i>`;
    }
  }
  addListenersToDeleteButtons();
  printShows(showsList);
};

//Función que pinta las cards si están en favoritos. Cambiando estilos a la card y al main
const changeColorCard = (ev) => {
  const showCard = ev.currentTarget;
  const showCardId = parseInt(showCard.id);
  const showFavoriteElement = favoritesShowsList.find((favShow) => favShow.id === showCardId);
  if (showFavoriteElement === undefined) {
    showCard.classList.remove('card__favoriteAdd');
    showCard.lastElementChild.firstChild.classList.remove('colorTitle');
  } else {
    showCard.classList.add('card__favoriteAdd');
    showCard.lastElementChild.firstChild.classList.add('colorTitle');
    asideFavorite.classList.remove('hidden');
    mainCards.classList.remove('content_cards');
    mainCards.classList.add('content__cardsFavorite');
  }
};

//Función que pinta los favoritos al principio
const printFavoritesAsideMenu = () => {
  if (favoritesShowsList.length > 0) {
    asideFavorite.classList.remove('hidden');
    mainCards.classList.remove('content_cards');
    mainCards.classList.add('content__cardsFavorite');
  } else {
    asideFavorite.classList.add('hidden');
    mainCards.classList.add('content_cards');
    mainCards.classList.remove('content__cardsFavorite');
  }

  printFavoritesCards();
};

//FUNCION PARA ELIMINAR TODOS LOS FAVORITOS A LA VEZ
const buttonRemoveAll = document.querySelector('.js-buttonRemoveAll');

const removeAllFavorites = () => {
  localStorage.removeItem('favorite');
  asideFavorite.classList.add('hidden', 'menu');
  mainCards.classList.add('content_cards');
  mainCards.classList.remove('content__cardsFavorite');

  favoritesShowsList = [];
  printFavoritesAsideMenu();
};

buttonRemoveAll.addEventListener('click', removeAllFavorites);

//FUNCION PARA ELIMINAR INDIVIDUALMENTE LOS ELEMENTOS DE LA LISTA DE FAVORITOS
const removeFavorite = (ev) => {
  const clickedButton = ev.currentTarget;
  const clickedButtonParentId = parseInt(clickedButton.parentElement.id);
  const favElementId = favoritesShowsList.findIndex(
    (fav) => fav.id === clickedButtonParentId
  );
  favoritesShowsList.splice(favElementId, 1);
  saveFavoritesOnLocalStorage();
  printFavoritesAsideMenu();
};

const addListenersToDeleteButtons = () => {
  const buttonsRemove = document.querySelectorAll('.js-buttonRemove');
  for (const button of buttonsRemove) {
    button.addEventListener('click', removeFavorite);
  }
};

/* LOCALSTORAGE */
//Guarda datos de favoritos en LS
const saveFavoritesOnLocalStorage = () => {
  localStorage.setItem('favorite', JSON.stringify(favoritesShowsList));
};

//Función que lee el localStorage y Pinta Los favoritos en Pantalla
const loadFromLocalStorage = () => {
  favoritesShowsList = JSON.parse(localStorage.getItem('favorite'));
  if (favoritesShowsList === null) {
    favoritesShowsList = [];
  }
  printFavoritesAsideMenu();
};

//Tecla Intro del teclado para buscar
const searchWithEnter = (ev) => {
  if (event.keyCode === 13) {
    initiateSearch(ev);
  }
};

//Función que cambia la clase del header al inicio
const goHomePage = () => {
  inputSearch.value = '';
  mainCards.innerHTML = '';
  header.classList.remove('header');
  header.classList.add('headerInitial');
};

//Escuchadores de eventos
iconSearch.addEventListener('click', initiateSearch);
title.addEventListener('click', goHomePage);
inputSearch.addEventListener('keyup', searchWithEnter);

//Funciones al inicio
loadFromLocalStorage();
addListenersToDeleteButtons();
