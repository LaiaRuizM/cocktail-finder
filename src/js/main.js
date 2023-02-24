'use strict';

//*
//!
//?
//
//todo

//* Global variables - cogemos elementos del HTML
const inputElement = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-searchBtn');
// const resetBtn = document.querySelector('.js-resetBtn');
const cocktailsList = document.querySelector('.js-cocktailsUl');
// const favoritesList = document.querySelector('.js.favorites');
const margaritasUrl =
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
let listMargaritasData = [];
let listAllDrinks = [];

//? When the user is loading the page the list of Margaritas should appear
fetch(margaritasUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // to see which property I have to chose
    listMargaritasData = data.drinks.map((showDrink) => ({
      name: showDrink.strDrink,
      photo: showDrink.strDrinkThumb,
      id: showDrink.idDrink,
    }));
    renderCocktails(listMargaritasData); //donde pintarlo -> cambiarlo por el render
  });

//? function to paint the list of delicious cocktails
function renderCocktails(drinks) {
  for (const eachDrink of drinks) {
    if (eachDrink.photo) {
      cocktailsList.innerHTML += `<li class="js-liDrink" id="${eachDrink.id}"><h4>${eachDrink.name}</h4><img src="${eachDrink.photo}" title="${eachDrink.name}" alt="${eachDrink.name}" class="cocktailImg"/></li>`;
    } else {
      cocktailsList.innerHTML += `<li class="js-liDrink" id="${eachDrink.id}"><h4>${eachDrink.name}</h4><img src="https://www.drinksco.es/blog/assets/uploads/sites/2/2020/05/cocktail-3327242_1920-1170x780.jpg" title="${eachDrink.name}" alt="${eachDrink.name}" class="cocktailImg"/></li>`;
    }
  }
}

// Function handleClickSearch button to search any kind of cocktail
function handleClickSearch(ev) {
  ev.preventDefault();
  const inputUserCocktail = inputElement.value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputUserCocktail}`)
    .then((response) => response.json())
    .then((data) => {
      listAllDrinks = data.drinks.map((showDrink) => ({
        name: showDrink.strDrink,
        photo: showDrink.strDrinkThumb,
        id: showDrink.idDrink,
      }));
      cocktailsList.innerHTML = ''; //
      renderCocktails(listAllDrinks); //donde pintarlo -> cambiarlo por el render -> OK
    });
}

//* Events
searchBtn.addEventListener('click', handleClickSearch);
