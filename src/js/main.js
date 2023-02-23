'use strict';

//*
//!
//?
//
//todo

//* Global variables - cogemos elementos del HTML
// const inputElement = document.querySelector('.js-input');
// const searchBtn = document.querySelector('.js-searchBtn');
// const resetBtn = document.querySelector('.js-resetBtn');
// const cocktailsList = document.querySelector('.js-cocktails');
// const favoritesList = document.querySelector('.js.favorites');
const margaritasUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
let listMargaritasData = [];

//? When the user is loading the page the list of Margaritas should appear
fetch(margaritasUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // to see which property I have to chose
    listMargaritasData = data.drinks.map((showDrink) => ({
      name: showDrink.strDrink,
      photo: showDrink.strDrinkThumb,
    }));
    console.log(listMargaritasData);
  });


