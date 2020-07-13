"use strict";const inputSearch=document.querySelector(".js-input"),iconSearch=document.querySelector(".js-search"),title=document.querySelector(".js-title"),header=document.querySelector(".js-header"),asideFavorite=document.querySelector(".js-asideFavorite"),mainCards=document.querySelector(".js-content"),emptyImageURL="../assets/images/tv-no-signal.jpg",emptySearchCatImg="../assets/images/cat-computer.gif",errorSearchCatImg="../assets/images/cat-error.gif",noFindSearchCatImg="../assets/images/cats-search.gif";let showsList=[],favoritesShowsList=[];const initiateSearch=()=>{changeHeaderStyle(),searchShow()},changeHeaderStyle=()=>{header.classList.remove("headerInitial"),header.classList.add("header")},searchShow=()=>{const e=inputSearch.value;e?searchOnApi(e):(mainCards.innerHTML=`<div class="contain__error"><h2 class="error">¡No has introducido ninguna serie!</h2><p class="text__error">No enfades al gatete y busca una serie para hacerle feliz</p><img class="gif__cat" src="${emptySearchCatImg}" alt="gif gatete"/></div>`,showsList=[])},searchOnApi=e=>{fetch("http://api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{e.length<1?mainCards.innerHTML=`<div class="contain__error"><h2 class="error">No encuentro esa serie, creo que no existe</h2><p class="text__error">Prueba otra vez</p><img class="gif__cat" src="${noFindSearchCatImg}" alt="gif gatete"/></div>`:(showsList=e.map(e=>e.show),printShows(showsList))}).catch(e=>{mainCards.innerHTML=`<div class="contain__error"><h2 class="error">Algo acaba de fallar...</h2><p class="text__error">Estamos trabajando en ello, no desesperes</p><img class="gif__cat" src="${errorSearchCatImg}" alt="gif gatete"/></div>`,showsList=[]})},printShows=e=>{mainCards.innerHTML="";for(const s of e){const e=favoritesShowsList.find(e=>e.id===s.id),t=void 0===e?"":"card__favoriteAdd",a=void 0===e?"":"colorTitle";null!==s.image?mainCards.innerHTML+=`<article id="${s.id}"class="card__show js-cards ${t}"><img class="card__show--img" title="${s.name}" src="${s.image.medium}" alt="${s.name}"/><div class="content__boxTitle"><h3 class="card__show--title ${a}">${s.name}</h3></div> </article>`:mainCards.innerHTML+=`<article id="${s.id}"class="card__show js-cards ${t}"><img class="card__show--img" title="${s.name}" src=${emptyImageURL} alt="${s.name}"/><div class="content__boxTitle"><h3 class="card__show--title ${a}">${s.name}</h3></div> </article>`}addCardsEventListeners()},addCardsEventListeners=()=>{const e=document.querySelectorAll(".js-cards");for(const s of e)s.addEventListener("click",handleFavorites)},handleFavorites=e=>{addOrRemoveFavoriteList(e),changeColorCard(e),printFavoritesAsideMenu()},addOrRemoveFavoriteList=e=>{const s=e.currentTarget,t=parseInt(s.id);if(void 0===favoritesShowsList.find(e=>e.id===t)){const e=showsList.find(e=>e.id===t);favoritesShowsList.push(e)}else{const e=favoritesShowsList.findIndex(e=>e.id===t);favoritesShowsList.splice(e,1)}saveFavoritesOnLocalStorage()},printFavoritesCards=()=>{const e=document.querySelector(".js-listFavorite");e.innerHTML="";for(const s of favoritesShowsList)null!==s.image?e.innerHTML+=`<li id="${s.id}"class="favorite__list--card"><img class="favorite__card__img" title="${s.name}" src="${s.image.medium}" alt="${s.name}"/><h4 class="favorite__title__list">${s.name}</h4><i class="far fa-times-circle js-buttonRemove" title="Eliminar serie de favoritos"></i>`:e.innerHTML+=`<li id="${s.id}"class="favorite__list--card"><img class="favorite__card__img" title="${s.name}" src="${emptyImageURL}" alt="${s.name}"/><h4 class="favorite__title__list">${s.name}</h4><i class="far fa-times-circle js-buttonRemove" title="Eliminar serie de favoritos"></i>`;addListenersToDeleteButtons(),printShows(showsList)},changeColorCard=e=>{const s=e.currentTarget,t=parseInt(s.id);void 0===favoritesShowsList.find(e=>e.id===t)?(s.classList.remove("card__favoriteAdd"),s.lastElementChild.firstChild.classList.remove("colorTitle")):(s.classList.add("card__favoriteAdd"),s.lastElementChild.firstChild.classList.add("colorTitle"),asideFavorite.classList.remove("hidden"),mainCards.classList.remove("content_cards"),mainCards.classList.add("content__cardsFavorite"))},printFavoritesAsideMenu=()=>{favoritesShowsList.length>0?(asideFavorite.classList.remove("hidden"),mainCards.classList.remove("content_cards"),mainCards.classList.add("content__cardsFavorite")):(asideFavorite.classList.add("hidden"),mainCards.classList.add("content_cards"),mainCards.classList.remove("content__cardsFavorite")),printFavoritesCards()},buttonRemoveAll=document.querySelector(".js-buttonRemoveAll"),removeAllFavorites=()=>{localStorage.removeItem("favorite"),asideFavorite.classList.add("hidden","menu"),mainCards.classList.add("content_cards"),mainCards.classList.remove("content__cardsFavorite"),favoritesShowsList=[],printFavoritesAsideMenu()};buttonRemoveAll.addEventListener("click",removeAllFavorites);const removeFavorite=e=>{const s=e.currentTarget,t=parseInt(s.parentElement.id),a=favoritesShowsList.findIndex(e=>e.id===t);favoritesShowsList.splice(a,1),saveFavoritesOnLocalStorage(),printFavoritesAsideMenu()},addListenersToDeleteButtons=()=>{const e=document.querySelectorAll(".js-buttonRemove");for(const s of e)s.addEventListener("click",removeFavorite)},saveFavoritesOnLocalStorage=()=>{localStorage.setItem("favorite",JSON.stringify(favoritesShowsList))},loadFromLocalStorage=()=>{favoritesShowsList=JSON.parse(localStorage.getItem("favorite")),null===favoritesShowsList&&(favoritesShowsList=[]),printFavoritesAsideMenu()},searchWithEnter=e=>{13===event.keyCode&&initiateSearch()},goHomePage=()=>{inputSearch.value="",mainCards.innerHTML="",header.classList.remove("header"),header.classList.add("headerInitial")};iconSearch.addEventListener("click",initiateSearch),title.addEventListener("click",goHomePage),inputSearch.addEventListener("keyup",searchWithEnter),favoritesShowsList=JSON.parse(localStorage.getItem("favorite")),null===favoritesShowsList&&(favoritesShowsList=[]),printFavoritesAsideMenu(),addListenersToDeleteButtons();