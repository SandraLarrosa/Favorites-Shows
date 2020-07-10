"use strict";const inputSearch=document.querySelector(".js-input"),iconSearch=document.querySelector(".js-search"),title=document.querySelector(".js-title"),header=document.querySelector(".js-header"),mainCards=document.querySelector(".js-content"),listener=e=>{searchShow(),changeClassInitial()},changeClassInitial=()=>{header.classList.remove("headerInitial"),header.classList.add("header")},changeHeader=e=>{inputSearch.value="",mainCards.innerHTML="",header.classList.remove("header"),header.classList.add("headerInitial")};let shows=[];function searchShow(){const e=inputSearch.value;e?fetch("http://api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{shows=e.map(e=>e.show),printShows(shows)}):mainCards.innerHTML='<h2 class="error">No has introducido ninguna serie :-(</h2>'}const printShows=e=>{mainCards.innerHTML="";for(const s of e)null!==s.image?mainCards.innerHTML+=`<article id="${s.id}"class="card__show js-cards"><img class="card__show--img" src="${s.image.medium}" alt="${s.name}"/><div class="content__boxTitle"><h3 class="card__show--title">${s.name}</h3></div> </article>`:mainCards.innerHTML+=`<article class="card__show js-cards"><img class="card__show--img" src="https://via.placeholder.com/260x310/ffffff/666666/?text=TVShows" alt="${s.name}"/><div class="content__boxTitle"><h3 class="card__show--title">${s.name}</h3></div> </article>`;listenerCards()},printFavorites=()=>{const e=document.querySelector(".js-listFavorite");e.innerHTML="";for(const s of favoritesShows)e.innerHTML+=`<li class="favorite__list--card"><img class="favorite__card__img" src="${s.image.medium}" alt="${s.name}"/><h4 class="favorite__title__list">${s.name}</h4><i class="far fa-times-circle"></i>`},listenerCards=()=>{const e=document.querySelectorAll(".js-cards");for(const s of e)s.addEventListener("click",handleFavorites)};let favoritesShows=[];const asideFavorite=document.querySelector(".js-asideFavorite"),handleFavorites=e=>{addFavorite(e),changeColorCard(e),printFavorites()},addFavorite=e=>{const s=e.currentTarget,a=parseInt(s.id),t=favoritesShows.find(e=>e.id===a),r=favoritesShows.findIndex(e=>e.id===a);if(void 0===t)for(const e of shows)a===e.id&&(favoritesShows.push(e),console.log("Me han añadadido "+e.name));else favoritesShows.splice(r,1),console.log("Me han eliminado "+s.name);console.log(favoritesShows),saveLocalStorage()},changeColorCard=e=>{const s=e.currentTarget;s.classList.contains("card__favoriteAdd")?s.classList.remove("card__favoriteAdd"):(s.classList.add("card__favoriteAdd"),asideFavorite.classList.remove("hidden","menu"),mainCards.classList.remove("content_cards"),mainCards.classList.add("content__cardsFavorite"))},printFavoritesLS=()=>{favoritesShows.length>0&&(asideFavorite.classList.remove("hidden","menu"),mainCards.classList.remove("content_cards"),mainCards.classList.add("content__cardsFavorite"),printFavorites())},saveLocalStorage=()=>{localStorage.setItem("favorite",JSON.stringify(favoritesShows))},getFromLocalStorage=()=>{favoritesShows=JSON.parse(localStorage.getItem("favorite")),null===favoritesShows&&(favoritesShows=[]),favoritesShows.length>0&&(asideFavorite.classList.remove("hidden","menu"),mainCards.classList.remove("content_cards"),mainCards.classList.add("content__cardsFavorite"),printFavorites())};favoritesShows=JSON.parse(localStorage.getItem("favorite")),null===favoritesShows&&(favoritesShows=[]),favoritesShows.length>0&&(asideFavorite.classList.remove("hidden","menu"),mainCards.classList.remove("content_cards"),mainCards.classList.add("content__cardsFavorite"),printFavorites()),iconSearch.addEventListener("click",listener),title.addEventListener("click",changeHeader);