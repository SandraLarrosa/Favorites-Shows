"use strict";const inputSearch=document.querySelector(".js-input"),iconSearch=document.querySelector(".js-search"),title=document.querySelector(".js-title"),header=document.querySelector(".js-header"),asideFavorite=document.querySelector(".js-asideFavorite"),mainCards=document.querySelector(".js-content"),emptyImageURL="assets/images/tv-no-signal.jpg",emptySearchCatImg="assets/images/cat-computer.gif",errorSearchCatImg="assets/images/cat-error.gif",noFindSearchCatImg="assets/images/cats-search.gif";let showsList=[],favoritesShowsList=[];const initiateSearch=()=>{changeHeaderStyle(),searchShow()},changeHeaderStyle=()=>{header.classList.remove("headerInitial"),header.classList.add("header")},searchShow=()=>{const e=inputSearch.value;e?searchOnApi(e):(mainCards.innerHTML=`<div class="contain__error"><h2 class="error">¡No has introducido ninguna serie!</h2><p class="text__error">No enfades al gatete y busca una serie para hacerle feliz</p><img class="gif__cat" src="${emptySearchCatImg}" alt="gif gatete"/></div>`,showsList=[])},searchOnApi=e=>{fetch("http://api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{e.length<1?mainCards.innerHTML=`<div class="contain__error"><h2 class="error">No encuentro esa serie, creo que no existe</h2><p class="text__error">Prueba otra vez</p><img class="gif__cat" src="${noFindSearchCatImg}" alt="gif gatete"/></div>`:(showsList=e.map(e=>e.show),printShows(showsList))}).catch(e=>{mainCards.innerHTML=`<div class="contain__error"><h2 class="error">Algo acaba de fallar...</h2><p class="text__error">Estamos trabajando en ello, no desesperes</p><img class="gif__cat" src="${errorSearchCatImg}" alt="gif gatete"/></div>`,showsList=[]})},printShows=e=>{mainCards.innerHTML="";for(const i of e){const e=favoritesShowsList.find(e=>e.id===i.id),a=void 0===e?"":"card__favoriteAdd",t=void 0===e?"":"colorTitle";null!==i.image?mainCards.innerHTML+=`<article id="${i.id}"class="card__show js-cards ${a}"><img class="card__show--img" title="${i.name}" src="${i.image.medium}" alt="${i.name}"/><div class="content__boxTitle"><h3 class="card__show--title ${t}">${i.name}</h3></div> </article>`:mainCards.innerHTML+=`<article id="${i.id}"class="card__show js-cards ${a}"><img class="card__show--img" title="${i.name}" src=${emptyImageURL} alt="${i.name}"/><div class="content__boxTitle"><h3 class="card__show--title ${t}">${i.name}</h3></div> </article>`}addCardsEventListeners()},addCardsEventListeners=()=>{const e=document.querySelectorAll(".js-cards");for(const i of e)i.addEventListener("click",handleFavorites)},handleFavorites=e=>{addOrRemoveFavoriteList(e),changeColorCard(e),printFavoritesAsideMenu()},addOrRemoveFavoriteList=e=>{const i=e.currentTarget,a=parseInt(i.id);if(void 0===favoritesShowsList.find(e=>e.id===a)){const e=showsList.find(e=>e.id===a);favoritesShowsList.push(e)}else{const e=favoritesShowsList.findIndex(e=>e.id===a);favoritesShowsList.splice(e,1)}saveFavoritesOnLocalStorage()},printFavoritesCards=()=>{const e=document.querySelector(".js-listFavorite");e.innerHTML="";for(const i of favoritesShowsList)null!==i.image?e.innerHTML+=`<li id="${i.id}"class="favorite__list--card"><img class="favorite__card__img" title="${i.name}" src="${i.image.medium}" alt="${i.name}"/><h4 class="favorite__title__list">${i.name}</h4><i class="far fa-times-circle js-buttonRemove" title="Eliminar serie de favoritos"></i>`:e.innerHTML+=`<li id="${i.id}"class="favorite__list--card"><img class="favorite__card__img" title="${i.name}" src="${emptyImageURL}" alt="${i.name}"/><h4 class="favorite__title__list">${i.name}</h4><i class="far fa-times-circle js-buttonRemove" title="Eliminar serie de favoritos"></i>`;addListenersToDeleteButtons(),printShows(showsList)},changeColorCard=e=>{const i=e.currentTarget,a=parseInt(i.id);void 0===favoritesShowsList.find(e=>e.id===a)?(i.classList.remove("card__favoriteAdd"),i.lastElementChild.firstChild.classList.remove("colorTitle")):(i.classList.add("card__favoriteAdd"),i.lastElementChild.firstChild.classList.add("colorTitle"),asideFavorite.classList.remove("hidden"),mainCards.classList.remove("content_cards"),mainCards.classList.add("content__cardsFavorite"))},printFavoritesAsideMenu=()=>{favoritesShowsList.length>0?(asideFavorite.classList.remove("hidden"),mainCards.classList.remove("content_cards"),mainCards.classList.add("content__cardsFavorite")):(asideFavorite.classList.add("hidden"),mainCards.classList.add("content_cards"),mainCards.classList.remove("content__cardsFavorite")),printFavoritesCards()},buttonRemoveAll=document.querySelector(".js-buttonRemoveAll"),removeAllFavorites=()=>{localStorage.removeItem("favorite"),asideFavorite.classList.add("hidden","menu"),mainCards.classList.add("content_cards"),mainCards.classList.remove("content__cardsFavorite"),favoritesShowsList=[],printFavoritesAsideMenu()};buttonRemoveAll.addEventListener("click",removeAllFavorites);const removeFavorite=e=>{const i=e.currentTarget,a=parseInt(i.parentElement.id),t=favoritesShowsList.findIndex(e=>e.id===a);favoritesShowsList.splice(t,1),saveFavoritesOnLocalStorage(),printFavoritesAsideMenu()},addListenersToDeleteButtons=()=>{const e=document.querySelectorAll(".js-buttonRemove");for(const i of e)i.addEventListener("click",removeFavorite)},saveFavoritesOnLocalStorage=()=>{localStorage.setItem("favorite",JSON.stringify(favoritesShowsList))},loadFromLocalStorage=()=>{favoritesShowsList=JSON.parse(localStorage.getItem("favorite")),null===favoritesShowsList&&(favoritesShowsList=[]),printFavoritesAsideMenu()},searchWithEnter=e=>{13===event.keyCode&&initiateSearch()},goHomePage=()=>{inputSearch.value="",mainCards.innerHTML="",header.classList.remove("header"),header.classList.add("headerInitial")};iconSearch.addEventListener("click",initiateSearch),title.addEventListener("click",goHomePage),inputSearch.addEventListener("keyup",searchWithEnter),favoritesShowsList=JSON.parse(localStorage.getItem("favorite")),null===favoritesShowsList&&(favoritesShowsList=[]),printFavoritesAsideMenu(),addListenersToDeleteButtons();let trailerShows=[{id:1,name:"Dark",gif:"https://media.giphy.com/media/87dGn81U6RvMSRYoRe/giphy.gif"},{id:2,name:"Friends",gif:"https://media.giphy.com/media/du9qj75F41HoONtKef/giphy.gif"},{id:3,name:"The Boys",gif:"https://media.giphy.com/media/Igoof9f8zHLcGmLaa0/giphy.gif"},{id:4,name:"The office",gif:"https://media.giphy.com/media/muGYyrWwxOOMo/giphy.gif"},{id:5,name:"The Umbrella Academy",gif:"https://media.giphy.com/media/1VWArVohxtQFaFXjK6/giphy.gif"},{id:6,name:"Modern Family",gif:"https://media.giphy.com/media/qQJ1xyQXVuVfW/giphy.gif"},{id:7,name:"Game of Thrones",gif:"https://media.giphy.com/media/c6MfQ6dOO1lra/giphy.gif"},{id:8,name:"Chernobyl",gif:"https://media.giphy.com/media/S7KNQldECRqZ5Eh1IO/giphy.gif"},{id:9,name:"How I Meet Your Mother",gif:"https://media.giphy.com/media/jSxK33dwEMbkY/giphy.gif"},{id:10,name:"Breaking Bad",gif:"https://media.giphy.com/media/QT9SVRVexMgOk/giphy.gif"},{id:11,name:"Stranger Things",gif:"https://media.giphy.com/media/l41Y9SKrl3kLVamfC/giphy.gif"},{id:12,name:"The Hounted of Hill House",gif:"https://media.giphy.com/media/1oF1IkWyI9lIik2nu7/giphy.gif"},{id:13,name:"The Handmaids Tale",gif:"https://media.giphy.com/media/A7zirtkZpjXWM/giphy.gif"},{id:14,name:"Friends 2",gif:"https://media.giphy.com/media/S6qkS0ETvel6EZat45/giphy.gif"},{id:15,name:"The Office 2",gif:"https://media.giphy.com/media/eKDp7xvUdbCrC/giphy.gif"},{id:16,name:"Friends 3",gif:"https://media.giphy.com/media/jTeK2JM4e50T2xvJBV/giphy.gif"},{id:17,name:"Friends 4",gif:"https://media.giphy.com/media/j2jqKZLkijcFTr9Wsv/giphy.gif"},{id:18,name:"No signal",gif:"https://media.giphy.com/media/FkUyGd7FDh1gk/giphy.gif"},{id:19,name:"No signal 2",gif:"https://media.giphy.com/media/l1J9EdzfOSgfyueLm/giphy.gif"}];const imgTv=document.querySelector(".js-containerTv"),changeTrailer=()=>{const e=document.querySelector(".js-backgroundTv"),i=Math.floor(Math.random()*trailerShows.length);let a=trailerShows[i];e.style.backgroundImage=`url(${a.gif})`,e.style.backgroundPosition="center",e.style.backgroundSize="center",e.style.animation="null",e.style.opacity="1"};imgTv.addEventListener("click",changeTrailer);