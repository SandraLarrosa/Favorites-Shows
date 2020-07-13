'use strict';

let trailerShows = [
  {
    id: 1,
    name: 'Dark',
    gif: 'https://media.giphy.com/media/87dGn81U6RvMSRYoRe/giphy.gif',
  },
  {
    id: 2,
    name: 'Friends',
    gif: 'https://media.giphy.com/media/du9qj75F41HoONtKef/giphy.gif',
  },
  {
    id: 3,
    name: 'The Boys',
    gif: 'https://media.giphy.com/media/Igoof9f8zHLcGmLaa0/giphy.gif',
  },
  {
    id: 4,
    name: 'The office',
    gif: 'https://media.giphy.com/media/muGYyrWwxOOMo/giphy.gif',
  },
  {
    id: 5,
    name: 'The Umbrella Academy',
    gif: 'https://media.giphy.com/media/1VWArVohxtQFaFXjK6/giphy.gif',
  },
  {
    id: 6,
    name: 'Modern Family',
    gif: 'https://media.giphy.com/media/qQJ1xyQXVuVfW/giphy.gif',
  },
  {
    id: 7,
    name: 'Game of Thrones',
    gif: 'https://media.giphy.com/media/c6MfQ6dOO1lra/giphy.gif',
  },
  {
    id: 8,
    name: 'Chernobyl',
    gif: 'https://media.giphy.com/media/S7KNQldECRqZ5Eh1IO/giphy.gif',
  },
  {
    id: 9,
    name: 'How I Meet Your Mother',
    gif: 'https://media.giphy.com/media/jSxK33dwEMbkY/giphy.gif',
  },
  {
    id: 10,
    name: 'Breaking Bad',
    gif: 'https://media.giphy.com/media/QT9SVRVexMgOk/giphy.gif',
  },
  {
    id: 11,
    name: 'Stranger Things',
    gif: 'https://media.giphy.com/media/l41Y9SKrl3kLVamfC/giphy.gif',
  },
  {
    id: 12,
    name: 'The Hounted of Hill House',
    gif: 'https://media.giphy.com/media/1oF1IkWyI9lIik2nu7/giphy.gif',
  },
  {
    id: 13,
    name: 'The Handmaids Tale',
    gif: 'https://media.giphy.com/media/A7zirtkZpjXWM/giphy.gif',
  },
  {
    id: 14,
    name: 'Friends 2',
    gif: 'https://media.giphy.com/media/S6qkS0ETvel6EZat45/giphy.gif',
  },
  {
    id: 15,
    name: 'The Office 2',
    gif: 'https://media.giphy.com/media/eKDp7xvUdbCrC/giphy.gif',
  },
  {
    id: 16,
    name: 'Friends 3',
    gif: 'https://media.giphy.com/media/jTeK2JM4e50T2xvJBV/giphy.gif',
  },
  {
    id: 17,
    name: 'Friends 4',
    gif: 'https://media.giphy.com/media/j2jqKZLkijcFTr9Wsv/giphy.gif',
  },
  {
    id: 18,
    name: 'No signal',
    gif: 'https://media.giphy.com/media/FkUyGd7FDh1gk/giphy.gif',
  },
  {
    id: 19,
    name: 'No signal 2',
    gif: 'https://media.giphy.com/media/l1J9EdzfOSgfyueLm/giphy.gif',
  },
];

const imgTv = document.querySelector('.js-containerTv');

const changeTrailer = () => {
  const backgroundImgTv = document.querySelector('.js-backgroundTv');

  const randomShow = Math.floor(Math.random() * trailerShows.length);
  let selection = trailerShows[randomShow];

  backgroundImgTv.style.backgroundImage = `url(${selection.gif})`;
  backgroundImgTv.style.backgroundPosition = 'center';
  backgroundImgTv.style.backgroundSize = 'center';
  backgroundImgTv.style.animation = 'null';
  backgroundImgTv.style.opacity = '1';
};

imgTv.addEventListener('click', changeTrailer);
